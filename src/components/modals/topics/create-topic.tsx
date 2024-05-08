"use client";
import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Typography,
  notification,
} from "antd";
import React, { useContext, useEffect, useMemo, useState } from "react";

import { motion } from "framer-motion";
import { useForm } from "antd/es/form/Form";
import {
  MIDDLEWARE_HTTP,
  MIDDLEWARE_HTTP_URLS,
  displayVariants,
  formLayout,
  shorternAddress,
} from "@/utils";
import { WalletContext } from "@/context";
import { TopicData } from "@/model/topic";

interface CreateTopicProps {
  isModalOpen?: boolean;
  topicData?: TopicData;
  onCancel?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
export const CreateTopic = (props: CreateTopicProps) => {
  const { combinedAgents, selectedAgent, createTopic, loaders, agents } =
    useContext(WalletContext);
  const { isModalOpen = false, onCancel, topicData } = props;
  const [form] = useForm();

  const selectedAgentObj = useMemo(() => {
    return combinedAgents.find((opt) => opt.address == selectedAgent);
  }, [combinedAgents, selectedAgent]);

  useEffect(() => {
    form.setFieldsValue({ address: selectedAgentObj?.address, ...topicData });
    console.log("APPPP", { ...topicData, address: selectedAgentObj?.address });
  }, [topicData, selectedAgentObj]);

  return (
    <Modal
      className="rounded-lg"
      title={null}
      open={isModalOpen}
      // onOk={handleOk}
      onCancel={(e) => {
        form.setFieldsValue({});
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
            initialValues={{ address: selectedAgentObj?.address, ...topicData }}
            onFinish={(data) => {
              if (!selectedAgentObj?.privateKey) {
                notification.error({
                  message: "Agent Private Key Not Accessable",
                });
                return;
              }

              const name: string = data["n"];
              const description: string = data["desc"];
              const ref: string = data["ref"];
              const isPublic: boolean = data["pub"] == true;
              createTopic?.(
                selectedAgentObj,
                name,
                description,
                ref,
                isPublic,
                {
                  id: topicData?.id,
                  isUpdate: topicData != undefined,
                  loaderKey: `createTopic-${topicData?.id}`,
                }
              );

              console.log({ data, selectedAgentObj, ref });
              form.setFieldsValue({});
              onCancel?.({} as any);
            }}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Typography.Title level={3}>Create A Topic</Typography.Title>
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
              label="Ref:"
              name="ref"
              rules={[{ required: true, message: "Please input a reference!" }]}
            >
              <Input placeholder="Enter Your Handle" />
            </Form.Item>

            <Form.Item
              label="Title:"
              name="n"
              rules={[{ required: true, message: "Please input your title!" }]}
            >
              <Input placeholder="Enter Your Title" />
            </Form.Item>

            <Form.Item
              label="Description:"
              name="desc"
              rules={[{ message: "Please input your description!" }]}
            >
              <Input placeholder="Enter Your Description" />
            </Form.Item>

            <Form.Item label="Public:" name="pub" valuePropName="checked">
              <Checkbox />
            </Form.Item>

            <Button
              loading={
                loaders["createTopic"] ||
                loaders[`createTopic-${topicData?.id}`]
              }
              type="primary"
              htmlType="submit"
              className="w-full mt-[28px] self-end"
              shape="round"
            >
              <span className="text-black">
                {topicData ? "Update" : "Create"}
              </span>
            </Button>
          </Form>
        </motion.div>
      </div>
      {/* </div> */}
    </Modal>
  );
};
