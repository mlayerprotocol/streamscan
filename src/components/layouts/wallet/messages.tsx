"use client";
import { displayVariants } from "@/utils";
import React from "react";
import { motion } from "framer-motion";
interface MessagesProps {
  onSuccess?: (values: any) => void;
  handleCreateAccount?: () => void;
}
export const Messages = (props: MessagesProps) => {
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
      Messages
    </motion.div>
  );
};
