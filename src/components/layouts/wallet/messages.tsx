"use client";
import { ML_ACCOUNT_DID_STRING, displayVariants, metaToObject, shorternAddress } from "@/utils";
import React, { useContext, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CreateMessage, CreateTopic } from "@/components";
import { WalletContext } from "@/context";
import { Button, Dropdown, MenuProps, Space, Table } from "antd";
import * as HeroIcons from "@heroicons/react/24/solid";
import moment from "moment";
import { Address } from "@mlayerprotocol/core/src/entities";
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
    selectedSubnetId,
    walletAccounts,
    connectedWallet,
    selectedMessagesTopicId,
    messagesList,
    setSelectedMessagesTopicId,
  } = useContext(WalletContext);

  const account = useMemo(
    () => walletAccounts[connectedWallet ?? ""]?.[0],
    [walletAccounts, connectedWallet]
  );
  const  accountAsAddress = Address.fromString(account).toAddressString()
  const topic = useMemo(() => {
    if (!selectedMessagesTopicId && (accountTopicList?.data ?? []).length > 0) {
      setTimeout(() => {
        setSelectedMessagesTopicId?.((accountTopicList?.data ?? [])[0].id);
      }, 2000);
      return undefined;
    }
    return (accountTopicList?.data ?? []).find(
      (v) =>
        v.snet == selectedSubnetId &&
        v.acct == accountAsAddress &&
        v.id == selectedMessagesTopicId
    );
  }, [selectedMessagesTopicId, accountTopicList]);

  const items: MenuProps["items"] = useMemo(() => {
    return (accountTopicList?.data ?? [])
      .filter(
        (item) => item.snet == selectedSubnetId && item.acct == accountAsAddress
      )
      .map((el, index) => ({
        key: index,
        label: <span>{metaToObject(el.meta)?.name ?? el.ref}</span>,
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
            Select topic:{" "}
            {metaToObject(topic?.meta)?.name ?? topic?.ref ?? "--"}
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
