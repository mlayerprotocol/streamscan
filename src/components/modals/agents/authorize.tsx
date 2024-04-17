"use client";
import { Button, Form, Input, InputNumber, Modal, Select } from "antd";
import React, { useContext, useEffect, useState } from "react";

import { motion } from "framer-motion";
import { useForm } from "antd/es/form/Form";
import {
  PREVILEDGES,
  displayVariants,
  formLayout,
  shorternAddress,
} from "@/utils";
import { WalletContext } from "@/context";
import moment from "moment";

interface AuthorizeAgentProps {
  updateAddressData?: AddressData;
  addressData?: AddressData;
  isModalOpen?: boolean;
  onCancel?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
export const AuthorizeAgent = (props: AuthorizeAgentProps) => {
  const {
    authenticationList,
    agents,
    combinedAgents,
    authorizeAgent,
    loaders,
  } = useContext(WalletContext);
  const {
    isModalOpen = false,
    onCancel,
    addressData,
    updateAddressData,
  } = props;
  const [form] = useForm();
  // console.log({ agents });

  useEffect(() => {
    if (!addressData) return;
    const selectIndex: number = agents.findIndex(
      (agt) => agt.address == addressData?.address
    );
    form.setFieldsValue({
      address: selectIndex == -1 ? undefined : selectIndex,
    });
  }, [addressData]);

  useEffect(() => {
    //
    if (!updateAddressData) return;
    console.log(updateAddressData);
    form.setFieldsValue({
      address: updateAddressData?.address,
      role: updateAddressData?.authData?.privi,
      duration:
        moment(
          new Date(
            (updateAddressData?.authData?.ts ?? 0) +
              (updateAddressData?.authData?.du ?? 0)
          )
        ).diff(moment.now(), "days") + 1,
    });
  }, [updateAddressData]);
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
            {...formLayout}
            form={form}
            onFinish={(data) => {
              const keyPair: AddressData =
                agents[data["address"] ?? 0] ?? updateAddressData;
              const days: number = data["duration"];
              const previledge: 0 | 1 | 2 | 3 = data["role"];
              authorizeAgent?.(keyPair, days, previledge);
              // console.log({ keyPair, days, previledge, data });
              onCancel?.({} as any);
              form.setFieldsValue({});
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
              {updateAddressData && <Input />}
              {!updateAddressData && (
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
              )}
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
              <span className="text-black">{updateAddressData?'Update':'Authorize'}</span>
            </Button>
          </Form>
        </motion.div>
      </div>
      {/* </div> */}
    </Modal>
  );
};
