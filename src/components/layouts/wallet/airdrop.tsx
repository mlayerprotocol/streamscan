"use client";
import { displayVariants } from "@/utils";
import React, { Fragment, useContext, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CreateMessage, CreateTopic } from "@/components";
import { WalletContext } from "@/context";
import { Button, Divider, Table } from "antd";
interface AirDropProps {
  onSuccess?: (values: any) => void;
  handleCreateAccount?: () => void;
}
export const AirDrop = (props: AirDropProps) => {
  const [showCreateMessageModal, setShowCreateMessageModal] =
    useState<boolean>(false);
  const { pointsList } = useContext(WalletContext);
  const activites = useMemo(() => {
    // return (pointsList?.data ?? []).map((point) => ({
    //   title: point.activityName,
    //   point: "?? points/downline",
    //   amount: point.points,
    //   actionText: "Get referral link",
    // }));
    const _points = pointsList?.data ?? [];
    return ACTIVITIES.map((activity) => {
      const _pt = _points.find((e) => e.activityName == activity.title);
      return {
        ...activity,
        title: activity.title,
        point: `${_pt?.points ?? "..."} point`,
        amount: _pt?.claimStatus?.[0]?.points ?? "...",
      };
    });
  }, [pointsList]);
  return (
    <motion.div
      className="inline-flex w-full flex-col gap-6 py-8"
      variants={displayVariants}
      initial={"hidden"}
      animate={"show"}
      exit={{
        opacity: 0,
        scale: 0,
      }}
      // transition={{ duration: 1, delay: 1 }}
    >
      <div className="flex my-2">
        <span>
          Complete the following activities to earn points towards our airdrop
        </span>
      </div>
      {/*  */}
      <div className="flex flex-col">
        {activites.map((e, i) => {
          return (
            <Fragment key={i}>
              <div className="flex justify-between items-center gap-2">
                <div className="flex flex-col">
                  <span className="text-lg text-gray-500">{e.title}</span>
                  {e.actionText && (
                    <span className="text-sm text-blue-500">
                      {e.actionText}
                    </span>
                  )}
                </div>
                <span className="text-gray-400">{e.point}</span>
                <span className="text-gray-500 text-2xl">{e.amount}</span>
              </div>
              <Divider className="!border-t-4 !border-gray-300 !mt-2" />
            </Fragment>
          );
        })}
      </div>
    </motion.div>
  );
};

const ACTIVITIES = [
  {
    title: "Referrals",
    point: "50 points/downline",
    amount: "30",
    actionText: "Get referral link",
  },
  {
    title: "Follow @mlayer on X",
    point: "6 point",
    amount: "0",
    actionText: "Connect your X Account",
  },
  {
    title: "Follow @mlayer on Discord",
    point: "6 point",
    amount: "0",
    actionText: "Connect your X Account",
  },
  {
    title: "Follow @rulerOfCode on X",
    point: "6 point",
    amount: "0",
    actionText: "Connect your X Account",
  },
  {
    title: "Connect Wallet",
    point: "3 point",
    amount: "3",
  },
  {
    title: "Authorize Agent",
    point: "3 point",
    amount: "6",
  },
  {
    title: "Create Topic",
    point: "3 point",
    amount: "6",
  },
  {
    title: "Join Topic",
    point: "4 point",
    amount: "9",
  },
  {
    title: "Send Message To Topic",
    point: "3 point",
    amount: "23",
  },
];
