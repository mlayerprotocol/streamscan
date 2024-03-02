"use client";
import { Button, Form, Input } from "antd";
import React from "react";
import { motion } from "framer-motion";

import { useLoginMutation } from "@/redux/apis";
import { useForm } from "antd/es/form/Form";

import {
  displayErrorMessage,
  displayVariants,
  setSessionStorage,
} from "@/utils";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/app";
import { updataAuthData } from "@/redux/slices";

interface LoginAuthProps {
  onSuccess?: (values: any) => void;
  handleCreateAccount?: () => void;
}
export const LoginAuth = (props: LoginAuthProps) => {
  const router = useRouter();
  const { onSuccess, handleCreateAccount } = props;
  const [form] = useForm();
  const dispatch = useAppDispatch();

  const [login, loginProps] = useLoginMutation();
  return (
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
          login(data)
            .unwrap()
            .then((payload) => {
              setSessionStorage(payload?.data?.token!);
              dispatch(updataAuthData({ ...payload }));
              onSuccess?.(payload);
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
          loading={loginProps.isLoading}
        >
          <span className="text-black">Log In</span>
        </Button>
        <span className=" mt-3 text-gray-500 text-center">
          Don’t have an account?{" "}
          <span
            className="text-white font-bold mt-3 cursor-pointer"
            onClick={handleCreateAccount}
          >
            Create Account
          </span>
        </span>
      </Form>
    </motion.div>
  );
};
