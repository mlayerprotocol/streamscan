"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  MdBroadcastOnPersonal,
  MdHomeFilled,
  MdOutlineCardGiftcard,
} from "react-icons/md";

interface AppAsideProps {}
export const AppAside = (props: AppAsideProps) => {
  const pathname = usePathname();
  console.log({ pathname });
  const isAtSubnet = pathname.indexOf("/subnet") == 0;
  const isAtSubnetInner = isAtSubnet && pathname != "/subnet";
  return (
    <div className="bg-secondaryBg px-7 py-20 flex flex-col h-full">
      <Link
        className={`${
          pathname == "/"
            ? "border-l-2 border-l-mainLightColor bg-[var(--m-background-color)] dark:!text-white"
            : ""
        }  p-4 rounded font-bold  hover:text-gray-300 bg-red flex items-center gap-2 ${
          isAtSubnetInner ? "w-fit" : ""
        }`}
        href={"/"}
      >
        <MdHomeFilled size={20} />
        {!isAtSubnetInner && <span className="">Home</span>}
      </Link>

      <Link
        className={`${
          isAtSubnet
            ? "border-l-2 border-l-mainLightColor bg-[var(--m-background-color)] dark:!text-white"
            : ""
        }  p-4 rounded font-bold  hover:text-gray-300 bg-red flex items-center gap-2 ${
          isAtSubnetInner ? "w-fit" : ""
        }`}
        href={"/subnet"}
      >
        <MdBroadcastOnPersonal size={20} />
        {!isAtSubnetInner && <span className="">Subnets</span>}
      </Link>

      {!process.env.NEXT_PUBLIC_HIDE_AIRDROP && (
        <Link
          className={`${
            pathname == "/airdrop"
              ? "border-l-2 border-l-mainLightColor bg-[var(--m-background-color)] dark:!text-white"
              : ""
          }  p-4 rounded font-bold  hover:text-gray-300 bg-red flex items-center gap-2 ${
            isAtSubnetInner ? "w-fit" : ""
          }`}
          href={"/airdrop"}
        >
          <MdOutlineCardGiftcard size={20} />
          {!isAtSubnetInner && <span className="">Airdrop</span>}
        </Link>
      )}
    </div>
  );
};
