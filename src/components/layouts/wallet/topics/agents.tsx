"use client";
import {
  INFO_LINKS,
  PREVILEDGES,
  displayVariants,
  shorternAddress,
} from "@/utils";
import * as HeroIcons from "@heroicons/react/24/solid";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button, Table, TableProps, notification } from "antd";
import { AuthorizeAgent, JoinTopic, NewAgent, PrivateKey } from "@/components";
import { WalletContext } from "@/context";
import moment from "moment";
import { AddAgentToTopic } from "@/components/modals/topics/add-agent-to-topic";
import { Address, SubscriptionStatus } from "@mlayerprotocol/core/src/entities";
import { SubscriberData, SubscriberListModel } from "@/model/subscribers";

interface TopicAgentsProps {
  topicId: string;
  onSuccess?: (values: any) => void;
  handleCreateAccount?: () => void;
}
export const TopicAgents = (props: TopicAgentsProps) => {
  const [authAddress, setAuthAddress] = useState<AddressData>();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [toggleState1, setToggleState1] = useState(false);
  const [showPrivateKeyModal, setShowPrivateKeyModal] =
    useState<boolean>(false);
  const { topicId } = props;

  const {
    walletAccounts,
    connectedWallet,
    // combinedAgents,
    // authenticationList,
    getTopicSubscribers,
    subscriberTopicList,
    loaders,
  } = useContext(WalletContext);

  useEffect(() => {
    if (!connectedWallet) return;
    getTopicSubscribers?.(topicId, {
      params: {
        // acct: Address.fromString(
        //   walletAccounts[connectedWallet]?.[0]
        // ).toAddressString(),
        top: topicId,
      },
    });
  }, [walletAccounts, connectedWallet, topicId, toggleState1]);

  const subscriberListModel = useMemo<SubscriberListModel | undefined>(
    () => subscriberTopicList?.[topicId],
    [subscriberTopicList, topicId]
  );

  const dataSource = useMemo(() => {
    return subscriberListModel?.data.map((kp: SubscriberData, index) => {
      // console.log(index, kp.address, authenticationData);
      return {
        ...kp,
        key: index,
      } as any;
    });
  }, [subscriberListModel]);

  const columns: TableProps<SubscriberData>["columns"] = [
    {
      title: "Subscriber",
      dataIndex: "sub",
      key: "sub",
      render: (text) => {
        return <>{shorternAddress(text)}</>;
      },
    },

    {
      title: "Status",
      dataIndex: "st",
      key: "st",
      render: (_, record) => {
        return (
          <div className="flex gap-6">
            {Object.values(SubscriptionStatus)[record.st]}
          </div>
        );
      },
    },

    {
      title: "Created At",
      dataIndex: "CreatedAt",
      key: "createdAt",
      render: (text, record) => {
        return <>{moment(record.CreatedAt).fromNow()}</>;
      },
    },
  ];

  return (
    <motion.div
      className="inline-flex w-full flex-col gap-6 py-8"
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
        <HeroIcons.InformationCircleIcon className="w-[32px]" />
        <span className="text-xs text-gray-500 ml-10">
          TopicAgents act on behalf of Accounts on the mLayer network. This is
          important for security and flexibility. For example, a compromised
          agent can quickly be deauthorized to prevent further attack.{" "}
          <a href={INFO_LINKS.agentInfo}>Learn more...</a>
        </span>
      </div>
      <div className="flex gap-4 justify-end">
        {/* <Button
          onClick={() => {
            setShowModal((old) => !old);
          }}
          loading={loaders["authorizeAgent"]}
          className="self-end"
          ghost
          type="primary"
          shape="round"
        >
          <span>Authorize Agent</span>
        </Button> */}

        <Button
          onClick={() => {
            //
            // generateAgent?.();
            setShowModal((old) => !old);
          }}
          className=""
          ghost
          type="primary"
          shape="round"
        >
          {/* <HeroIcons.PlusCircleIcon className="h-[20px]" /> */}
          Add Agent
        </Button>
      </div>
      <Table dataSource={dataSource} columns={columns} />
      <AddAgentToTopic
        isModalOpen={showModal}
        onCancel={() => {
          setShowModal((old) => !old);
          // setUrlTopicId(undefined);
          setTimeout(() => {
            setToggleState1((old) => !old);
          }, 5000);
        }}
        topicId={topicId}
      />
    </motion.div>
  );
};