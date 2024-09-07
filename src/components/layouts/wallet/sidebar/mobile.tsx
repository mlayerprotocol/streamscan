"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import React, { useContext } from "react";
import * as HeroIcons from "@heroicons/react/24/solid";
import { WalletContext } from "@/context";
import { Avatar, Button, Dropdown, Input, MenuProps, Space, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { shorternAddress } from "@/utils";

const MotionButton = motion(Button);

interface SubnetAppAsideMobileProps {
  showSubnetSideMenu: boolean;
  setShowSubnetSideMenu: React.Dispatch<React.SetStateAction<boolean>>;
}
export const SubnetAppAsideMobile = (props: SubnetAppAsideMobileProps) => {
  const { showSubnetSideMenu, setShowSubnetSideMenu } = props;
  const pathname = usePathname();
  const {
    selectedAgent,
    setSelectedAgent,
    combinedAgents,
    selectedSubnetId,

  } = useContext(WalletContext);

  const items: MenuProps["items"] =
    (combinedAgents ?? [])
      .filter((cAgt) => cAgt.privateKey && cAgt.authData)
      .map((item, index) => {
        return {
          key: index,
          label: <span>{shorternAddress(item.address)}</span>,
          onClick: () => {
            setSelectedAgent?.(item.address);
          },
        };
      }) ?? [];

  return (
    <div className="bg-black bg-opacity-30 absolute z-40 top-0">
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        exit={{ x: -300 }}
        className="w-svw h-svh grid  grid-cols-3"
      >
        <div className="bg-secondaryBg px-7 py-20 flex flex-col h-full col-span-2 ">
          <Dropdown
            menu={{ items }}
            className="!border !border-[var(--m-border-color)] p-2 my-10 !rounded-md bg-[var(--m-secondary-color)]"
          >
            <div className="flex">
              <span className="dark:text-white text-sm">
                {items.length
                  ? shorternAddress(
                      combinedAgents.find((opt) => opt.address == selectedAgent)
                        ?.address ?? ""
                    )
                  : "No approved agents found"}
              </span>

              <HeroIcons.ChevronDownIcon className="ml-auto h-[20px]" />
            </div>
          </Dropdown>
          <Link
            className={`${
              pathname.indexOf(`/subnet/${selectedSubnetId}/agents`) == 0
                ? "border-l-2 border-l-mainLightColor bg-[var(--m-background-color)] dark:!text-white"
                : ""
            }  p-4 rounded font-bold  hover:text-gray-300 bg-red flex items-center gap-2 text-sm`}
            href={`/subnet/${selectedSubnetId}/agents`}
          >
            <HeroIcons.CpuChipIcon className="h-[20px]" />
            <span>Agents</span>
          </Link>

          <Link
            className={`${
              pathname.indexOf(`/subnet/${selectedSubnetId}/topics`) == 0
                ? "border-l-2 border-l-mainLightColor bg-[var(--m-background-color)] dark:!text-white"
                : ""
            }  p-4 rounded font-bold  hover:text-gray-300 bg-red flex items-center gap-2 text-sm`}
            href={`/subnet/${selectedSubnetId}/topics`}
          >
            <HeroIcons.NewspaperIcon className="h-[20px]" />
            <span>Topics</span>
          </Link>

          {!process.env.NEXT_PUBLIC_HIDE_AIRDROP && (
            <Link
              className={`${
                pathname.indexOf(`/subnet/${selectedSubnetId}/settings`) == 0
                  ? "border-l-2 border-l-mainLightColor bg-[var(--m-background-color)] dark:!text-white"
                  : ""
              }  p-4 rounded font-bold  hover:text-gray-300 bg-red flex items-center gap-2 text-sm`}
              href={`/subnet/${selectedSubnetId}/settings`}
            >
              <HeroIcons.Cog8ToothIcon className="h-[20px]" />
              <span>Settings</span>
            </Link>
          )}
        </div>
        <div
          className="h-full col-span-1 "
          onClick={() => setShowSubnetSideMenu?.((old) => !old)}
        ></div>
      </motion.div>
    </div>
  );
};
