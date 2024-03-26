"use client";
import { Button, Form, Input, InputNumber, Modal, Select } from "antd";
import React, { useContext, useState } from "react";

import { motion } from "framer-motion";
import { useForm } from "antd/es/form/Form";
import { PREVILEDGES, displayVariants, shorternAddress } from "@/utils";
import { WalletContext } from "@/context";

interface AuthorizeAgentProps {
  isModalOpen?: boolean;
  onCancel?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
export const AuthorizeAgent = (props: AuthorizeAgentProps) => {
  const { authenticationList, agents, authorizeAgent, loaders } =
    useContext(WalletContext);
  const { isModalOpen = false, onCancel } = props;
  const [form] = useForm();
  // console.log({ agents });
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
            initialValues={{ remember: true }}
            onFinish={(data) => {
              const keyPair: AddressData = agents[data["address"] ?? 0];
              const days: number = data["duration"];
              const previledge: 0 | 1 | 2 | 3 = data["role"];
              authorizeAgent?.(keyPair, days, previledge);
              console.log({ data, keyPair });
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
                {agents?.map((kp, index) => {
                  const authenticationData = authenticationList?.data.find(
                    (item) => item.agt == kp.address
                  );
                  if (authenticationData) return null;
                  return (
                    <Select.Option key={index} value={index}>
                      {shorternAddress(kp.address)}
                    </Select.Option>
                  );
                })}
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
                {PREVILEDGES.map((e, index) => (
                  <Select.Option key={index} value={index}>
                    {e}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Button
              loading={loaders["authorizeAgent"]}
              type="primary"
              htmlType="submit"
              className="w-full mt-[28px] self-end"
              shape="round"
            >
              <span className="text-black">Authorize</span>
            </Button>
          </Form>
        </motion.div>
      </div>
      {/* </div> */}
    </Modal>
  );
};
