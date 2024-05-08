"use client";
import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  MenuProps,
  Modal,
  Select,
  notification,
} from "antd";
import React, { useContext, useEffect, useMemo, useState } from "react";

import { motion } from "framer-motion";
import { useForm } from "antd/es/form/Form";
import { displayVariants, formLayout, shorternAddress } from "@/utils";
import { WalletContext } from "@/context";

interface CreateSubnetProps {
  isModalOpen?: boolean;
  onCancel?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
export const CreateSubnet = (props: CreateSubnetProps) => {
  const {
    combinedAgents,
    selectedAgent,
    createSubnet,
    loaders,
    agents,
    topicList,
  } = useContext(WalletContext);
  const { isModalOpen = false, onCancel } = props;
  const [form] = useForm();

  const _selectedAgent = useMemo(() => {
    return combinedAgents.find((opt) => opt.address == selectedAgent)?.address;
  }, [combinedAgents, selectedAgent]);

  const items = combinedAgents.filter(
    (cAgt) => cAgt.privateKey && cAgt.authData
  );

  useEffect(() => {
    form.setFieldsValue({ address: _selectedAgent });
  }, [_selectedAgent]);

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
            {...formLayout}
            className="flex flex-col"
            name="basic"
            form={form}
            initialValues={{}}
            onFinish={(data) => {
              // const agent: AddressData | undefined = agents.find(
              //   (el) => el.address == data["address"]
              // );
              // if (!agent) {
              //   notification.error({
              //     message: "Agent Private Key Not Accessable",
              //   });
              //   return;
              // }
              const name: string = data["n"];
              const ref: string = data["ref"];
              const status: number = data["status"];

              createSubnet?.(name, ref, status);
              // console.log({ data, agent });
              form.setFieldsValue({});
              onCancel?.({} as any);
            }}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            {/* <Form.Item
              label={`Agent Address: `}
              name="address"
              rules={[
                { required: true, message: "Please input select an address!" },
              ]}
            >
              <Select>
                {items.map((val, index) => {
                  return (
                    <Select.Option key={index} value={val.address}>
                      {shorternAddress(val.address)}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item> */}
            <Form.Item
              label={`Name: `}
              name="n"
              rules={[{ required: true, message: "Please input a name!" }]}
            >
              <Input placeholder="Enter A Name" />
            </Form.Item>

            <Form.Item
              label={`Reference: `}
              name="ref"
              rules={[
                { required: true, message: "Please input select a reference!" },
              ]}
            >
              <Input placeholder="Enter A Reference" />
            </Form.Item>

            <Form.Item
              label="Status:"
              name="status"
              rules={[
                { required: true, message: "Please input select a status!" },
              ]}
            >
              <Select>
                {["Disabled", "Running"].map((val, index) => {
                  return (
                    <Select.Option key={index} value={index}>
                      {val}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>

            <Button
              loading={loaders["createSubnet"]}
              type="primary"
              htmlType="submit"
              className="w-full mt-[28px] self-end"
              shape="round"
            >
              <span className="text-black">Create Subnet</span>
            </Button>
          </Form>
        </motion.div>
      </div>
      {/* </div> */}
    </Modal>
  );
};