import { Button } from "antd";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface SocialAuthProps {
  onSelect?: (type: string, data?: any) => void;
}
export const SocialAuth = (props: SocialAuthProps) => {
  const { onSelect } = props;
  return (
    <motion.div
      className="inline-flex w-full flex-col gap-4"
      initial={{ opacity: 0, x: 1 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -1 }}
      transition={{ duration: 1 }}
    >
      <Button
        shape="round"
        type="link"
        className="!flex justify-start items-center !bg-white active:!bg-gray-500"
        icon={
          <Image
            src="/icons/google.svg"
            alt="Vercel Logo"
            width={20}
            height={20}
            priority
          />
        }
      >
        <span className="text-black">Continue with Google</span>
      </Button>
      <Button
        shape="round"
        type="link"
        className="!flex justify-start items-center !bg-white active:!bg-gray-500"
        icon={
          <Image
            src="/icons/facebook.svg"
            alt="Vercel Logo"
            width={20}
            height={20}
            priority
          />
        }
      >
        <span className="text-black">Continue with Facebook</span>
      </Button>
      <Button
        shape="round"
        type="link"
        className="!flex justify-start items-center !bg-white active:!bg-gray-500"
        icon={
          <Image
            src="/icons/apple.svg"
            alt="Vercel Logo"
            width={20}
            height={20}
            priority
          />
        }
      >
        <span className="text-black">Continue with Apple</span>
      </Button>

      <Button
        shape="round"
        type="link"
        className="!flex justify-start items-center !bg-white active:!bg-gray-500"
        icon={
          <Image
            src="/icons/x.svg"
            alt="Vercel Logo"
            width={20}
            height={20}
            priority
          />
        }
      >
        <span className="text-black">Continue with X</span>
      </Button>
      <Button
        onClick={() => {
          onSelect?.("back");
        }}
        shape="round"
        type="link"
        className="!flex justify-start items-center !bg-white active:!bg-gray-500"
        icon={
          <Image
            src="/icons/email.svg"
            alt="Vercel Logo"
            width={20}
            height={20}
            priority
          />
        }
      >
        <span className="text-black">Continue with Email</span>
      </Button>

      <Button
        shape="round"
        type="primary"
        className="!flex justify-start items-center"
        icon={
          <Image
            src="/icons/back.svg"
            alt="Vercel Logo"
            width={20}
            height={20}
            priority
          />
        }
      >
        <span className="text-black">Back to Reading</span>
      </Button>
    </motion.div>
  );
};
