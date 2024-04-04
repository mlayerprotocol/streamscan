"use client";
import { displayVariants } from "@/utils";
import React from "react";
import { motion } from "framer-motion";
import { Tabs } from "antd";
import { MyTopics } from "./my";
import { SubscribedTopics } from "./subscribed";
import { AllTopics } from "./all";

const onChange = (key: string) => {
  console.log(key);
};
interface TopicsProps {
  onSuccess?: (values: any) => void;
  handleCreateAccount?: () => void;
}
export const Topics = (props: TopicsProps) => {
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
      <Tabs
        onChange={onChange}
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
