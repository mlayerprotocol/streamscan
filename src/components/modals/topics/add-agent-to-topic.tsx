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
import { SubscriptionStatus } from "@mlayerprotocol/core/src/entities";

interface AddAgentToTopicProps {
  topicId?: string;
  isModalOpen?: boolean;
  onCancel?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
export const AddAgentToTopic = (props: AddAgentToTopicProps) => {
  const {
    subcribeToTopic,
    loaders,
    agents,
    combinedAgents,
    selectedAgent,
    selectedSubnet,
  } = useContext(WalletContext);
  const { isModalOpen = false, onCancel, topicId } = props;
  const [form] = useForm();
  const selectedAgentObj = useMemo(() => {
    return combinedAgents.find((opt) => opt.address == selectedAgent);
  }, [combinedAgents, selectedAgent]);

  useEffect(() => {
    form.setFieldsValue({
      address: selectedAgentObj?.address,
      topicId,
      subnetId: selectedSubnet?.id,
    });
  }, [topicId, selectedAgentObj, selectedSubnet]);

  return (
    <Modal
      className="rounded-lg"
      title={"Subscribe To Topic"}
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
              const subnetId: string = data["subnetId"];
              const sub: string = data["sub"];
              const status: SubscriptionStatus = data["status"];
              subcribeToTopic?.(agent, { subnetId, topicId, sub, status });
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
              <Input
                className="!border-[0px]"
                placeholder="No active agent selected"
                disabled
              />
            </Form.Item>

            <Form.Item
              label="Subscriber Address:"
              name="sub"
              rules={[{ required: true, message: "Please input an address!" }]}
            >
              <Input placeholder="Enter A Subscriber Address" />
            </Form.Item>

            <Form.Item
              label="Topic Id:"
              name="topicId"
              rules={[{ required: true, message: "Please input a topic id!" }]}
            >
              <Input placeholder="Enter Your Topic Id" />
            </Form.Item>
            <Form.Item
              label="Subnet Id:"
              name="subnetId"
              rules={[{ required: true, message: "Please input a subnet id!" }]}
            >
              <Input placeholder="Enter Your Subnet Id" />
            </Form.Item>

            <Form.Item
              label={"Status"}
              name="status"
              rules={[{ required: true, message: "Please select a status!" }]}
            >
              <Select>
                {Object.values(SubscriptionStatus)
                  .filter((e) => typeof e == "string")
                  .map((val, index) => {
                    return (
                      <Select.Option key={index} value={index}>
                        {val}
                      </Select.Option>
                    );
                  })}
              </Select>
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
