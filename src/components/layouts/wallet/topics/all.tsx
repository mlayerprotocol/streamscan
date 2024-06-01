"use client";
import { displayVariants, shorternAddress } from "@/utils";
import * as HeroIcons from "@heroicons/react/24/solid";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button, Popconfirm, Spin, Table, TableProps } from "antd";
import { CreateMessage, CreateTopic } from "@/components";
import { WalletContext } from "@/context";
import { TopicData } from "@/model/topic";

interface AllTopicsProps {
  onSuccess?: (values: any) => void;
  handleCreateAccount?: () => void;
}
export const AllTopics = (props: AllTopicsProps) => {
  const [showCreateTopicModal, setShowCreateTopicModal] =
    useState<boolean>(false);
  const [showCreateMessageModal, setShowCreateMessageModal] =
    useState<boolean>(false);
  const {
    loaders,
    topicList,
    subcribeToTopic,
    agents,
    selectedAgent,
    walletAccounts,
    connectedWallet,
  } = useContext(WalletContext);
  const [selectedTopicId, setSelectedTopicId] = useState<string | undefined>();

  // const account = useMemo(
  //   () => walletAccounts[connectedWallet ?? ""]?.[0],
  //   [walletAccounts, connectedWallet]
  // );
  const dataSource = useMemo(() => {
    return topicList?.data ?? [];
  }, [topicList]);
  const agent = useMemo(() => {
    return agents.find((opt) => opt.address == selectedAgent);
  }, [agents, selectedAgent]);

  const columns: TableProps<TopicData>["columns"] = useMemo(() => {
    return [
      {
        title: "Hash",
        dataIndex: "h",
        key: "address",
        render(value, record, index) {
          return shorternAddress(value);
        },
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
        title: "MSG Consumption",
        dataIndex: "bal",
        key: "bal",
      },
      {
        title: "",
        dataIndex: "",
        key: "value",
        render: (text, record) => {
          return (
            <div className="flex gap-6">
              {/* <Popconfirm
                title="Subscribe to topic"
                description="Are you sure to subcribe to this topic?"
                onConfirm={() => {
                  //

                  if (agent) subcribeToTopic?.(agent, record.id);
                }}
                // onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  type="link"
                  loading={loaders[`subcribeToTopic-${record.id}`]}
                >
                  <HeroIcons.PlayCircleIcon className="h-[20px]" />
                </Button>
              </Popconfirm> */}
              <Button
                type="link"
                loading={loaders[`sendMessage-${record.id}`]}
                onClick={async () => {
                  setSelectedTopicId(record.id);
                  setShowCreateMessageModal((old) => !old);
                }}
              >
                <HeroIcons.ChatBubbleOvalLeftEllipsisIcon className="h-[20px]" />
              </Button>
              <Button type="link">
                <HeroIcons.ArrowUpTrayIcon className="h-[20px]" />
              </Button>
              <Button type="link">
                <HeroIcons.PencilIcon className="h-[20px]" />
              </Button>
              <Button type="link">
                <HeroIcons.XMarkIcon className="h-[20px]" />
              </Button>
            </div>
          );
        },
      },
    ];
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
     
      <Button
        loading={loaders["createTopic"]}
        onClick={() => {
          setShowCreateTopicModal((old) => !old);
        }}
        className="self-end"
        ghost
        type="primary"
        shape="round"
      >
        <span>Create Topic</span>
      </Button>
      <Table
        dataSource={dataSource}
        columns={columns}
        loading={loaders["getTopic"]}
      />
      <CreateTopic
        isModalOpen={showCreateTopicModal}
        onCancel={() => {
          setShowCreateTopicModal((old) => !old);
        }}
      />
      <CreateMessage
        isModalOpen={showCreateMessageModal}
        topicId={selectedTopicId}
        onCancel={() => {
          setShowCreateMessageModal((old) => !old);
        }}
      />
    </motion.div>
  );
};
