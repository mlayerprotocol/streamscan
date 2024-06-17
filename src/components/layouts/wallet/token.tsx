"use client";
import {
  displayVariants,
  formLayout,
  metaToObject,
  shorternAddress,
} from "@/utils";
import React, { useContext, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CreateMessage, CreateTopic } from "@/components";
import { WalletContext } from "@/context";
import {
  Button,
  Dropdown,
  Form,
  Input,
  MenuProps,
  Space,
  Table,
  Tabs,
  TabsProps,
} from "antd";
import * as HeroIcons from "@heroicons/react/24/solid";
import moment from "moment";
interface TokensProps {
  onSuccess?: (values: any) => void;
  handleCreateAccount?: () => void;
}
export const Tokens = (props: TokensProps) => {
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
      {/* <Table dataSource={[]} columns={columns} /> */}
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </motion.div>
  );
};

const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    render: (text: any) => {
      return <span>{shorternAddress(text)}</span>;
    },
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text: any) => {
      return <span>{text}</span>;
    },
  },
  {
    title: "Symbol",
    dataIndex: "symbol",
    key: "symbol",
  },
  {
    title: "Total Supply",
    dataIndex: "total_supply",
    key: "total_supply",
  },
];
const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Messages",
    children: "Content of Tab Pane Events",
  },
  {
    key: "2",
    label: "Subscribers",
    children: "Content of Tab Pane Publishers",
  },
  {
    key: "3",
    label: "Settings",
    children: (
      <div className="flex flex-col my-8">
        <motion.div
          className="inline-block w-1/2 mx-auto"
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
            initialValues={{}}
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
              <span className="text-black">Update</span>
            </Button>
          </Form>
        </motion.div>
      </div>
    ),
  },
];
