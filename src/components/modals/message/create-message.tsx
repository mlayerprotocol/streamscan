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
import { displayVariants, shorternAddress } from "@/utils";
import { WalletContext } from "@/context";

interface CreateMessageProps {
  topicId?: string;
  isModalOpen?: boolean;
  onCancel?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
export const CreateMessage = (props: CreateMessageProps) => {
  const {
    authenticationList,
    selectedAgent,
    sendMessage,
    loaders,
    agents,
    topicList,
  } = useContext(WalletContext);
  const { isModalOpen = false, onCancel, topicId } = props;
  const [form] = useForm();

  const _selectedAgent = useMemo(() => {
    return authenticationList?.data.find((opt) => opt.agt == selectedAgent)
      ?.agt;
  }, [authenticationList, selectedAgent]);

  useEffect(() => {
    form.setFieldsValue({ address: _selectedAgent, topicId });
  }, [topicId, _selectedAgent]);

  return (
    <Modal
      className="rounded-lg"
      title={null}
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
            className="flex flex-col"
            name="basic"
            layout="vertical"
            form={form}
            initialValues={{ address: _selectedAgent, topicId }}
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
              const message: string = data["message"];
              const topicId: string = data["topicId"];

              sendMessage?.(message, agent, topicId);
              console.log({ data, agent });
              onCancel?.({} as any);
            }}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label={`Agent Address: `}
              name="address"
              rules={[
                { required: true, message: "Please input select an address!" },
              ]}
            >
              <Input placeholder="Enter An Address" disabled />
            </Form.Item>

            <Form.Item
              label="Topic Id:"
              name="topicId"
              rules={[
                { required: true, message: "Please input select a topic!" },
              ]}
            >
              <Select>
                {topicList?.data.map((kp, index) => {
                  return (
                    <Select.Option key={index} value={kp.id}>
                      {kp.n}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>

            <Form.Item
              label="Message:"
              name="message"
              rules={[
                { required: true, message: "Please input your message!" },
              ]}
            >
              <Input.TextArea
                placeholder="Enter Your Message"
                className="!h-40"
              />
            </Form.Item>

            <Button
              loading={loaders["sendMessage"]}
              type="primary"
              htmlType="submit"
              className="w-full mt-[28px] self-end"
              shape="round"
            >
              <span className="text-black">Send Message</span>
            </Button>
          </Form>
        </motion.div>
      </div>
      {/* </div> */}
    </Modal>
  );
};
