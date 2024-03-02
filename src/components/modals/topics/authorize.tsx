"use client";
import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
} from "antd";
import React, { useState } from "react";

import { motion } from "framer-motion";
import { useForm } from "antd/es/form/Form";
import { displayVariants } from "@/utils";

interface CreateTopicProps {
  isModalOpen?: boolean;
  onCancel?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
export const CreateTopic = (props: CreateTopicProps) => {
  const { isModalOpen = false, onCancel } = props;
  const [form] = useForm();

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
            form={form}
            initialValues={{ remember: true }}
            onFinish={(data) => {
              console.log({ data });
              onCancel?.({} as any);
            }}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Agent Address:"
              name="address"
              rules={[
                { required: true, message: "Please input select an address!" },
              ]}
            >
              <Select>
                <Select.Option value="0x029309092309">
                  0x029309092309
                </Select.Option>
                <Select.Option value="0x019309092309">
                  0x019309092309
                </Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Title:"
              name="title"
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
