"use client";
import { INFO_LINKS, displayVariants } from "@/utils";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Space, Tabs } from "antd";
import { MyTopics } from "./my";
import { SubscribedTopics } from "./subscribed";
import { AllTopics } from "./all";
import { useSearchParams } from "next/navigation";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { PreviewTopic } from "./preview";
import { PendingTopics } from "./pending";
import { SubscribedV2Topics } from "./subscibed-v2";
interface TopicsProps {
  onSuccess?: (values: any) => void;
  handleCreateAccount?: () => void;
}
export const Topics = (props: TopicsProps) => {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<string>("my");

  const [selectedTopic, setSelectedTopic] = useState<string>();

  useEffect(() => {
    console.log({ searchParams: searchParams.get("topicTab") });
    setActiveTab(searchParams.get("topicTab") ?? activeTab);
    setSelectedTopic(searchParams.get("id") ?? undefined);
  }, [searchParams]);

  const onChange = (key: string) => {
    console.log({ activeTab, key });
    setActiveTab(key);
  };
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
      <div>
        <Space className="mb-10">
          <InformationCircleIcon className="w-[32px]" />
          <span className="text-xs text-gray-500 ml-5">
            Topics are communication channels. Every subscriber to a topic
            receives the data/messages sent to that topic.{" "}
            <a href={INFO_LINKS.topicInfo} target="_blank">
              Learn more...
            </a>
          </span>
        </Space>
        {!!selectedTopic && <PreviewTopic topicId={selectedTopic} />}

        {!selectedTopic && (
          <Tabs
            onChange={onChange}
            activeKey={activeTab}
            type="card"
            items={[
              {
                label: `My Topics`,
                key: "my",
                children: <MyTopics />,
              },
              {
                label: `Subscribed Topics`,
                key: "sub",
                children: <SubscribedV2Topics />,
              },
              //   {
              //     label: `All Topics`,
              //     key: "all",
              //     children: <AllTopics />,
              //   },
              {
                label: `Pending Topics`,
                key: "pending",
                children: <PendingTopics useSubnet />,
              },
            ]}
          />
        )}
      </div>
    </motion.div>
  );
};
