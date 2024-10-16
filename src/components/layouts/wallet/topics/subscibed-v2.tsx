"use client";
import { displayVariants, metaToObject, shorternAddress } from "@/utils";
import * as HeroIcons from "@heroicons/react/24/solid";
import * as OutlineHeroIcons from "@heroicons/react/24/outline";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Button,
  Popconfirm,
  Spin,
  Table,
  TableProps,
  notification,
} from "antd";
import { CreateMessage, CreateTopic, JoinTopic } from "@/components";
import { WalletContext } from "@/context";
import { TopicData, TopicListModel } from "@/model/topic";
import { useRouter, useSearchParams } from "next/navigation";
import { Address, SubscriptionStatus } from "@mlayerprotocol/core/src/entities";
import { Entities }  from "@mlayerprotocol/core";
const status = SubscriptionStatus.Subscribed;
interface SubscribedV2TopicsProps {
  onSuccess?: (values: any) => void;
  handleCreateAccount?: () => void;
}
export const SubscribedV2Topics = (props: SubscribedV2TopicsProps) => {
  const router = useRouter();
  const [showCreateTopicModal, setShowCreateTopicModal] =
    useState<boolean>(false);
  const [showJoinTopicModal, setShowJoinTopicModal] = useState<boolean>(false);
  const [showCreateMessageModal, setShowCreateMessageModal] =
    useState<boolean>(false);
  const [urlTopicId, setUrlTopicId] = useState<string>();
  const [toggleState1, setToggleState1] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    console.log({ searchParams: searchParams.get("topicId") });
    setUrlTopicId(searchParams.get("topicId") ?? "");
  }, [searchParams]);

  useEffect(() => {
    console.log({ urlTopicId });
    if (!urlTopicId) return;
    setShowJoinTopicModal((old) => !old);
  }, [urlTopicId]);
  const {
    loaders,
    recordTopicList,
    getRecordTopicV2,
    agents,
    selectedAgent,
    authorizeAgent,
    subcribeToTopic,
    walletAccounts,
    connectedWallet,
    selectedSubnetId,
  } = useContext(WalletContext);
  const [selectedTopicId, setSelectedTopicId] = useState<string | undefined>();

  const account = useMemo(
    () => walletAccounts[connectedWallet ?? ""]?.[0],
    [walletAccounts, connectedWallet]
  );

  useEffect(() => {
    if (!connectedWallet) return;
    getRecordTopicV2?.(status, {
      params: {
        sub: Address.fromString(
          walletAccounts[connectedWallet]?.[0] as string
        ).toAddressString(),
        status,
        snet: selectedSubnetId,
      },
    });
  }, [walletAccounts, connectedWallet, toggleState1]);

  const topicListModel = useMemo<TopicListModel | undefined>(
    () => recordTopicList?.[status],
    [recordTopicList]
  );
  const dataSource = useMemo(() => {
    return topicListModel?.data?.map((kp: TopicData, index) => {
      // console.log(index, kp.address, authenticationData);
      return {
        ...kp,
        key: index,
      } as any;
    });
  }, [recordTopicList]);

  const columns: TableProps<TopicData>["columns"] = useMemo(() => {
    return [
      {
        title: "Id",
        dataIndex: "id",
        key: "id",
        render(value, record, index) {
          return shorternAddress(value);
        },
      },
      {
        title: "Ref",
        dataIndex: "ref",
        key: "ref",
        render(value, record, index) {
          return `${value}`;
        },
      },
      {
        title: "Name",
        dataIndex: "n",
        key: "n",
        render(value, record, index) {
          return metaToObject(record.meta)?.name ?? value ?? "";
        },
      },
      {
        title: "Public",
        dataIndex: "pub",
        key: "pub",
        render(value, record, index) {
          if (!value) {
            return (
              <OutlineHeroIcons.CheckCircleIcon className="h-[20px] text-gray-500" />
            );
          }
          return (
            <HeroIcons.CheckCircleIcon className="h-[20px] text-green-500" />
          );
        },
      },
      // {
      //   title: "Subscribers",
      //   dataIndex: "subscribers",
      //   key: "subscribers",
      // },
      // {
      //   title: "MLT Consumed",
      //   dataIndex: "bal",
      //   key: "bal",
      // },
      {
        title: "Action",
        dataIndex: "",
        key: "value",
        render: (text, record) => {
          return (
            <div className="flex gap-6">
              <Button
                type="link"
                onClick={async () => {
                  // setPreviewTopicId(record.id);
                  router.push(`?id=${record?.id}`, { scroll: false });
                }}
              >
                <HeroIcons.Bars4Icon className="h-[20px]" />
              </Button>
            </div>
          );
        },
      },
    ];
  }, [topicListModel]);
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
      <div className="flex gap-4 justify-end">
        {/* <Button
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
        </Button> */}
        <Button
          loading={loaders["subcribeToTopic"]}
          onClick={() => {
            setShowJoinTopicModal((old) => !old);
          }}
          className="self-end"
          type="primary"
          shape="round"
        >
          <span>Join Topic</span>
        </Button>
      </div>

      <Table
        // bordered
        dataSource={dataSource}
        columns={columns}
        loading={loaders["getAccountSubscriptions"]}
      />

      <CreateMessage
        isModalOpen={showCreateMessageModal}
        topicId={selectedTopicId}
        onCancel={() => {
          setShowCreateMessageModal((old) => !old);
        }}
      />
      <JoinTopic
        isModalOpen={showJoinTopicModal}
        onCancel={() => {
          setShowJoinTopicModal((old) => !old);
          setUrlTopicId(undefined);
        }}
        topicId={urlTopicId}
      />
    </motion.div>
  );
};
