"use client";
import { WalletContext } from "@/context";
import { Card, Divider, Table, Spin } from "antd";
import Link from "next/link";
import React, { useContext, useEffect, useMemo } from "react";
import * as HeroIcons from "@heroicons/react/24/solid";
import {
  HomeStatCardOne,
  HomeStatCardTwo,
  NewHomeStatCardOne,
} from "@/components";
import { currencyFormat } from "@/utils";
import { ColumnsType } from "antd/es/table";
import { BlockStat } from "@/model/block-stats";
import { ethers } from "ethers";

const columns: ColumnsType<BlockStat> = [
  {
    title: "Height",
    dataIndex: "blk",
    key: "blk",
    
  },
  {
    title: "Cycle",
    dataIndex: "cy",
    key: "cy",
  },
  {
    title: "Events",
    dataIndex: "eC",
    key: "eC",
  },
  {
    title: "Volume",
    dataIndex: "vol",
    key: "vol",
  },
  // {
  //   title: "Finalized",
  //   dataIndex: "address",
  //   key: "finalized",
  // },
];

const DashboardPage = () => {
  var intervalId: any;
  const { loaders, blockStatsList, mainStatsData, setToggleGroupStats } =
    useContext(WalletContext);

  const dataSource = useMemo(() => {
    return blockStatsList?.data ?? [];
  }, [blockStatsList]);

  useEffect(() => {
    intervalId = setInterval(() => {
      setToggleGroupStats?.((old) => !old);
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <div className="flex flex-col gap-4 my-16 md:my-20 mx-5 md:mx-10 ">
      <div className="grid grid-cols-12 gap-4">
        <Card className="col-span-12 md:col-span-6 lg:col-span-3">
          <NewHomeStatCardOne
            title="Total Accounts"
            amount={`${mainStatsData?.data.accounts ?? ""}`}
            icon={<HeroIcons.UserIcon className="h-[18px] !text-[#AEB9E1] " />}
          />
        </Card>
        <Card className="col-span-12 md:col-span-6 lg:col-span-3">
          <NewHomeStatCardOne
            title="Total Events"
            amount={`${mainStatsData?.data.messages ?? ""}`}
            icon={
              <HeroIcons.EnvelopeIcon className="h-[18px] !text-[#AEB9E1] " />
            }
          />
        </Card>
        <Card className="col-span-12 md:col-span-6 lg:col-span-3">
          <HomeStatCardTwo
            title="TVL"
            amount={`${mainStatsData?.data.topic_balance || 0} MLT`}
            offset={`${currencyFormat(1232345)}`}
            icon={
              <HeroIcons.BarsArrowUpIcon className="h-[18px] !text-[#AEB9E1] " />
            }
          />
        </Card>

        <Card className="col-span-12 md:col-span-6 lg:col-span-3">
          <HomeStatCardTwo
            title="Total Tranx Volume"
            amount={`${ethers.formatEther(mainStatsData?.data.message_cost ?? 0)} MLT`}
            // date="2h"
            offset="~$1,212"
            icon={
              <HeroIcons.WalletIcon className="h-[18px] !text-[#AEB9E1] " />
            }
          />
        </Card>
      </div>

      <div className="flex justify-center mt-10">
        <span className="font-bold text-sm dark:text-white">Recent Blocks</span>
      </div>
      <Table
        // bordered
        className="rounded-lg"
        dataSource={(dataSource ?? []).filter((d) => d.blk != 0)}
        columns={columns}
        loading={loaders["getBlockStats"]}
      />
    </div>
  );
};

export default DashboardPage;
