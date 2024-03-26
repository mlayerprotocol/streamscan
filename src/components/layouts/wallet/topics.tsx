"use client";
import { displayVariants } from "@/utils";
import * as HeroIcons from "@heroicons/react/24/solid";
import React, { useContext, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button, Table, TableProps } from "antd";
import { CreateTopic } from "@/components";
import { WalletContext } from "@/context";
import { TopicData } from "@/model/topic";

const columns: TableProps<TopicData>["columns"] = [
  {
    title: "Hash",
    dataIndex: "h",
    key: "address",
  },
  {
    title: "Title",
    dataIndex: "n",
    key: "n",
  },
  {
    title: "Public",
    dataIndex: "pub",
    key: "pub",
    render(value, record, index) {
        return `${record.pub}`.toUpperCase();
    },
  },
  // {
  //   title: "Subscribers",
  //   dataIndex: "subscribers",
  //   key: "subscribers",
  // },
  {
    title: "MLT Balance",
    dataIndex: "bal",
    key: "bal",
  },
  {
    title: "",
    dataIndex: "",
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
  const { loaders, topicList } = useContext(WalletContext);

  const dataSource = useMemo(() => {
    return topicList?.data ?? [];
  }, [topicList]);
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
        loading={loaders["createTopic"]}
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
