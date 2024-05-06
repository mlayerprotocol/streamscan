"use client";
import { CreateSubnet } from "@/components";
import { WalletContext } from "@/context";
import { metaToObject } from "@/utils";
import * as HeroIcons from "@heroicons/react/24/solid";
import { Button, Card } from "antd";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";

const SubnetPage = () => {
  const router = useRouter();
  const [showCreateSubnetModal, setShowCreateSubnetModal] =
    useState<boolean>(false);
  const {
    subnetListModelList,
    setSelectedSubnetId,
    selectedSubnetId,
    loaders,
  } = useContext(WalletContext);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <HeroIcons.InformationCircleIcon className=" h-[48px] " />
        <span className=" text-gray-500">
          For security and flexibility, Agents act on behalf of Accounts on the
          mLayer network. For example, a compromised agent can quickly be
          deauthorized to prevent further attack. Learn more...
        </span>
      </div>
      <div className="flex gap-2">
        <Button
          loading={loaders["createSubnet"]}
          onClick={() => {
            setShowCreateSubnetModal((old) => !old);
          }}
          type="primary"
          shape="round"
        >
          + Create New Subnet
        </Button>
        <CreateSubnet
          isModalOpen={showCreateSubnetModal}
          onCancel={() => {
            setShowCreateSubnetModal((old) => !old);
          }}
        />
      </div>

      <div className="flex items-center justify-center flex-wrap gap-2">
        {subnetListModelList?.data?.map((subnet, index) => (
          <Card
            onClick={() => {
              setSelectedSubnetId?.(subnet.id);
              router.push(`subnet/${subnet.id}/agents`, { scroll: false });
            }}
            className=" w-[400px] "
            key={index}
            bordered={subnet.id == selectedSubnetId}
          >
            <div className="flex flex-col">
              <span className="text-lg">{subnet?.ref}</span>
              <span className="">{metaToObject(subnet?.meta)?.name}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SubnetPage;
