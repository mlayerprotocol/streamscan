"use client";
import { createContext, ReactNode, useEffect, useState } from "react";
import * as stargate from "@cosmjs/stargate";
import { MetaMaskProvider, useSDK } from "@metamask/sdk-react";
import { generateKeyPairEcc, KEYPAIR_STORAGE_KEY, Storage } from "@/utils";

interface WalletContextValues {
  initialLoading: boolean;
  initializeKeplr?: () => Promise<void>;
  intializeMetamask?: () => Promise<void>;
  walletAccounts: Record<string, string[]>;
  loadingWalletConnections: Record<string, boolean>;
  walletConnectionState: Record<string, boolean>;
  connectedWallet?: string;
}

declare const TextEncoder: any;
declare const TextDecoder: any;

export function toUtf8(str: string): Uint8Array {
  return new TextEncoder().encode(str);
}
function sortedObject(obj: any): any {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(sortedObject);
  }
  const sortedKeys = Object.keys(obj).sort();
  const result: Record<string, any> = {};
  // NOTE: Use forEach instead of reduce for performance with large objects eg Wasm code
  sortedKeys.forEach((key) => {
    result[key] = sortedObject(obj[key]);
  });
  return result;
}
export function escapeCharacters(input: string): string {
  // When we migrate to target es2021 or above, we can use replaceAll instead of global patterns.
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll
  const amp = /&/g;
  const lt = /</g;
  const gt = />/g;
  return input.replace(amp, "\\u0026").replace(lt, "\\u003c").replace(gt, "\\u003e");
}
export function sortedJsonStringify(obj: any): string {
  const strigified = JSON.stringify(sortedObject(obj));
  console.log('STRINGIFIED', strigified);
  return strigified;
}

export function serializeSignDoc(signDoc: any): Uint8Array {
  const serialized = escapeCharacters(sortedJsonStringify(signDoc));
  console.log('Escaped', serialized);
  const utf = toUtf8(serialized);
  console.log('UTF8ed', JSON.stringify(utf));
  return utf;
}

export const WalletContext = createContext<WalletContextValues>({
  initialLoading: false,
  walletAccounts: {},
  loadingWalletConnections: {},
  walletConnectionState: {},
});

export const WalletContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [walletAccounts, setWalletAccounts] = useState<
    Record<string, string[]>
  >({});
  const [loadingWalletConnections, setLoadingWalletConnections] = useState<
    Record<string, boolean>
  >({});
  const [walletConnectionState, setWalletConnectionState] = useState<
    Record<string, boolean>
  >({});
  const [connectedWallet, setConnectedWallet] = useState<string>();
  const { sdk, connected, connecting, provider, chainId } = useSDK();
  const [cosmosSDK, setCosmosSDK] = useState<stargate.StargateClient>();
  const [keyPair, setKeyPair] = useState<Record<string, any>>();
  const [keplrSignature, setKeplrSignature] = useState<Record<string, any>>();

  const initializeKeplr = async () => {
    if (!window.keplr) {
      alert("Please install keplr extension");
    } else {
      const chainId = "cosmoshub-4";

      // Enabling before using the Keplr is recommended.
      // This method will ask the user whether to allow access if they haven't visited this website.
      // Also, it will request that the user unlock the wallet if the wallet is locked.
      setLoadingWalletConnections((old) => {
        return { ...old, keplr: true };
      });
      await window.keplr.enable(chainId);

      const offlineSigner = window.keplr.getOfflineSigner(chainId);

      // You can get the address/public keys by `getAccounts` method.
      // It can return the array of address/public key.
      // But, currently, Keplr extension manages only one address/public key pair.
      // XXX: This line is needed to set the sender address for SigningCosmosClient.
      const accounts = await offlineSigner.getAccounts();
      console.log({ accounts });

      // Initialize the gaia api with the offline signer that is injected by Keplr extension.
      // setTimeout(() => {
      const cosmJS = await stargate.SigningStargateClient.connect(
        "https://cosmos-rpc.publicnode.com:443"
        // accounts[0].address
        // offlineSigner
      );
      const signature = await window.keplr.signArbitrary(
        chainId,
        accounts[0].address,
        "Approve 0xe652d28F89A28adb89e674a6b51852D0C341Ebe9 for tml: ofrPvSGZK5UtKcDTHBACd9PttDjjRKnHMQqNhjOH2yA="
      );
      const signDoc = {
        "chain_id": "",
        "account_number": "0",
        "sequence": "0",
        "fee": {
          "gas": "0",
          "amount": []
        },
        "msgs": [
          {
            "type": "sign/MsgSignData",
            "value": {
              "signer": "cosmos14y0pyqjay3p8dsqp2jd5rkft7vf9cdkqnrc43l",
              "data": "aGVsbG93b3JsZA=="
            }
          }
        ],
        "memo": ""
      }
      

      console.log('SERIal', serializeSignDoc(signDoc))

      console.log('SIGNEDARBITRARY', JSON.stringify(signature))
      setKeplrSignature(signature);
      setCosmosSDK(cosmJS);
      setLoadingWalletConnections((old) => {
        return { ...old, keplr: false };
      });
      setWalletAccounts((old) => {
        return { ...old, keplr: accounts.map((el: any) => el.address) };
      });
      setConnectedWallet("keplr");
    }
  };
  const intializeMetamask = async () => {
    try {
      setLoadingWalletConnections((old) => {
        return { ...old, metamask: true };
      });
      const accounts: any = await sdk?.connect();
      console.log({ e: "intializeMetamask", chainId, connected, accounts });
      setLoadingWalletConnections((old) => {
        return { ...old, metamask: false };
      });
      setWalletAccounts((old) => {
        return { ...old, metamask: accounts };
      });
      setConnectedWallet("metamask");
    } catch (err) {
      console.warn("failed to connect..", err);
    }
  };

  const disconnectMetamask = () => {
    if (sdk) {
      sdk.terminate();
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storage = new Storage(KEYPAIR_STORAGE_KEY);

      if (keyPair) return;
      if (storage.get()) {
        setKeyPair(storage.get());
        return;
      }
      const kp = generateKeyPairEcc();
      setKeyPair(kp);
      storage.set(kp);
    }
  }, []);

  useEffect(() => {
    console.log({ keyPair, keplrSignature });
  }, [keyPair, keplrSignature]);

  return (
    <WalletContext.Provider
      value={{
        initialLoading: false,
        initializeKeplr,
        intializeMetamask,
        walletAccounts,
        loadingWalletConnections,
        walletConnectionState,
        connectedWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const MetaWrapper = ({ children }: { children: ReactNode }) => {
  if (typeof window !== "undefined") {
    return (
      <MetaMaskProvider
        debug={false}
        sdkOptions={{
          dappMetadata: {
            name: "Example React Dapp",
            url: window.location.href,
          },
          // Other options
        }}
      >
        {children}
      </MetaMaskProvider>
    );
  }
  return <>{children}</>;
};
