"use client";
import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  notification,
} from "antd";
import React, { useContext, useEffect, useMemo, useState } from "react";

import { motion } from "framer-motion";
import { useForm } from "antd/es/form/Form";
import { displayVariants, formLayout, shorternAddress } from "@/utils";
import { WalletContext } from "@/context";

interface JoinTopicProps {
  topicId?: string;
  isModalOpen?: boolean;
  onCancel?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
export const JoinTopic = (props: JoinTopicProps) => {
  const { subcribeToTopic, loaders, agents, combinedAgents, selectedAgent } =
    useContext(WalletContext);
  const { isModalOpen = false, onCancel, topicId } = props;
  const [form] = useForm();
  const selectedAgentObj = useMemo(() => {
    return combinedAgents.find((opt) => opt.address == selectedAgent);
  }, [combinedAgents, selectedAgent]);

  useEffect(() => {
    form.setFieldsValue({ address: selectedAgentObj?.address, topicId });
  }, [topicId, selectedAgentObj]);

  return (
    <Modal
      className="rounded-lg"
      title={"Join Topic"}
      open={isModalOpen}
      // onOk={handleOk}
      onCancel={(e) => {
        onCancel?.(e);
      }}
      footer={null}
    >
      <div className="flex flex-col">
        <motion.div
          className="inline-block w-full"
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
            form={form}
            initialValues={{ address: selectedAgentObj?.address }}
            onFinish={(data) => {
              const agent: AddressData | undefined = agents.find(
                (el) => el.address == data["address"]
              );
              if (!agent) {
                notification.error({
                  message: "Agent Private Key Not Accessable",
                });
                return;
              }
              const topicId: string = data["topicId"];
              subcribeToTopic?.(agent, topicId);
              form.setFieldsValue({});
              onCancel?.({} as any);
            }}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label={`Active Agent: `}
              name="address"
              rules={[
                { required: true, message: "Please input select an address!" },
              ]}
            >
              <Input className="!border-[0px]" placeholder="No active agent selected" disabled />
            </Form.Item>

            <Form.Item
              label="Topic Id:"
              name="topicId"
              rules={[{ required: true, message: "Please input a topic id!" }]}
            >
              <Input placeholder="Enter Your Topic Id" />
            </Form.Item>

            <Button
              loading={loaders["subcribeToTopic"]}
              type="primary"
              htmlType="submit"
              className="w-full mt-[28px] self-end"
              shape="round"
            >
              <span className="text-black">Join</span>
            </Button>
          </Form>
        </motion.div>
      </div>
      {/* </div> */}
    </Modal>
  );
};
