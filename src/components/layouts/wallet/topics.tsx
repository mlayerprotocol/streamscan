"use client";
import { displayVariants } from "@/utils";
import * as HeroIcons from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button, Table, TableProps } from "antd";
import { CreateTopic } from "@/components";

const dataSource = [
  {
    key: "1",
    address: "0x20929230920392039023",
    role: "Admin",
    title: "Test Topic",
    public: "True",

    subscribers: "10",
    value: "23,002,092,2003",
  },
  {
    key: "2",
    address: "0x20929230920392039023",
    role: "Admin",
    title: "Another TOpic",
    public: "False",
    subscribers: "10",
    value: "13,002,092,2003",
  },
];

const columns: TableProps<any>["columns"] = [
  {
    title: "Hash",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "role",
  },
  {
    title: "Public",
    dataIndex: "public",
    key: "address",
  },
  {
    title: "Subscribers",
    dataIndex: "subscribers",
    key: "subscribers",
  },
  {
    title: "MLT Balance",
    dataIndex: "value",
    key: "value",
  },
  {
    title: "",
    dataIndex: "address",
    key: "value",
    render: (text) => {
      return (
        <div className="flex gap-6">
          <HeroIcons.ChatBubbleOvalLeftEllipsisIcon className="h-[20px]" />
          <HeroIcons.ArrowUpTrayIcon className="h-[20px]" />
          <HeroIcons.PencilIcon className="h-[20px]" />
          <HeroIcons.XMarkIcon className="h-[20px]" />
        </div>
      );
    },
  },
];

interface TopicsProps {
  onSuccess?: (values: any) => void;
  handleCreateAccount?: () => void;
}
export const Topics = (props: TopicsProps) => {
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
        Topic are communication channels. Every subscriber to a topic receives
        the data/messages sent to that topic.
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
        <span>Create Topic</span>
      </Button>
      <Table dataSource={dataSource} columns={columns} />
      <CreateTopic
        isModalOpen={showModal}
        onCancel={() => {
          setShowModal((old) => !old);
        }}
      />
    </motion.div>
  );
};
