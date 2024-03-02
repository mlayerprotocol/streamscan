"use client";
import { TokenModal } from "@/components";
import { DownOutlined } from "@ant-design/icons";
import { Button, Divider, Dropdown, MenuProps, Space } from "antd";
import Image from "next/image";
import { Fragment, useState } from "react";

interface AccountDetailProps {}
export const AccountDetail = (props: AccountDetailProps) => {
  return (
    <div
      className="flex flex-col items-center w-full lg:w-[490px] p-6 mx-auto bg-[#292929] rounded-2xl justify-end bg-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: "url(/icons/grainy_backdrop.png)",
      }}
    >
      <span className="font-normal mb-2 mt-10 text-white text-opacity-60">
        Main Balance
      </span>
      <span className="flex gap-4 text-5xl font-semibold mb-14 ">
        <span className=" ">46</span>
        <span className="text-[#FF9C66]  ">TOON</span>
      </span>
      <div className="flex w-full gap-4 justify-between text-base">
        <span className="font-normal mb-2 text-white text-opacity-60">
          Wallet Acct
        </span>
        <div className="flex gap-4">
          <span className="font-medium w-36 overflow-ellipsis overflow-hidden ">
            0x93c48c51f1a0c6e544bacbd162636edc276b048e
          </span>
          <Image
            src="/icons/copy.svg"
            alt="Vercel Logo"
            width={20}
            height={20}
            priority
          />
        </div>
      </div>
    </div>
  );
};

interface AccountActionsProps {}
export const AccountActions = (props: AccountActionsProps) => {
  const [showTokenModal, setShowTokenModal] = useState<boolean>(false);
  return (
    <div className="flex gap-3">
      <Button
        className="[&>*]:text-white border !border-gray-500 !shadow-white"
        ghost
        shape="round"
      >
        Withdraw
      </Button>
      <Button
        onClick={() => setShowTokenModal((old) => !old)}
        className="[&>*]:text-black"
        type="primary"
        shape="round"
      >
        Deposit Funds
      </Button>
      <TokenModal
        isModalOpen={showTokenModal}
        onCancel={() => {
          setShowTokenModal((old) => !old);
        }}
      />
    </div>
  );
};

interface WalletTransactionsProps {}
export const WalletTransactions = (props: WalletTransactionsProps) => {
  return (
    <div className="flex flex-col w-full lg:w-[490px]">
      <div className="flex justify-between w-full mb-6 flex-wrap gap-4">
        <span className="text-lg font-medium ">Wallet Transactions</span>

        <Dropdown menu={menuProps}>
          <Button className="!rounded-lg !bg-[#292929]">
            <Space className="text-lg font-medium">
              <Image
                src="/icons/tune.svg"
                alt="Vercel Logo"
                width={20}
                height={20}
                priority
              />
              Deposited
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      </div>
      <div className="flex flex-col items-center w-full lg:w-[490px] p-3 mx-auto bg-[#292929] rounded-2xl">
        {Array(3)
          .fill(0)
          .map((e, index) => {
            return (
              <Fragment key={index}>
                {index > 0 && <Divider className="!my-2" />}
                <div key={index} className="flex flex-col gap-1 w-full py-3 ">
                  <div className="flex justify-between">
                    <span className="font-normal text-white text-opacity-60">
                      7th January 2024
                    </span>
                    <span className="font-bold text-base text-green-400">
                      20 TOON
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-white">All</span>
                    <span className="font-normal text-white text-opacity-60">
                      $ 20
                    </span>
                  </div>
                </div>
              </Fragment>
            );
          })}
      </div>
    </div>
  );
};
const items: MenuProps["items"] = [
  {
    label: <span className="text-lg font-medium">All</span>,
    key: "0",
  },
  {
    label: <span className="text-lg font-medium">Deposited</span>,
    key: "1",
  },
  {
    label: <span className="text-lg font-medium">Withdrawals</span>,
    key: "2",
  },
  {
    label: <span className="text-lg font-medium">Used</span>,
    key: "3",
  },
];

const menuProps = {
  items,
  //   onClick: handleMenuClick,
};
