"use client";
import { 
  displayVariants,
  formLayout,
  metaToObject,
  shorternAddress,
} from "@/utils";
import React, { useContext, useMemo, useEffect } from "react";
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
import { Messages } from "../messages";
import { TopicSetting } from "./settings";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
interface PreviewTopicProps {
  onSuccess?: (values: any) => void;
  handleCreateAccount?: () => void;
  topicId: string;
}
export const PreviewTopic = (props: PreviewTopicProps) => {
  const { topicId } = props;
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

  const searchParams = useSearchParams();
  const router = useRouter();

  const params = new URLSearchParams(searchParams.toString());

  const pathname = usePathname();

  useEffect(() => {
    if (!selectedMessagesTopicId) return;

    params.set("topic", selectedMessagesTopicId);
    console.log({ pathname, params: params.toString() });
    router.push(pathname + "?" + params.toString());
  }, [selectedMessagesTopicId]);

  const account = useMemo(
    () => walletAccounts[connectedWallet ?? ""]?.[0],
    [walletAccounts, connectedWallet]
  );

  const topic = useMemo(() => {
    if (!selectedMessagesTopicId && (accountTopicList?.data ?? []).length > 0) {
      setTimeout(() => {
        setSelectedMessagesTopicId?.((accountTopicList?.data ?? [])[0].id);
      }, 2000);
      return undefined;
    }
    return (accountTopicList?.data ?? []).find(
      (v) =>
        v.id == selectedMessagesTopicId
    );
  }, [selectedMessagesTopicId, accountTopicList]);

  const dropdownItems: MenuProps["items"] = useMemo(() => {
    return (accountTopicList?.data ?? [])
      .filter(
        (item) => item.snet == selectedSubnetId && item.acct == `did:${account}`
      )
      .map((el, index) => ({
        key: index,
        label: <span>{(metaToObject(el.meta)?.name ?? '') + ` [${el.ref ?? ''}]`}</span>,
        onClick: () => {
          // setSelectedMessagesTopicId?.(el.id);
          router.push(`?id=${el.id}`)
        },
      }));
  }, [accountTopicList]);


  useEffect(() => {
    setSelectedMessagesTopicId?.(topicId);
  }, [topicId]);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Messages",
      children: <Messages topicId={topicId} />,
    },
    {
      key: "2",
      label: "Devices",
      children: "Content of Tab Pane Publishers",
    },
    {
      key: "3",
      label: "Settings",
      children: <TopicSetting topicId={topicId} />
    },
  ];
  
  return (
    <motion.div
      className="inline-flex flex-col w-full gap-6 py-0"
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
              type="text"
              htmlType="submit"
              className="self-start"
        shape="round"
        icon={<HeroIcons.ArrowLeftIcon className="ml-2 h-[30px] " />}
        onClick={()=>router.push(`/subnet/${selectedSubnetId}/topics`)}
      />
      <div className="flex justify-between">
        <Dropdown menu={{ items: dropdownItems }} className="!border !border-gray-600 p-2 !rounded-md">
          <Space>
            <span className="text-gray-400">Select topic:{" "}</span>
            {metaToObject(topic?.meta)?.name ?? ''}{`[${topic?.ref ?? ''}]`}
            <HeroIcons.ChevronDownIcon className="ml-2 h-[20px]" />
          </Space>
        </Dropdown>

       <div> <span className="text-gray-400">Topic Id: </span>{topicId}</div>
      </div>
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
