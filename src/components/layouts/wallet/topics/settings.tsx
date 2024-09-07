"use client";
import { ML_ACCOUNT_DID_STRING, displayVariants, formLayout, metaToObject, shorternAddress } from "@/utils";
import React, { useContext, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CreateMessage, CreateTopic } from "@/components";
import { WalletContext } from "@/context";
import { Button, Dropdown, Form, Input, MenuProps, Space, Table } from "antd";
import * as HeroIcons from "@heroicons/react/24/solid";
import moment from "moment";
import { Address } from "@mlayerprotocol/core/src/entities";
interface TopicSettingsProps {
  topicId: string;
  onSuccess?: (values: any) => void;
  handleCreateAccount?: () => void;
}
export const TopicSetting = (props: TopicSettingsProps) => {
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
  const { topicId } = props;
  const account = useMemo(
    () => walletAccounts[connectedWallet ?? ""]?.[0],
    [walletAccounts, connectedWallet]
  );
 
  const  accountAsAddress = Address.fromString(account).toAddressString()
  const topic = useMemo(() => {
    if (!selectedMessagesTopicId && (accountTopicList?.data ?? []).length > 0) {
      setTimeout(() => {
        setSelectedMessagesTopicId?.((accountTopicList?.data ?? []).find(d=>d.id==topicId)?.id);
      }, 2000);
      return undefined;
    }
    return (accountTopicList?.data ?? []).find(
      (v) =>
        v.snet == selectedSubnetId &&
        v.acct == accountAsAddress &&
        v.id == selectedMessagesTopicId
    );
  }, [topicId, accountTopicList]);

 

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
      <Form
              {...formLayout}
              className="flex flex-col"
              name="basic"
              // form={form}
        initialValues={topic ? { ...topic, n: metaToObject(topic.meta)?.name } : {}}
              onFinish={(data) => {
                const name: string = data["n"];
                const ref: string = data["ref"];
                const status: number = data["status"];
              }}
              // onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label={`Name: `}
                name="n"
                rules={[{ required: true, message: "Please input a name!" }]}
              >
                <Input placeholder="Enter A Name" />
              </Form.Item>
  
              <Form.Item
                label={`Reference: `}
                name="ref"
                rules={[
                  { required: true, message: "Please input select a reference!" },
                ]}
              
              >
                <Input placeholder="Enter A Reference" />
              </Form.Item>
  
              <Button
                type="primary"
                htmlType="submit"
                className=" mt-[28px] self-end"
                shape="round"
              >
                <span className="">Update</span>
              </Button>
            </Form>
    </motion.div>
  );
};

