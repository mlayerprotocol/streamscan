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
import React, { useContext, useState } from "react";

import { motion } from "framer-motion";
import { useForm } from "antd/es/form/Form";
import { displayVariants, shorternAddress } from "@/utils";
import { WalletContext } from "@/context";

interface CreateTopicProps {
  isModalOpen?: boolean;
  onCancel?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
export const CreateTopic = (props: CreateTopicProps) => {
  const { authenticationList, selectedAgent, createTopic, loaders, agents } =
    useContext(WalletContext);
  const { isModalOpen = false, onCancel } = props;
  const [form] = useForm();

  const _selectedAgent = authenticationList?.data.find(
    (opt) => opt.agt == selectedAgent
  )?.agt;

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
            initialValues={{ address: _selectedAgent }}
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
              const handle: string = data["handle"];
              const name: string = data["name"];
              const description: string = data["description"];
              const ref: string = data["ref"];
              const isPublic: boolean = data["public"] == true;

              createTopic?.(agent, handle, name, description, ref, isPublic);
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
              label="Handle:"
              name="handle"
              rules={[{ required: true, message: "Please input your handle!" }]}
            >
              <Input placeholder="Enter Your Handle" />
            </Form.Item>

            <Form.Item
              label="Title:"
              name="name"
              rules={[{ required: true, message: "Please input your title!" }]}
            >
              <Input placeholder="Enter Your Title" />
            </Form.Item>

            <Form.Item
              label="Description:"
              name="description"
              rules={[{ message: "Please input your description!" }]}
            >
              <Input placeholder="Enter Your Description" />
            </Form.Item>

            <Form.Item
              label="Ref:"
              name="ref"
              rules={[{ message: "Please input your description!" }]}
            >
              <Input placeholder="Enter Your Ref" />
            </Form.Item>

            <Form.Item label="Public:" name="public" valuePropName="checked">
              <Checkbox />
            </Form.Item>

            <Button
              loading={loaders["createTopic"]}
              type="primary"
              htmlType="submit"
              className="w-full mt-[28px] self-end"
              shape="round"
            >
              <span className="text-black">Create</span>
            </Button>
          </Form>
        </motion.div>
      </div>
      {/* </div> */}
    </Modal>
  );
};
