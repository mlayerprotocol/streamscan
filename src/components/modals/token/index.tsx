"use client";
import { Counter, TokenCard } from "@/components";
import { Button, Modal } from "antd";
import { useState } from "react";

interface TokenModalProps {
  isModalOpen?: boolean;
  onCancel?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
export const TokenModal = (props: TokenModalProps) => {
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
          How much do you need?
        </span>
        <div className="flex flex-wrap justify-center gap-3 w-full mb-6">
          {Array(5)
            .fill(0)
            .map((e, i) => {
              return <TokenCard key={i} active={selectedTokenIndex == i} />;
            })}
        </div>
        <div className="flex py-3 px-4 w-full justify-between items-center bg-white bg-opacity-[0.04] rounded-lg mb-3">
          <span className="text-base font-medium">Total</span>
          <div className="flex flex-col gap-2 items-end">
            <Counter />
            <span className="text-lg font-medium text-green-400">$0</span>
          </div>
        </div>
        <div className="flex">
          <Button
            type="primary"
            shape="round"
            className="!flex items-center gap-1 w-full justify-center mb-2 mt-10"
          >
            <span className="font-medium text-sm text-black ">Pay Now</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
};
