"use client";
import React, { useContext, useEffect } from "react";
import * as HeroIcons from "@heroicons/react/24/solid";
import { Breadcrumb, Layout, Menu, MenuProps, Table } from "antd";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Agents } from "./agents";
import { Topics } from "./topics";
import { Messages } from "./messages";
import { Stake } from "./stake";
import { AuthorizeAgent } from "@/components";
import { AirDrop } from "./airdrop";
import { Settings } from "./settings";
import { WalletContext } from "@/context";
import { Smartlets } from "./smartlet";
import { Tokens } from "./token";

const { Content, Sider } = Layout;

interface WalletMainLayoutProps {
  isModalOpen?: boolean;
  onCancel?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
export const WalletMainLayout = (props: WalletMainLayoutProps) => {
  const { tab, subnetId } = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const { selectedSubnetId, setSelectedSubnetId } = useContext(WalletContext);
  useEffect(() => {
    console.log({ pathname });
  }, [pathname]);

  useEffect(() => {
    if (selectedSubnetId == null) return;
    // setSelectedSubnetId?.(subnetId);

    const paths = pathname.split("/");
    paths[2] = selectedSubnetId;
    router.push(paths.join("/"), { scroll: false });
  }, [selectedSubnetId]);

  const tabItems: MenuProps["items"] = [
    // {
    //   key: "airdrop",
    //   icon: <HeroIcons.GifIcon className="h-[20px]" />,
    //   label: "Airdrop",
    //   onClick: () => {
    //     router.push("/wallet/airdrop", { scroll: false });
    //   },
    // },
    {
      key: "agents",
      icon: <HeroIcons.CpuChipIcon className="h-[20px]" />,
      label: "Agents/Devices",
      onClick: () => {
        router.push(`/subnet/${selectedSubnetId}/agents`, { scroll: false });
      },
    },
    {
      key: "topics",
      icon: <HeroIcons.NewspaperIcon className="h-[20px]" />,
      label: "Topics",
      onClick: () => {
        router.push(`/subnet/${selectedSubnetId}/topics`, { scroll: false });
      },
    },
    {
      key: "tokens",
      icon: <HeroIcons.CurrencyYenIcon className="h-[20px]" />,
      label: "Tokens",
      onClick: () => {
        router.push(`/subnet/${selectedSubnetId}/tokens`, { scroll: false });
      },
    },
    {
      key: "messages",
      icon: <HeroIcons.EnvelopeIcon className="h-[20px]" />,
      label: "Messages",
      onClick: () => {
        router.push(`/subnet/${selectedSubnetId}/messages`, { scroll: false });
      },
    },
    {
      key: "stake",
      icon: <HeroIcons.CircleStackIcon className="h-[20px]" />,
      label: "Stake",
      onClick: () => {
        router.push(`/subnet/${selectedSubnetId}/stake`, { scroll: false });
      },
    },
    {
      key: "smartlet",
      icon: <HeroIcons.CogIcon className="h-[20px]" />,
      label: "Smartlet",
      onClick: () => {
        router.push(`/subnet/${selectedSubnetId}/smartlet`, { scroll: false });
      },
    },
    {
      key: "settings",
      icon: <HeroIcons.Cog8ToothIcon className="h-[20px]" />,
      label: "Settings",
      onClick: () => {
        router.push(`/subnet/${selectedSubnetId}/settings`, { scroll: false });
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
          {"settings" == tab && <Settings />}
          {"smartlet" == tab && <Smartlets />}
          {"tokens" == tab && <Tokens />}
          {/* {"airdrop" == tab && <AirDrop />} */}
        </Content>
      </Layout>
    </Layout>
  );
};
