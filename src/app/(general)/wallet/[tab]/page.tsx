"use client";
import React, { useContext, useState } from "react";

import { MainAuth, WalletMainLayout } from "@/components";
import { WalletContext } from "@/context";
import { Button, Card, Dropdown, MenuProps, Space } from "antd";
import * as HeroIcons from "@heroicons/react/24/solid";
import { shorternAddress } from "@/utils";

const WalletPage = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const {
    selectedAgent,
    setSelectedAgent,
    connectedWallet,
    authenticationList,
  } = useContext(WalletContext);
  const items: MenuProps["items"] =
    authenticationList?.data.map((item, index) => {
      return {
        key: index,
        label: <span>{shorternAddress(item.agt)}</span>,
        onClick: () => {
          setSelectedAgent?.(item.agt);
        },
      };
    }) ?? [];
  if (!connectedWallet) {
    return (
      <div className="flex flex-col my-8">
        <Button
          onClick={() => {
            setShowModal((old) => !old);
          }}
          className="self-center"
          type="primary"
          shape="round"
          size="large"
        >
          Connect
        </Button>
        <MainAuth
          isModalOpen={showModal}
          onCancel={() => {
            setShowModal((old) => !old);
          }}
        />
      </div>
    );
  }
  return (
    <Card className="shadow-2xl !rounded-2xl">
      <div className="flex justify-center mb-4 ">
        <Dropdown menu={{ items }} className="!border !border-gray-600 p-2 !rounded-md">
          <Space>
           <span className="text-gray-400">Active Agents:</span>{" "}
            {shorternAddress(
              authenticationList?.data.find((opt) => opt.agt == selectedAgent)
                ?.agt ?? ""
            )}
            <HeroIcons.ChevronDownIcon className="ml-2 h-[20px]" />
          </Space>
        </Dropdown>
      </div>
      <WalletMainLayout />
    </Card>
  );
};

export default WalletPage;
