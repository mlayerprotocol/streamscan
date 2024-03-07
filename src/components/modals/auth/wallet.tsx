"use client";
import { Button } from "antd";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import * as stargate from "@cosmjs/stargate";

interface WalletConnectProps {
  onSelect?: (type: string, data?: any) => void;
}
export const WalletConnect = (props: WalletConnectProps) => {
  const { onSelect } = props;

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
      setTimeout(() => {
        // const cosmJS = stargate.SigningStargateClient.connect(
        //   "https://lcd-cosmoshub.keplr.app/rest",
        //   accounts[0].address
        //   // offlineSigner
        // );
      }, 5000);
      console.log({
        accounts,
        // cosmJS
      });
    }
  };
  useEffect(() => {
    // initializeMetaMask();
  }, []);

  return (
    <motion.div
      className="inline-flex w-full flex-col gap-4"
      initial={{ opacity: 0, x: 1 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -1 }}
      transition={{ duration: 1 }}
    >
      <Button
        onClick={() => {
          initializeKeplr();
        }}
        shape="round"
        type="link"
        className="!flex justify-start items-center !bg-white active:!bg-gray-500"
        icon={
          <Image
            src="/icons/keplr.svg"
            alt="Vercel Logo"
            width={20}
            height={20}
            priority
          />
        }
      >
        <span className="text-black">Keplr</span>
      </Button>
      <Button
        shape="round"
        type="link"
        className="!flex justify-start items-center !bg-white active:!bg-gray-500"
        icon={
          <Image
            src="/icons/metamask.svg"
            alt="Vercel Logo"
            width={20}
            height={20}
            priority
          />
        }
      >
        <span className="text-black">Metamask</span>
      </Button>
    </motion.div>
  );
};
