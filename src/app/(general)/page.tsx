"use client";
import { WalletContext } from "@/context";
import { Card, Divider, Table, Spin } from "antd";
import Link from "next/link";
import React, { useContext, useEffect, useMemo } from "react";
import * as HeroIcons from "@heroicons/react/24/solid";
import { HomeStatCardOne } from "@/components";
import { currencyFormat } from "@/utils";

const columns = [
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
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Card className="shadow-2xl !rounded-2xl grow flex items-center justify-center [&>.ant-card-body]:flex [&>.ant-card-body]:grow [&>.ant-card-body]:items-center [&>.ant-card-body]:flex-wrap">
          <div className="flex flex-col grow gap-2">
            <HomeStatCardOne
              title="Total Accounts"
              amount={`${mainStatsData?.data.accounts ?? ""}`}
             
              icon={<HeroIcons.UsersIcon className="ml-2 h-[30px] " />}
            />
            <HomeStatCardOne
              title="Total Events"
              amount={`${mainStatsData?.data.messages ?? ""}`}
              // date="2h"
              // offset="+2,341"
              icon={<HeroIcons.EnvelopeIcon className="ml-2 h-[30px] " />}
            />
          </div>
          <Divider type="vertical" className="!h-[50px]" />
          <div className="flex flex-col grow gap-2">
            <HomeStatCardOne
              title="TVL"
              amount={`${mainStatsData?.data.topic_balance || 0} MSG`}
              offset={`${currencyFormat(1232345)}`}
              icon={<HeroIcons.BarsArrowUpIcon className="ml-2 h-[30px] " />}
            />
            <HomeStatCardOne
              title="Total Tranx Volume"
              amount={`${currencyFormat(
                mainStatsData?.data.message_cost ?? 0
              )} MSG`}
              // date="2h"
              offset="~$1,212,341"
              icon={<HeroIcons.WalletIcon className="ml-2 h-[30px] " />}
            />
          </div>
        </Card>
      </div>
      <Card className="shadow-2xl !rounded-2xl">
        <div className="flex justify-between mb-4">
          <span className="font-bold text-xl">Recent Blocks</span>
        </div>
        <Table
          dataSource={(dataSource ?? []).filter(d=>d.blk != 0)}
          columns={columns}
          loading={loaders["getBlockStats"]}
        />
      </Card>
    </div>
  );
};

export default DashboardPage;
