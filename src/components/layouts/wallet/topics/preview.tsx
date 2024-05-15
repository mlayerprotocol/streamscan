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
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PreviewTopicProps {
  onSuccess?: (values: any) => void;
  handleCreateAccount?: () => void;
}
export const PreviewTopic = (props: PreviewTopicProps) => {
  const {
    //
  } = props;
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
        v.snet == selectedSubnetId &&
        v.acct == `did:${account}` &&
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

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Events",
      children: (
        <Table
          loading={loaders["getTopicMessages"]}
          dataSource={dataSource}
          columns={eventColumns}
        />
      ),
    },
    {
      key: "2",
      label: "Publishers",
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
                  {
                    required: true,
                    message: "Please input select a reference!",
                  },
                ]}
              >
                <Input placeholder="Enter A Reference" />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                className="w-full mt-[28px] self-end"
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
        <HeroIcons.ArrowLeftIcon
          onClick={() => {
            router.back();
          }}
          className="ml-2 h-[20px]"
        />
      </div>
      <div className="flex justify-between">
        <Dropdown menu={{ items: dropdownItems }}>
          <Space>
            Select topic:{" "}
            {metaToObject(topic?.meta)?.name ?? topic?.ref ?? "--"}
            <HeroIcons.ChevronDownIcon className="ml-2 h-[20px]" />
          </Space>
        </Dropdown>

        <span>{selectedMessagesTopicId}</span>
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
const eventColumns = [
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
