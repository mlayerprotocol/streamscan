"use client";
import React, { useEffect } from "react";
import * as HeroIcons from "@heroicons/react/24/solid";
import { Breadcrumb, Layout, Menu, MenuProps, Table } from "antd";
import { useParams, useRouter } from "next/navigation";
import { Agents } from "./agents";
import { Topics } from "./topics";
import { Messages } from "./messages";
import { Stake } from "./stake";
import { AuthorizeAgent } from "@/components";
import { AirDrop } from "./airdrop";

const { Content, Sider } = Layout;

interface WalletMainLayoutProps {
  isModalOpen?: boolean;
  onCancel?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
export const WalletMainLayout = (props: WalletMainLayoutProps) => {
  const { tab } = useParams();
  const router = useRouter();

  useEffect(() => {
    console.log({ tab });
  }, [tab]);

  const tabItems: MenuProps["items"] = [
    {
      key: "airdrop",
      icon: <HeroIcons.GifIcon className="h-[20px]" />,
      label: "Airdrop",
      onClick: () => {
        router.push("/wallet/airdrop", { scroll: false });
      },
    },
    {
      key: "agents",
      icon: <HeroIcons.CpuChipIcon className="h-[20px]" />,
      label: "Agents/Devices",
      onClick: () => {
        router.push("/wallet/agents", { scroll: false });
      },
    },
    {
      key: "topics",
      icon: <HeroIcons.NewspaperIcon className="h-[20px]" />,
      label: "Topics",
      onClick: () => {
        router.push("/wallet/topics", { scroll: false });
      },
    },
    {
      key: "messages",
      icon: <HeroIcons.EnvelopeIcon className="h-[20px]" />,
      label: "Messages",
      onClick: () => {
        router.push("/wallet/messages", { scroll: false });
      },
    },
    {
      key: "stake",
      icon: <HeroIcons.CircleStackIcon className="h-[20px]" />,
      label: "Stake",
      onClick: () => {
        router.push("/wallet/stake", { scroll: false });
      },
    },
  ];
  return (
    <Layout>
      <Sider width={200} className="hidden lg:block">
        <Menu
          mode="inline"
          defaultSelectedKeys={["agents"]}
          selectedKeys={[tab as string]}
          style={{ height: "100%", borderRight: 0 }}
          items={tabItems}
        />
      </Sider>
      <Layout style={{ padding: "0 24px 24px" }}>
        <Content style={{}}>
          {"agents" == tab && <Agents />}
          {"topics" == tab && <Topics />}
          {"messages" == tab && <Messages />}
          {"stake" == tab && <Stake />}
          {"airdrop" == tab && <AirDrop />}
        </Content>
      </Layout>
    </Layout>
  );
};
