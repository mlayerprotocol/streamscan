"use client";
import React, { useContext } from "react";

import { WalletMainLayout } from "@/components";
import { WalletContext } from "@/context";
import { Dropdown, MenuProps, Space } from "antd";
import * as HeroIcons from "@heroicons/react/24/solid";
import { shorternAddress } from "@/utils";

const WalletPage = () => {
  const { selectedAgent, setSelectedAgent, agents, authenticationList } =
    useContext(WalletContext);
  const items: MenuProps["items"] = authenticationList?.data.map(
    (item, index) => {
      return {
        key: index,
        label: <span>{shorternAddress(item.agt)}</span>,
        onClick: () => {
          setSelectedAgent?.(item.agt);
        },
      };
    }
  );
  return (
    <div className="flex flex-col border-gray-200 border p-4">
      <div className="flex justify-center mb-4">
        <Dropdown menu={{ items }}>
          <Space>
            Connected Account:{" "}
            {shorternAddress(
              authenticationList?.data.find((opt) => opt.agt == selectedAgent)
                ?.agt ?? ""
            )}
            <HeroIcons.ChevronDownIcon className="ml-2 h-[20px] text-white" />
          </Space>
        </Dropdown>
      </div>
      <WalletMainLayout />
    </div>
  );
};

export default WalletPage;
