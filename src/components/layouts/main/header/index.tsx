"use client";
import {
  Avatar,
  Button,
  Divider,
  Dropdown,
  Input,
  MenuProps,
  Spin,
  Switch,
  Tag,
  Typography,
} from "antd";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { MainAuth } from "@/components";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/redux/app";
import { AppContext, ThemeContext, WalletContext } from "@/context";
import { NETWORK, clearSessionStorage, shorternAddress } from "@/utils";
import { removeAuthData } from "@/redux/slices";
import * as HeroIcons from "@heroicons/react/24/solid";
// import { setToken } from "@/redux/slices";

const MotionButton = motion(Button);

interface AppHeaderProps {}
export const AppHeader = (props: AppHeaderProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showMobilMoney, setShowMobilMoney] = useState<boolean>(false);
  const { initialLoading } = useContext(AppContext);
  const { themeType, toggleTheme } = useContext(ThemeContext);
  const {
    connectedWallet,
    walletAccounts,
    selectedSubnetId,
    initializeKeplr,
    intializeMetamask,
  } = useContext(WalletContext);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    console.log("logout");
    clearSessionStorage();
    dispatch(removeAuthData());
  };

  
  let userProfileItem: MenuProps["items"] = [
    {
      key: "2",
      icon: <HeroIcons.UserCircleIcon className="ml-2 h-[20px]" />,
      label: (
        <Link href={"/subnet"} className="font-medium text-base ml-2">
          Subnets
        </Link>
      ),
    }];
  
  if (!process.env.NEXT_PUBLIC_HIDE_AIRDROP)  {
      userProfileItem.push({
      key: "2.5",
      icon: <HeroIcons.UserCircleIcon className="ml-2 h-[20px]" />,
      label: (
        <Link href={"/airdrop"} className="font-medium text-base ml-2">
          Airdrop
        </Link>
      ),
    })
    }
    userProfileItem = userProfileItem.concat([
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
  ]);

  return (
    <>
      <header className="sticky top-0 flex flex-col py-1 lg:py-2  lg:py-10  backdrop-blur-xl z-50 items-end ">
        <div className="flex w-full flex-wrap px-4 md:px-20">
          {/* <Image
          src="/logo.svg"
          alt="Vercel Logo"
          className="light:invert"
          width={100}
          height={24}
          priority
        /> */}
          <div className="flex gap-3 md:gap-4 items-center !text-xs !text-gray-400">
            <span>MSG PRICE: $0.0001</span>
            <span>MSG PRICE: 0.002MSG (~$0.00002)</span>
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
                      src={
                        connectedWallet ? `/icons/${connectedWallet}.svg` : ""
                      }
                      icon={initialLoading ? <Spin /> : <UserOutlined />}
                    />
                  </motion.div>
                </Dropdown>
              )}
            </AnimatePresence>

            <span onClick={() => setShowMobilMoney((old) => !old)}>
              {showMobilMoney ? (
                <HeroIcons.XMarkIcon className="ml-2 h-[40px] " />
              ) : (
                <HeroIcons.Bars3Icon className="ml-2 h-[40px] " />
              )}
            </span>
          </div>

          <div className=" hidden lg:flex grow items-center">
            <Input
              className="!w-[342px] ml-auto mr-5"
              prefix={
                <HeroIcons.MagnifyingGlassIcon className="h-[20px] text-white" />
              }
              placeholder="Search by Account, Agent, Event Hash"
            />
            <Tag className="ml-5" color="red"  >
              <div className="flex items-center gap-2">
                <span className="ml-0 text-nowrap uppercase">
                  {NETWORK}
                </span>
                {/* <HeroIcons.ChevronDownIcon className="h-[20px] text-white" /> */}
              </div>
            </Tag>

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
                <Typography.Text className="ml-0 !text-white text-nowrap">
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
                  className="h-[40px] rounded-full bg-gray-100 dark:bg-[#6A6A6A] flex gap-2 justify-center items-center px-2 ml-2"
                >
                  <>
                    <Avatar
                      size={28}
                      className="dark:!bg-[#CBD5E1] !border-0"
                      src={`/icons/${connectedWallet}.svg`}
                      icon={<UserOutlined />}
                    />
                    <span className="text-sm">
                      {shorternAddress(
                        walletAccounts[connectedWallet]?.[0] ?? ""
                      )}
                    </span>
                  </>
                </motion.a>
              </Dropdown>
            )}

            <Switch
              className="!ml-2"
              value={themeType == "light"}
              onChange={() => {
                toggleTheme?.();
              }}
            />

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
              className="lg:hidden flex flex-col gap-10 p-10  text-right"
            >
              <Link
                href={"/"}
                className="text-2xl  "
                onClick={() => {
                  setShowMobilMoney((old) => !old);
                }}
              >
                Home
              </Link>
              <div className="flex flex-col gap-5">
              <Link
                href={"/subnet"}
                className="text-2xl "
                onClick={() => {
                  setShowMobilMoney((old) => !old);
                }}
              >
                Subnets
              </Link>
     
              <Link
                href={`/subnet/${selectedSubnetId}/agents`}
                className="text-xl text-gray-200 p-x-5"
                onClick={() => {
                  setShowMobilMoney((old) => !old);
                }}
              >
                Agents -
              </Link>
              <Link
                href={`/subnet/${selectedSubnetId}/topics`}
                className="text-xl "
                onClick={() => {
                  setShowMobilMoney((old) => !old);
                }}
              >
                Topics -
              </Link>
              
              </div>
              <Link
                href={"/pending-topic"}
                className="text-2xl "
                onClick={() => {
                  setShowMobilMoney((old) => !old);
                }}
              >
                Invited Topics
              </Link>
              
              
              {!process.env.NEXT_PUBLIC_HIDE_AIRDROP && <Link
                href={"/airdrop"}
                className="text-2xl "
                onClick={() => {
                  setShowMobilMoney((old) => !old);
                }}
              >
                Airdrop
              </Link>}
              {/* <Link
                href={`/subnet/${selectedSubnetId}/stake`}
                className="text-2xl "
                onClick={() => {
                  setShowMobilMoney((old) => !old);
                }}
              >
                Stake
              </Link> */}
              {connectedWallet && (
                <>
                  <Link href={"/"} className="text-2xl ">
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
        <Divider className="!hidden lg:!block !border-t-2 !mb-2 !mt-2" />
        <div className=" hidden lg:flex justify-between grow items-center w-full px-7  md:px-20">
          <div className="flex items-center gap-2 mx-10">
            <a href="/">
              <Image
                src="/logo.png"
                alt="Vercel Logo"
                // className="light:invert"
                width={48}
                height={48}
                priority
              />{" "}
            </a>
            <a href="/">

              <span className="text-2xl"><span className="text-gray-400 bg-opacity-40  font-bold">ml</span>studio</span>
             </a>

          </div>

          <div className="flex gap-3 mx-10 items-center">
            <Link  className="text-blue-200 hover:text-white"  href={"/"}>Home</Link>
            <span className="text-gray-500">|</span>
            <Link className="text-blue-200 hover:text-white" href={"/subnet"}>Subnets</Link>
           
            {/* <span className="text-gray-500">|</span>
            <Link href={"/pending-topic"}>Invitations</Link> */}
          
            {!process.env.NEXT_PUBLIC_HIDE_AIRDROP &&   <><span className="text-gray-500">|</span> <Link className="text-blue-200 hover:text-white" href={"/airdrop"}>Airdrop</Link></>}
            {/* <Link href={"/my-list"}>Validator</Link>
            <span className="text-gray-500">|</span>
            <Link href={"/"}>Name Service</Link> */}
          </div>
        </div>
      </header>
      {/* <Button ghost className=" my-6  self-center w-2/3" type="primary">
        <span>Ad Space</span>
      </Button> */}
    </>
  );
};
