"use client";
import { PREVILEDGES, displayVariants } from "@/utils";
import * as HeroIcons from "@heroicons/react/24/solid";
import React, { useContext, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button, Table, TableProps } from "antd";
import { AuthorizeAgent } from "@/components";
import { WalletContext } from "@/context";
import moment from "moment";

const columns: TableProps<any>["columns"] = [
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Expires",
    dataIndex: "expires",
    key: "expires",
  },
  {
    title: "",
    dataIndex: "address",
    key: "action",
    render: (text) => {
      return (
        <div className="flex gap-6">
          <HeroIcons.PencilIcon className="h-[20px]" />
          <HeroIcons.XMarkIcon className="h-[20px]" />
        </div>
      );
    },
  },
];

interface AgentsProps {
  onSuccess?: (values: any) => void;
  handleCreateAccount?: () => void;
}
export const Agents = (props: AgentsProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { initialLoading, agents, authenticationList, generateAgent, loaders } =
    useContext(WalletContext);

  const dataSource = useMemo(() => {
    return agents.map((kp, index) => {
      const authenticationData = authenticationList?.data.find(
        (item) => item.agt == kp.address
      );
      // console.log(index, kp.address, authenticationData);
      return {
        key: index,
        address: kp.address,
        // role: "--",
        role: authenticationData ? (
          PREVILEDGES[authenticationData?.privi ?? 0]
        ) : (
          <i>Not Authorized</i>
        ),

        expires: authenticationData ? (
          moment(
            new Date(
              (authenticationData?.ts ?? 0) + (authenticationData?.du ?? 0)
            )
          ).fromNow()
        ) : (
          <i>Not Authorized</i>
        ),
      };
    });
  }, [agents, authenticationList]);
  console.log({agents});
  return (
    <motion.div
      className="inline-flex w-full flex-col gap-6"
      variants={displayVariants}
      initial={"hidden"}
      animate={"show"}
      exit={{
        opacity: 0,
        scale: 0,
      }}
      // transition={{ duration: 1, delay: 1 }}
    >
      <span>
        For security and flexibility, Agents act on behalf of Accounts in the
        mLayer network, for example, a compromised rolent can quickly be
        deauthorized to prevent further attack. Learn more...
      </span>
      <div className="flex gap-4 justify-end">
        <Button
          onClick={() => {
            setShowModal((old) => !old);
          }}
          loading={loaders["authorizeAgent"]}
          className="self-end"
          ghost
          type="primary"
          shape="round"
        >
          <span>Authorize Agent/Device</span>
        </Button>

        <Button
          onClick={() => {
            //
            generateAgent?.();
          }}
          className=""
          ghost
          type="primary"
          shape="round"
        >
          <HeroIcons.PlusCircleIcon className="h-[20px]" />
        </Button>
      </div>
      <Table dataSource={dataSource} columns={columns} />
      <AuthorizeAgent
        isModalOpen={showModal}
        onCancel={() => {
          setShowModal((old) => !old);
        }}
      />
    </motion.div>
  );
};
