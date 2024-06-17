"use client";
import { displayVariants, metaToObject, shorternAddress } from "@/utils";
import React, { useContext, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CreateMessage, CreateTopic } from "@/components";
import { WalletContext } from "@/context";
import { Button, Dropdown, MenuProps, Space, Table } from "antd";
import * as HeroIcons from "@heroicons/react/24/solid";
import moment from "moment";
interface SmartletsProps {
  onSuccess?: (values: any) => void;
  handleCreateAccount?: () => void;
}
export const Smartlets = (props: SmartletsProps) => {
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
      <Table dataSource={[]} columns={columns} />
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
    title: "Current Version",
    dataIndex: "version",
    key: "version",
  },
];
