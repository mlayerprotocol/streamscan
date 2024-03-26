"use client";
import {
  Avatar,
  Button,
  Divider,
  Dropdown,
  Input,
  MenuProps,
  Spin,
  Typography,
} from "antd";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { MainAuth } from "@/components";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/redux/app";
import { AppContext, WalletContext } from "@/context";
import { clearSessionStorage, shorternAddress } from "@/utils";
import { removeAuthData } from "@/redux/slices";
import * as HeroIcons from "@heroicons/react/24/solid";
// import { setToken } from "@/redux/slices";

const MotionButton = motion(Button);

interface AppHeaderProps {}
export const AppHeader = (props: AppHeaderProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showMobilMoney, setShowMobilMoney] = useState<boolean>(false);
  const { initialLoading } = useContext(AppContext);
  const {
    connectedWallet,
    walletAccounts,
    loadingWalletConnections,
    initializeKeplr,
    intializeMetamask,
  } = useContext(WalletContext);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    console.log("logout");
    clearSessionStorage();
    dispatch(removeAuthData());
  };

  const userProfileItem: MenuProps["items"] = [
    {
      icon: <HeroIcons.Cog8ToothIcon className="ml-2 h-[20px]" />,
      label: <span className="font-medium text-base ml-2">Switch Wallet</span>,
      key: "3",
      onClick: () => {
        setShowModal((old) => !old);
      },
    },
    {
      label: (
        <span className="font-medium text-base ml-2 text-[#FDA29B]">
          Log Out
        </span>
      ),
      key: "4",
      onClick: handleLogout,
    },
  ];

  return (
    <>
      <header className="sticky top-0 flex flex-col py-4 px-4 md:px-20 lg:py-10  backdrop-blur-xl z-50 items-end ">
        <div className="flex w-full flex-wrap">
          {/* <Image
          src="/logo.svg"
          alt="Vercel Logo"
          className="light:invert"
          width={100}
          height={24}
          priority
        /> */}
          <div className="flex gap-3 md:gap-4 items-center">
            <span>MLT PRICE: $0.0001</span>
            <span>MSG PRICE: 0.002MLT (~$0.00002)</span>
          </div>
          <div className="ml-auto flex lg:hidden">
            <AnimatePresence>
              {!showMobilMoney && (
                <Dropdown
                  menu={{ items: userProfileItem }}
                  placement="bottomLeft"
                >
                  <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    className="h-[40px] rounded-full bg-[#6A6A6A] flex justify-center items-center px-1 "
                  >
                    <Avatar
                      size={32}
                      className="!bg-[#CBD5E1]"
                      src={`/icons/${connectedWallet}.svg`}
                      icon={initialLoading ? <Spin /> : <UserOutlined />}
                    />
                  </motion.div>
                </Dropdown>
              )}
            </AnimatePresence>

            <span onClick={() => setShowMobilMoney((old) => !old)}>
              {showMobilMoney ? (
                <HeroIcons.XMarkIcon className="ml-2 h-[40px] text-white" />
              ) : (
                <HeroIcons.Bars3Icon className="ml-2 h-[40px] text-white" />
              )}
            </span>
          </div>

          <div className=" hidden lg:flex grow items-center">
            <Input
              className="!w-[342px] ml-auto"
              prefix={
                <HeroIcons.MagnifyingGlassIcon className="h-[20px] text-white" />
              }
              placeholder="Search by Account, Agent, Event Hash"
            />
            <Button className="ml-6 " type="primary" shape="round">
              <div className="flex items-center gap-2">
                <span>Mainnet</span>
                <HeroIcons.ChevronDownIcon className="h-[20px] text-white" />
              </div>
            </Button>

            {!connectedWallet && (
              <MotionButton
                shape="round"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                onClick={() => {
                  setShowModal((old) => !old);
                }}
                className="h-[50px] flex justify-center items-center pl-1 pr-3 ml-2"
              >
                <Typography.Text className="ml-2 !text-white text-nowrap">
                  Connect Wallet
                </Typography.Text>
              </MotionButton>
            )}

            {connectedWallet && (
              <Dropdown
                menu={{ items: userProfileItem }}
                placement="bottomLeft"
              >
                <motion.a
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  className="h-[50px] rounded-full bg-[#6A6A6A] flex gap-2 justify-center items-center px-2 ml-2"
                >
                  <>
                    <Avatar
                      size={32}
                      className="!bg-[#CBD5E1]"
                      src={`/icons/${connectedWallet}.svg`}
                      icon={<UserOutlined />}
                    />
                    <span>
                      {shorternAddress(
                        walletAccounts[connectedWallet]?.[0] ?? ""
                      )}
                    </span>
                  </>
                </motion.a>
              </Dropdown>
            )}

            <MainAuth
              isModalOpen={showModal}
              onCancel={() => {
                setShowModal((old) => !old);
              }}
            />
          </div>
        </div>
        <AnimatePresence>
          {showMobilMoney && (
            <motion.div
              initial={{ opacity: 0, y: -80, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -80, height: 0 }}
              transition={{
                duration: 1,
                height: { duration: 0.5 },
              }}
              className="lg:hidden flex flex-col gap-10 pt-10 text-right"
            >
              <Link href={"/"} className="text-2xl text-white ">
                Home
              </Link>

              <Link href={"/my-list"} className="text-2xl text-white">
                My List
              </Link>

              <Link href={"/"} className="text-2xl text-white">
                Explore
              </Link>

              <Link href={"/"} className="text-2xl text-white">
                Wallet
              </Link>
              {connectedWallet && (
                <>
                  <Link href={"/"} className="text-2xl text-white">
                    Settings
                  </Link>
                  <span
                    onClick={handleLogout}
                    className="text-2xl text-red-500 cursor-pointer"
                  >
                    Log Out
                  </span>
                  <Button
                    className="ml-6 [&>*]:text-black"
                    type="primary"
                    shape="round"
                    onClick={() => {
                      setShowModal((old) => !old);
                    }}
                  >
                    Switch Wallet
                  </Button>
                </>
              )}

              {!connectedWallet && (
                <div className="flex justify-end">
                  <div
                    onClick={() => {
                      setShowModal((old) => !old);
                    }}
                    className="h-[50px] rounded-full bg-[#6A6A6A] flex justify-center items-center pl-1 pr-3"
                  >
                    <Typography.Text className="ml-2 !text-white text-nowrap">
                      Connect Wallet
                    </Typography.Text>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        <Divider className="!hidden lg:!block !border-t-4" />
        <div className=" hidden lg:flex justify-between grow items-center w-full">
          <span className="text-2xl">MLStream Scan</span>
          <div className="flex gap-2 ml-20 items-center">
            <Link href={"/"}>Home</Link>
            <span className="text-gray-500">|</span>
            <Link href={"/my-list"}>Validator</Link>
            <span className="text-gray-500">|</span>
            <Link href={"/"}>Name Service</Link>
          </div>
        </div>
      </header>
      <Button ghost className=" my-6  self-center w-2/3" type="primary">
        <span>Ad Space</span>
      </Button>
    </>
  );
};
