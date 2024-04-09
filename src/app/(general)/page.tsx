"use client";
import { WalletContext } from "@/context";
import { Card, Divider, Table } from "antd";
import Link from "next/link";
import React, { useContext, useMemo } from "react";
import * as HeroIcons from "@heroicons/react/24/solid";
import { HomeStatCardOne } from "@/components";

const columns = [
  {
    title: "Height",
    dataIndex: "blk",
    key: "blk",
  },
  {
    title: "Cycle",
    dataIndex: "c",
    key: "c",
  },
  {
    title: "Events",
    dataIndex: "t",
    key: "t",
  },
  {
    title: "MLT Value",
    dataIndex: "id",
    key: "id",
  },
  // {
  //   title: "Finalized",
  //   dataIndex: "address",
  //   key: "finalized",
  // },
];

const DashboardPage = () => {
  const { loaders, blockStatsList } = useContext(WalletContext);

  const dataSource = useMemo(() => {
    return blockStatsList?.data ?? [];
  }, [blockStatsList]);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Card className="shadow-2xl !rounded-2xl grow flex items-center justify-center [&>.ant-card-body]:flex [&>.ant-card-body]:grow [&>.ant-card-body]:items-center [&>.ant-card-body]:flex-wrap">
          <div className="flex flex-col grow gap-2">
            <HomeStatCardOne
              title="Total Accounts"
              amount="222,341,222"
              date="24h"
              offset="+192,341"
              icon={<HeroIcons.UsersIcon className="ml-2 h-[30px] " />}
            />
            <HomeStatCardOne
              title="Total Messages"
              amount="121,222"
              date="2h"
              offset="+2,341"
              icon={<HeroIcons.EnvelopeIcon className="ml-2 h-[30px] " />}
            />
          </div>
          <Divider type="vertical" className="!h-[50px]" />
          <div className="flex flex-col grow gap-2">
            <HomeStatCardOne
              title="TVL"
              amount="$932,341,222"
              date="24h"
              offset="-192,341"
              icon={<HeroIcons.BarsArrowUpIcon className="ml-2 h-[30px] " />}
            />
            <HomeStatCardOne
              title="Total Transfer Volume"
              amount="121,222"
              date="2h"
              offset="+$111, 121,212,341"
              icon={<HeroIcons.WalletIcon className="ml-2 h-[30px] " />}
            />
          </div>
        </Card>
      </div>
      <Card className="shadow-2xl !rounded-2xl">
        <div className="flex justify-between mb-4">
          <span className="font-bold text-xl">Recent Blocks</span>
          <Link href={"/"}>View all</Link>
        </div>
        <Table
          dataSource={dataSource}
          columns={columns}
          loading={loaders["getBlockStats"]}
        />
      </Card>
    </div>
  );
};

export default DashboardPage;
