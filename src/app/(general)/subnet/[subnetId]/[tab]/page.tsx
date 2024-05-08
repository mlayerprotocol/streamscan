"use client";
import React, { useContext, useState } from "react";

import { MainAuth, WalletMainLayout } from "@/components";
import { WalletContext } from "@/context";
import { Button, Card, Dropdown, MenuProps, Space } from "antd";
import * as HeroIcons from "@heroicons/react/24/solid";
import { shorternAddress, metaToObject } from "@/utils";

const WalletPage = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const {
    selectedAgent,
    setSelectedAgent,
    connectedWallet,
    combinedAgents,
    subnetListModelList,
    setSelectedSubnetId,
    selectedSubnetId,
  } = useContext(WalletContext);
  const items: MenuProps["items"] =
    combinedAgents
      .filter((cAgt) => cAgt.privateKey && cAgt.authData)
      .map((item, index) => {
        return {
          key: index,
          label: <span>{shorternAddress(item.address)}</span>,
          onClick: () => {
            setSelectedAgent?.(item.address);
          },
        };
      }) ?? [];

  const subnetItems: MenuProps["items"] =
    subnetListModelList?.data.map((subnet, index) => {
      return {
        key: index,
        label: <span>{metaToObject(subnet.meta)?.name ?? subnet.ref}</span>,
        onClick: () => {
          setSelectedSubnetId?.(subnet.id);
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
      <div className="flex justify-between mb-4 ">
        <Dropdown
          menu={{ items: subnetItems }}
          className="!border !border-gray-600 p-2 !rounded-md"
        >
          <Space>
            <span className="text-gray-400">Subnet: </span>
            {subnetListModelList?.data.length
              ? subnetListModelList.data
                  .filter((opt) => opt.id == selectedSubnetId)
                  .map((e) => {
                    return {
                      ...e,
                      name: metaToObject(e.meta)?.name ?? e.ref,
                    };
                  })?.[0]?.name ?? ""
              : "No subnet selected"}
            <HeroIcons.ChevronDownIcon className="ml-2 h-[20px]" />
          </Space>
        </Dropdown>
        <Dropdown
          menu={{ items }}
          className="!border !border-gray-600 p-2 !rounded-md"
        >
          <Space>
            <span className="text-gray-400">Active Agents: </span>
            {items.length
              ? shorternAddress(
                  combinedAgents.find((opt) => opt.address == selectedAgent)
                    ?.address ?? ""
                )
              : "No approved agents found"}
            <HeroIcons.ChevronDownIcon className="ml-2 h-[20px]" />
          </Space>
        </Dropdown>
      </div>
      <WalletMainLayout />
    </Card>
  );
};

export default WalletPage;
