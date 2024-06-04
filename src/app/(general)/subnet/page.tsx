"use client";
import { CreateSubnet } from "@/components";
import { WalletContext } from "@/context";
import { INFO_LINKS, metaToObject } from "@/utils";
import * as HeroIcons from "@heroicons/react/24/solid";
import { Button, Card, Space, Empty } from "antd";
import { useRouter,  } from "next/navigation";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { Footer } from "antd/es/layout/layout";

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
    <div className="flex flex-col gap-4 min-h-[70vh]">
      <div className="flex gap-2 px-20 my-5">
        <Space>
        <HeroIcons.InformationCircleIcon className="h-[48px] " />
        <span className=" text-gray-500">
          Subnets allow you separate projects into dedicated environments. Create a subnet for each project you build on mLayer. <Link target="_blank" href={INFO_LINKS.subnetInfo}>Learn more...</Link>
        </span>
        </Space>
      </div>
      <div className="flex gap-2 mt-5 mb-5 justify-between">
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
        <Button  shape="round"  type="default" href={"/pending-topic"} className="font-medium text-base ml-2 self-end">
          Pending Invitations
        </Button>
        
      </div>
      <CreateSubnet
          isModalOpen={showCreateSubnetModal}
          onCancel={() => {
            setShowCreateSubnetModal((old) => !old);
          }}
        />
     
      {subnetListModelList?.data?.length == 0 &&  <Empty description="No subnet created"/>}
      <div className="flex items-center justify-start flex-wrap gap-2">
       
        {subnetListModelList?.data?.map((subnet, index) => {
          const enabled = subnet.st  == 1;
        
         return <Card
        
            onClick={() => {
              setSelectedSubnetId?.(subnet.id);
              router.push(`subnet/${subnet.id}/agents`, { scroll: false });
            }}
            className=" w-[400px] cursor-pointer "
            key={index}
            bordered={subnet.id == selectedSubnetId}
          >
            <div className="flex flex-col">
           
             <div className="flex justify-between">
               <span className="">{subnet?.ref ?? ''}</span>
               {enabled? <span className="relative flex flex-end h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-100 opacity-50"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-300  opacity-60"></span>
              </span> : <span className="relative flex flex-end h-3 w-3">
               
                <span className="relative inline-flex rounded-full h-3 w-3 bg-gray-500"></span>
               </span>}
             </div>
              <span className="text-lg">{metaToObject(subnet?.meta)?.name ?? ''}</span>
            </div>
          </Card>
        
}
        )}
      </div>
    </div>
  );
};

export default SubnetPage;
