"use client";
import { WalletContext } from "@/context";
import { randomImageUrl } from "@/utils";
import { Card, Table } from "antd";
import Link from "next/link";
import React, { useContext, useMemo } from "react";

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
  const {
    loaders,
    blockStatsList,
    subcribeToTopic,
    agents,
    selectedAgent,
    walletAccounts,
    connectedWallet,
  } = useContext(WalletContext);

  const dataSource = useMemo(() => {
    return blockStatsList?.data ?? [];
  }, [blockStatsList]);
  return (
    <Card className="shadow-2xl">
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
  );
};

export default DashboardPage;
