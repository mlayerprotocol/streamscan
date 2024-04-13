"use client";
import { displayVariants } from "@/utils";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Tabs } from "antd";
import { MyTopics } from "./my";
import { SubscribedTopics } from "./subscribed";
import { AllTopics } from "./all";
import { useSearchParams } from "next/navigation";

interface TopicsProps {
  onSuccess?: (values: any) => void;
  handleCreateAccount?: () => void;
}
export const Topics = (props: TopicsProps) => {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<string>('my');

  useEffect(() => {
    console.log({ searchParams: searchParams.get("topicTab") });
    setActiveTab(searchParams.get("topicTab") ?? activeTab);
  }, [searchParams]);

  const onChange = (key: string) => {
    console.log({activeTab, key})
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
            children: <SubscribedTopics />,
          },
          //   {
          //     label: `All Topics`,
          //     key: "all",
          //     children: <AllTopics />,
          //   },
        ]}
      />
    </motion.div>
  );
};
