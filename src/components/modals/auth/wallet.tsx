"use client";
import { Button } from "antd";
import React, { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import * as stargate from "@cosmjs/stargate";
import { WalletContext } from "@/context";

interface WalletConnectProps {
  onSelect?: (type: string, data?: any) => void;
}
export const WalletConnect = (props: WalletConnectProps) => {
  const { onSelect } = props;
  const { initialLoading, initializeKeplr, intializeMetamask } =
    useContext(WalletContext);

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
        onClick={() => {
          intializeMetamask?.();
        }}
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
