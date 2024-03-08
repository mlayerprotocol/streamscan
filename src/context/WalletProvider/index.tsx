"use client";

import { ConfigProvider, theme } from "antd";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import * as stargate from "@cosmjs/stargate";
import { MetaMaskProvider, useSDK } from "@metamask/sdk-react";

interface WalletContextValues {
  initialLoading: boolean;
  initializeKeplr?: () => Promise<void>;
  intializeMetamask?: () => Promise<void>;
}

export const WalletContext = createContext<WalletContextValues>({
  initialLoading: false,
});

export const WalletContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [account, setAccount] = useState<string>();
  const { sdk, connected, connecting, provider, chainId } = useSDK();

  const initializeKeplr = async () => {
    if (!(window as any).keplr) {
      alert("Please install keplr extension");
    } else {
      const chainId = "cosmoshub-4";

      // Enabling before using the Keplr is recommended.
      // This method will ask the user whether to allow access if they haven't visited this website.
      // Also, it will request that the user unlock the wallet if the wallet is locked.
      await (window as any).keplr.enable(chainId);

      const offlineSigner = (window as any).keplr.getOfflineSigner(chainId);

      // You can get the address/public keys by `getAccounts` method.
      // It can return the array of address/public key.
      // But, currently, Keplr extension manages only one address/public key pair.
      // XXX: This line is needed to set the sender address for SigningCosmosClient.
      const accounts = await offlineSigner.getAccounts();

      // Initialize the gaia api with the offline signer that is injected by Keplr extension.
      // setTimeout(() => {
      const cosmJS = await stargate.SigningStargateClient.connect(
        "https://cosmos-rpc.publicnode.com:443",
        // accounts[0].address
        // offlineSigner
      );
      // }, 5000);
      console.log({
        accounts,
        cosmJS,
      });
    }
  };
  const intializeMetamask = async () => {
    try {
      const accounts: any = await sdk?.connect();
      console.log({ e: "intializeMetamask", chainId, connected, accounts });
      setAccount(accounts?.[0] as string);
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
    // initializeMetaMask();
  }, []);

  return (
    <WalletContext.Provider
      value={{
        initialLoading: false,
        initializeKeplr: initializeKeplr,
        intializeMetamask: intializeMetamask,
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
