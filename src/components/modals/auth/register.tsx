"use client";
import { Button, Form, Input } from "antd";
import React from "react";
import { motion } from "framer-motion";

import Image from "next/image";
import {
  displayErrorMessage,
  displayVariants,
  setSessionStorage,
} from "@/utils";
import { useForm } from "antd/es/form/Form";
import { useAppDispatch } from "@/redux/app";
import { useRegisterMutation } from "@/redux/apis";

interface RegisterAuthProps {
  onSuccess?: (values: any) => void;
  handleLoginAccount?: () => void;
}
export const RegisterAuth = (props: RegisterAuthProps) => {
  const { onSuccess, handleLoginAccount } = props;
  const [form] = useForm();
  const dispatch = useAppDispatch();

  const [register, registerProps] = useRegisterMutation();
  return (
    <motion.div
      className="inline-block w-full"
      variants={displayVariants}
      initial={"hidden"}
      animate={"show"}
      exit={{
        opacity: 0,
        x: 0,
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
          register(data)
            .unwrap()
            .then((payload) => {
              //
              onSuccess?.(payload);
              // handleLoginAccount?.();
            })
            .catch((error) => displayErrorMessage(error));
        }}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input placeholder="Enter Your Email" />
        </Form.Item>

        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="What’s your name?" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Enter Your Password" />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          className="w-full mt-[28px]"
          shape="round"
          loading={registerProps.isLoading}
        >
          <span className="text-black">Register</span>
        </Button>
        <span className=" mt-3 text-gray-500 text-center">
          Already have an account?{" "}
          <span
            className="text-white font-bold mt-3"
            onClick={handleLoginAccount}
          >
            Log in
          </span>
        </span>
      </Form>
    </motion.div>
  );
};
