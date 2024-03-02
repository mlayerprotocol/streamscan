import { randomImageUrl } from "@/utils";
import { Table } from "antd";
import Link from "next/link";
import React from "react";

const dataSource = [
  {
    key: "1",
    name: "#2299999",
    age: 233,
    address: "10 Downing Street",
    final: "10 minutes ago",
    value:"23,002,092,2003"
  },
  {
    key: "2",
    name: "#2299999",
    age: 423,
    address: "10 Downing Street",
    final: "10 minutes ago",
    value:"13,002,092,2003"
  },
];

const columns = [
  {
    title: "Height",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Cycle",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Events",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "MLT Value",
    dataIndex: "address",
    key: "value",
  },
  {
    title: "Finalized",
    dataIndex: "address",
    key: "finalized",
  },
];

const DashboardPage = () => {
  return (
    <div className="flex flex-col border-gray-200 border p-4">
      <div className="flex justify-between mb-4">
        <span className="font-bold text-xl">Recent Blocks</span>
        <Link href={"/"}>View all</Link>
      </div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default DashboardPage;
