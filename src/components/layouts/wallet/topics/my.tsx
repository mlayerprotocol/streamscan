"use client";
import { displayVariants, shorternAddress } from "@/utils";
import * as HeroIcons from "@heroicons/react/24/solid";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button, Popconfirm, Spin, Table, TableProps } from "antd";
import { CreateMessage, CreateTopic } from "@/components";
import { WalletContext } from "@/context";
import { TopicData } from "@/model/topic";

interface MyTopicsProps {
  onSuccess?: (values: any) => void;
  handleCreateAccount?: () => void;
}
export const MyTopics = (props: MyTopicsProps) => {
  const [showCreateTopicModal, setShowCreateTopicModal] =
    useState<boolean>(false);
  const [showCreateMessageModal, setShowCreateMessageModal] =
    useState<boolean>(false);
  const {
    loaders,
    accountTopicList,
    subcribeToTopic,
    agents,
    selectedAgent,
    walletAccounts,
    connectedWallet,
  } = useContext(WalletContext);
  const [selectedTopicId, setSelectedTopicId] = useState<string | undefined>();
  const account = useMemo(
    () => walletAccounts[connectedWallet ?? ""]?.[0],
    [walletAccounts, connectedWallet]
  );
  const dataSource = useMemo(() => {
    return (accountTopicList?.data ?? []).filter(
      (item) => item.acct == `did:${account}`
    );
  }, [accountTopicList, account]);
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
        title: "MLT Balance",
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
  }, [accountTopicList]);
  console.log({ account });
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
        loading={loaders["getAccountSubscriptions"]}
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
