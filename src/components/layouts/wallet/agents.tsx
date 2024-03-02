"use client";
import { displayVariants } from "@/utils";
import * as HeroIcons from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button, Table, TableProps } from "antd";
import { AuthorizeAgent } from "@/components";

const dataSource = [
  {
    key: "1",
    address: "0x20929230920392039023",
    role: "Admin",

    final: "10 minutes ago",
    value: "23,002,092,2003",
  },
  {
    key: "2",
    address: "0x20929230920392039023",
    role: "Admin",
    final: "10 minutes ago",
    value: "13,002,092,2003",
  },
];

const columns: TableProps<any>["columns"] = [
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Expires",
    dataIndex: "final",
    key: "address",
  },
  {
    title: "",
    dataIndex: "address",
    key: "value",
    render: (text) => {
      return (
        <div className="flex gap-6">
          <HeroIcons.PencilIcon className="h-[20px]" />
          <HeroIcons.XMarkIcon className="h-[20px]" />
        </div>
      );
    },
  },
];

interface AgentsProps {
  onSuccess?: (values: any) => void;
  handleCreateAccount?: () => void;
}
export const Agents = (props: AgentsProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <motion.div
      className="inline-flex w-full flex-col gap-6"
      variants={displayVariants}
      initial={"hidden"}
      animate={"show"}
      exit={{
        opacity: 0,
        scale: 0,
      }}
      // transition={{ duration: 1, delay: 1 }}
    >
      <span>
        For security and flexibility, Agents act on behalf of Accounts in the
        maLyer network, for example, a compromised rolent can quickly be
        deauthorized to prevent further attack. Learn more...
      </span>
      <Button
        onClick={() => {
          setShowModal((old) => !old);
        }}
        className="self-end"
        ghost
        type="primary"
        shape="round"
      >
        <span>Authorize Agent/Device</span>
      </Button>
      <Table dataSource={dataSource} columns={columns} />
      <AuthorizeAgent
        isModalOpen={showModal}
        onCancel={() => {
          setShowModal((old) => !old);
        }}
      />
    </motion.div>
  );
};
