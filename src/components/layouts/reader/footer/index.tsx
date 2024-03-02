"use client";
import { Button } from "antd";
import Image from "next/image";
import React from "react";
import * as HeroIcons from "@heroicons/react/24/solid";

interface AppFooterProps {}
export const AppFooter = (props: AppFooterProps) => {
  return (
    <footer className="p-4 lg:py-6 lg:px-20 mt-10  bg-[#141414] flex  justify-between ">
      <div className="flex items-center gap-3">
        <Button
          className="!rounded-lg !border-[#424242] w-10 [&.ant-btn]:!h-10 !p-0 !flex items-center justify-center"
          ghost
        >
          <HeroIcons.ChevronLeftIcon className="h-[20px] text-white" />
        </Button>
        <span className="text-lg text-primary text-left">Episode 22: Finding Pete</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-lg text-primary text-right">Episode 24: The Decision!</span>
        <Button
          className="!rounded-lg !border-[#424242] w-10 [&.ant-btn]:!h-10 !p-0 !flex items-center justify-center"
          ghost
        >
          <HeroIcons.ChevronRightIcon className="h-[20px] text-white" />
        </Button>
      </div>
    </footer>
  );
};
