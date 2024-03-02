"use client";
import { Button, Form, Input, InputNumber, Modal, Select } from "antd";
import React, { useState } from "react";

import { motion } from "framer-motion";
import { useForm } from "antd/es/form/Form";
import { displayVariants } from "@/utils";

interface AuthorizeAgentProps {
  isModalOpen?: boolean;
  onCancel?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
export const AuthorizeAgent = (props: AuthorizeAgentProps) => {
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
              label="Duration:"
              name="duration"
              rules={[{ required: true, message: "Please input a duration!" }]}
            >
              <InputNumber
                placeholder="Enter a duration"
                suffix={<span>Days</span>}
              />
            </Form.Item>

            <Form.Item
              label="Role:"
              name="role"
              rules={[{ required: true, message: "Please select a role!" }]}
            >
              <Select>
                <Select.Option value="read">Read</Select.Option>
                <Select.Option value="write">Write</Select.Option>
                <Select.Option value="admin">Admin</Select.Option>
              </Select>
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              className="w-full mt-[28px] self-end"
              shape="round"
            >
              <span className="text-black">Authorized</span>
            </Button>
          </Form>
        </motion.div>
      </div>
      {/* </div> */}
    </Modal>
  );
};
