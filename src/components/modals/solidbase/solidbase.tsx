"use client";
import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
  Switch,
  Tooltip,
  Typography,
  notification,
  Image
} from "antd";
import * as HeroIcons from "@heroicons/react/24/solid";
import React, { useContext, useEffect, useMemo, useState } from "react";

import { motion } from "framer-motion";
import { useForm } from "antd/es/form/Form";
import {
  MIDDLEWARE_HTTP,
  MIDDLEWARE_HTTP_URLS,
  displayVariants,
  formLayout,
  shorternAddress,
} from "@/utils";
import { WalletContext } from "@/context";
import { TopicData } from "@/model/topic";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { Entities }  from "@mlayerprotocol/core";
import { IconMap } from "antd/es/result";

interface GoToSolidBaseProps {
  isModalOpen: boolean;
  onContinue: () => void;
  onCancel: () => void;
}

export const GoToSolidBase = (props: GoToSolidBaseProps) => {
  
  const { isModalOpen = false, onContinue, onCancel} = props;
  const [form] = useForm();



  return (
    <Modal
      className="rounded-lg"
      title={null}
      open={isModalOpen}
      // onOk={handleOk}
      onCancel={()=>onCancel()}
      
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
          transition={{ duration: 1, delay: 1 }}
        >
          <div>
            <Space direction="vertical"  className="w-full justify-center">
            <Space direction="horizontal" className="w-full justify-center">
                <Image preview={false} src="/logo.png"  className="!w-20" /> <HeroIcons.ArrowsRightLeftIcon className="w-5" /> <Image  className="!w-20" preview={false} src="/solidbase.png" />
            </Space>

              <div className="flex text-lg w-full justify-center text-center">MLayers uses SOLIDBASE service to track users social activity points</div>
            <div  className="flex w-full justify-center mt-10">
              <Button type="primary" shape="round" onClick={() => {
                onCancel()
                onContinue();
                }}>Connect to SolidBase</Button>
                </div>
            </Space>
            
          </div>
        </motion.div>
      </div>
      {/* </div> */}
    </Modal>
  );
};
