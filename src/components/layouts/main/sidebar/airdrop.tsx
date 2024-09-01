"use client";
import { AirDropContext } from "@/context";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useContext } from "react";

interface AirdropAsideProps {}
export const AirdropAside = (props: AirdropAsideProps) => {
  const { selectedScreen, setSelectedScreen, tabsDetails } = useContext(AirDropContext);
  const pathname = usePathname();
  

  return (
    <div className="bg-secondaryBg px-7 py-20 flex flex-col h-full gap-6">
      {tabsDetails.map((detail, index) => {
        return (
          <div
            onClick={() => {
              setSelectedScreen?.(index);
            }}
            key={index}
            className={` ${
              index == selectedScreen
                ? "bg-mainLightColor"
                : "bg-[var(--m-background-color)]"
            } py-4 min-h-24 px-3 rounded-lg flex flex-col gap-4`}
          >
            <span className="dark:text-white font-bold text-sm">
              {detail.title}
            </span>
            <span className="dark:text-white text-xs">{detail.subTitle}</span>
          </div>
        );
      })}
    </div>
  );
};
