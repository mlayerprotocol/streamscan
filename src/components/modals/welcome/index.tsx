"use client";
import { Counter, TokenCard } from "@/components";
import { Button, Modal } from "antd";
import Image from "next/image";
import { useState } from "react";

interface WelcomeModalProps {
  isModalOpen?: boolean;
  onCancel?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
export const WelcomeModal = (props: WelcomeModalProps) => {
  const { isModalOpen = false, onCancel } = props;
  const [selectedTokenIndex, setSelectedTokenIndex] = useState<number>(0);

  return (
    <Modal
      className="rounded-lg lg:!w-[523px]"
      title={null}
      open={isModalOpen}
      // onOk={handleOk}
      onCancel={(e) => {
        onCancel?.(e);
      }}
      footer={null}
    >
      <div className="flex w-full items-center flex-col ">
        <span className="text-2xl lg:text-[32px] font-medium mb-10">
          Welcome to your Wallet
        </span>
        <div className="w-full flex gap-3  mb-6">
          <div className="w-[60px] h-[60px] min-w-[60px] flex items-center justify-center rounded-full bg-[#646464] bg-opacity-30">
            <Image
              src="/icons/rocket.png"
              alt="Vercel Logo"
              width={30}
              height={30}
              priority
            />
          </div>
          <span className="text-base font-medium">
            Deposit money to perform actions like tipping your favourite
            creators, buying a physical comic and so much more
          </span>
        </div>
        <div className="w-full flex gap-3  mb-10">
          <div className="w-[60px] h-[60px] min-w-[60px] flex items-center justify-center rounded-full bg-[#646464] bg-opacity-30">
            <Image
              src="/icons/flying-cash.png"
              alt="Vercel Logo"
              width={30}
              height={30}
              priority
            />
          </div>
          <span className="text-base font-medium">
            The currency for Galatoons is TOON Tokens. Use this currency to
            perform actions
          </span>
        </div>
        <div className="flex gap-3">
          <Button
            className="[&>*]:text-white border !border-gray-500 !shadow-white"
            ghost
            shape="round"
          >
            Deposit Funds
          </Button>
          <Button className="[&>*]:text-black" type="primary" shape="round">
            Visit Wallet
          </Button>
        </div>
      </div>
    </Modal>
  );
};
