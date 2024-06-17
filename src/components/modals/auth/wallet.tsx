"use client";
import { Button } from "antd";
import React, { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import * as stargate from "@cosmjs/stargate";
import { WalletContext } from "@/context";
import { CheckCircleFilled } from "@ant-design/icons";

interface WalletConnectProps {
  onSelect?: (type: string, data?: any) => void;
}
export const WalletConnect = (props: WalletConnectProps) => {
  const { onSelect } = props;
  const {
    connectedWallet,
    loadingWalletConnections,
    initializeKeplr,
    intializeMetamask,
  } = useContext(WalletContext);

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
          initializeKeplr?.();
        }}
        loading={loadingWalletConnections["keplr"]}
        disabled={connectedWallet == "keplr"}
        shape="round"
        type="default"
        className="!flex justify-start items-center"
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
        <span className="">Keplr</span>
        {connectedWallet == "keplr" && (
          <CheckCircleFilled className="!text-green-500 text-2xl !ml-auto" />
        )}
      </Button>
      <Button
       disabled={true}
        onClick={() => {
          intializeMetamask?.();
        }}
        loading={loadingWalletConnections["metamask"]}
        // disabled={connectedWallet == "metamask" || true}
        shape="round"
        type="default"
        className="!flex justify-start items-center"
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
        <span className="">Metamask (coming soon)</span>
        {connectedWallet == "metamask" && (
          <CheckCircleFilled className="!text-green-500 text-2xl !ml-auto" />
        )}
      </Button>
    </motion.div>
  );
};
