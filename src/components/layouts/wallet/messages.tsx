"use client";
import { displayVariants } from "@/utils";
import React, { useContext, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CreateMessage, CreateTopic } from "@/components";
import { WalletContext } from "@/context";
import { Button, Table } from "antd";
interface MessagesProps {
  onSuccess?: (values: any) => void;
  handleCreateAccount?: () => void;
}
export const Messages = (props: MessagesProps) => {
  const [showCreateMessageModal, setShowCreateMessageModal] =
    useState<boolean>(false);
  const { loaders, subcribeToTopic, agents, selectedAgent } =
    useContext(WalletContext);
  const [selectedTopicId, setSelectedTopicId] = useState<string | undefined>();

  return (
    <motion.div
      className="inline-block w-full"
      variants={displayVariants}
      initial={"hidden"}
      animate={"show"}
      exit={{
        opacity: 0,
        scale: 0,
      }}
      // transition={{ duration: 1, delay: 1 }}
    >
      <div className="flex">
        <span>
          Messages received Lorem ipsum dolor sit amet, consectetur adipisicing
          elit. Harum tenetur aliquid eveniet doloribus eos alias maiores
          voluptas blanditiis qui excepturi hic, ipsa dignissimos autem!
          Temporibus nemo accusamus voluptate voluptas exercitationem.
        </span>
        <Button
          loading={loaders["sendMessage"]}
          onClick={() => {
            setShowCreateMessageModal((old) => !old);
          }}
          className="self-start"
          ghost
          type="primary"
          shape="round"
        >
          <span>Send Message</span>
        </Button>
      </div>
      <Table dataSource={dataSource} columns={columns} />

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
const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
];

const columns = [
  {
    title: "Hash",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Data",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Send",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Receiver",
    dataIndex: "address",
    key: "address1",
  },
];
