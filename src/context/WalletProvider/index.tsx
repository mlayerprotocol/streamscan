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
        "Hello World"
      );
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
