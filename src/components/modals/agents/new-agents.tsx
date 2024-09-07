"use client";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  RadioChangeEvent,
  Select,
  Typography,
  notification,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import * as HeroIcons from "@heroicons/react/24/solid";

import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "antd/es/form/Form";
import { displayVariants, formLayout, shorternAddress } from "@/utils";
import { WalletContext } from "@/context";
import { Utils } from "@mlayerprotocol/core";

interface NewAgentProps {
  isModalOpen?: boolean;
  onCancel?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onAuth?: (addressData?: AddressData) => void;
}
enum KeyOptionTypes {
  Upload,
  GenerateNew,
}
export const NewAgent = (props: NewAgentProps) => {
  const { generateAgent, agents, updateAgents } = useContext(WalletContext);
  const [selectedOption, setSelectedOption] = useState<KeyOptionTypes>(
    KeyOptionTypes.GenerateNew
  );
  const [createdAddress, setCreatedAddress] = useState<AddressData>();
  const [showAuthSection, setShowAuthSection] = useState(false);
  const { isModalOpen = false, onCancel, onAuth } = props;
  const [form] = useForm();
  // console.log({ agents });

  const onChange = (e: RadioChangeEvent) => {
    setSelectedOption(e.target.value);
  };
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
        <div className="mb-8">
          {!showAuthSection && (
            <Radio.Group onChange={onChange} value={selectedOption}>
               <Radio value={KeyOptionTypes.GenerateNew}>
                Generate New Agent Keys
              </Radio>
              <Radio value={KeyOptionTypes.Upload}>Import Private Key</Radio>
             
            </Radio.Group>
          )}
          {showAuthSection && (
            <div className="flex gap-2">
              <HeroIcons.ArrowLeftIcon
                onClick={() => {
                  setShowAuthSection(false);
                }}
                className="h-[20px]"
              />{" "}
              <Typography.Title level={5}> New Agent Key Pair</Typography.Title>
            </div>
          )}
        </div>
        <AnimatePresence>
          {!showAuthSection && (
            <>
              {selectedOption == KeyOptionTypes.Upload && (
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
                    layout="vertical"
                    form={form}
                    onFinish={(data) => {
                      const privateKey: string = data["privateKey"];
                      try {
                        const kp: AddressData = Utils.getKeysEcc(privateKey);
                        console.log({ privateKey, kp });
                        const newKps: AddressData[] = [...agents, kp];

                        updateAgents?.(newKps);

                        setCreatedAddress(kp);
                        setShowAuthSection(true);
                      } catch (error: any) {
                        notification.error({ message: `Invalid Private Key` });
                      }
                      // onCancel?.({} as any);
                    }}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                  >
                    <Form.Item
                      label="Private Key:"
                      name="privateKey"
                      rules={[
                        { required: true, message: "Please input a key!" },
                      ]}
                    >
                      <Input placeholder="Enter A Private Key" />
                    </Form.Item>

                    <Button
                      type="primary"
                      htmlType="submit"
                      className="w-full mt-[28px] self-end"
                      shape="round"
                    >
                      <span className="">Import Key</span>
                    </Button>
                  </Form>
                </motion.div>
              )}
              {selectedOption == KeyOptionTypes.GenerateNew && (
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
                  <Button
                    type="primary"
                    onClick={() => {
                      //
                      generateAgent?.().then((v) => {
                        setCreatedAddress(v);
                        setShowAuthSection(true);
                      });
                    }}
                    className="w-full mt-[28px] self-end"
                    shape="round"
                  >
                    <span className="">Generate New Key</span>
                  </Button>
                </motion.div>
              )}
            </>
          )}
          {showAuthSection && (
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
              <span className="font-bold dark:text-white">Agent Address: </span>
              <br />
              <span> {createdAddress?.address}</span>
              <br />
              <br />
              <span className="font-bold dark:text-white">Private Key: </span>
              <br />
              <span
                onClick={() => {
                  navigator.clipboard.writeText(
                    String(createdAddress?.privateKey)
                  );
                  notification.open({ message: "Copied to clipboard" });
                }}
              >
                <div className="flex gap-2">
                  <span>
                    {shorternAddress(String(createdAddress?.privateKey))}{" "}
                  </span>{" "}
                  <HeroIcons.DocumentDuplicateIcon className="h-[20px] !text-[#2F5ED2]" />
                </div>
              </span>
              <Button
                type="primary"
                onClick={() => {
                  //
                  onAuth?.(createdAddress);
                  onCancel?.({} as any);
                  form.setFieldsValue({});
                  setShowAuthSection(false);
                }}
                className="w-full mt-[28px] self-end"
                shape="round"
              >
                <span className="">Authorize this Agent Keys</span>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* </div> */}
    </Modal>
  );
};
