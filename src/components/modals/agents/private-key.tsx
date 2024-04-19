"use client";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  notification,
} from "antd";
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
import { Utils } from "@mlayerprotocol/core";

interface PrivateKeyProps {
  addressData: AddressData;
  isModalOpen?: boolean;
  onCancel?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
export const PrivateKey = (props: PrivateKeyProps) => {
  const {
    authenticationList,
    setCombinedAgents,
    generateLocalPrivKeys,
    loaders,
  } = useContext(WalletContext);
  const { isModalOpen = false, onCancel, addressData } = props;
  const [form] = useForm();
  // console.log({ agents });

  useEffect(() => {
    form.setFieldsValue(addressData);
  }, [addressData]);
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
            initialValues={{ ...addressData }}
            onFinish={(data) => {
              const privateKey: string = data["privateKey"];
              try {
                const kp: AddressData = Utils.getKeysEcc(privateKey);
                console.log({ privateKey, kp });
                if (kp.address != addressData.address) {
                  notification.error({ message: `Private Key does not match` });
                  return;
                }
                addressData.privateKey = privateKey;

                setCombinedAgents?.((old) => {
                  return old.map((agt) => {
                    if (agt.address == addressData.address) {
                      generateLocalPrivKeys?.(
                        false,
                        addressData.address,
                        privateKey
                      );
                      return { ...agt, privateKey: privateKey };
                    }
                    return agt;
                  });
                });
                onCancel?.({} as any);
              } catch (error: any) {
                notification.error({ message: `Invalid Private Key` });
              }
              // onCancel?.({} as any);
            }}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Agent Address:"
              name="address"
              rules={[{ required: true, message: "Please input an address!" }]}
            >
              <Input placeholder="Enter An Address" disabled />
            </Form.Item>

            <Form.Item
              label="Private Key:"
              name="privateKey"
              rules={[{ required: true, message: "Please input a key!" }]}
            >
              <Input placeholder="Enter A Private Key" />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              className="w-full mt-[28px] self-end"
              shape="round"
            >
              <span className="text-black">Import Key</span>
            </Button>
          </Form>
        </motion.div>
      </div>
      {/* </div> */}
    </Modal>
  );
};
