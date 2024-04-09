"use client";
import { displayVariants, shorternAddress } from "@/utils";
import React, { useContext, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CreateMessage, CreateTopic } from "@/components";
import { WalletContext } from "@/context";
import { Button, Dropdown, MenuProps, Space, Table } from "antd";
import * as HeroIcons from "@heroicons/react/24/solid";
import moment from "moment";
interface MessagesProps {
  onSuccess?: (values: any) => void;
  handleCreateAccount?: () => void;
}
export const Messages = (props: MessagesProps) => {
  const [showCreateMessageModal, setShowCreateMessageModal] =
    useState<boolean>(false);
  const {
    loaders,
    accountTopicList,
    agents,
    selectedMessagesTopicId,
    messagesList,
    setSelectedMessagesTopicId,
  } = useContext(WalletContext);

  const topic = useMemo(() => {
    if (!selectedMessagesTopicId && (accountTopicList?.data ?? []).length > 0) {
      setTimeout(() => {
        setSelectedMessagesTopicId?.((accountTopicList?.data ?? [])[0].id);
      }, 2000);
      return undefined;
    }
    return (accountTopicList?.data ?? []).find(
      (v) => v.id == selectedMessagesTopicId
    );
  }, [selectedMessagesTopicId, accountTopicList]);

  const items: MenuProps["items"] = useMemo(() => {
    return (accountTopicList?.data ?? []).map((el, index) => ({
      key: index,
      label: <span>{el.n}</span>,
      onClick: () => {
        setSelectedMessagesTopicId?.(el.id);
      },
    }));
  }, [accountTopicList]);

  const dataSource = useMemo(() => {
    return (messagesList?.data ?? []).map((msg, index) => {
      return {
        key: index,
        sender: msg.s,
        message: msg.d,
        date: moment(Date.parse(msg.CreatedAt)).fromNow(),
      };
    });
  }, [selectedMessagesTopicId, messagesList]);

  return (
    <motion.div
      className="inline-flex flex-col w-full gap-6 py-8"
      variants={displayVariants}
      initial={"hidden"}
      animate={"show"}
      exit={{
        opacity: 0,
        scale: 0,
      }}
      // transition={{ duration: 1, delay: 1 }}
    >
      <div className="flex justify-between">
        <Dropdown menu={{ items }}>
          <Space>
            Select topic: {topic?.n ?? "--"}
            <HeroIcons.ChevronDownIcon className="ml-2 h-[20px]" />
          </Space>
        </Dropdown>
        <Button
          loading={loaders["sendMessage"]}
          onClick={() => {
            setShowCreateMessageModal((old) => !old);
          }}
          className=""
          ghost
          type="primary"
          shape="round"
        >
          <span>Send Message</span>
        </Button>
      </div>
      <Table
        loading={loaders["getTopicMessages"]}
        dataSource={dataSource}
        columns={columns}
      />

      <CreateMessage
        isModalOpen={showCreateMessageModal}
        topicId={selectedMessagesTopicId}
        onCancel={() => {
          setShowCreateMessageModal((old) => !old);
        }}
      />
    </motion.div>
  );
};

const columns = [
  {
    title: "Sender",
    dataIndex: "sender",
    key: "sender",
    render: (text: any) => {
      return <span>{shorternAddress(text)}</span>;
    },
  },
  {
    title: "Message",
    dataIndex: "message",
    key: "message",
    render: (text: any) => {
      return <span>{Buffer.from(text, "hex").toString()}</span>;
    },
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
];
