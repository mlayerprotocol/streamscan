"use client";
import React, { ReactNode, useState } from "react";
import { AppHeader } from "./header";
import { AppFooter } from "./footer";
import { AppAside } from "./sidebar";
import { AppAsideMobile } from "./sidebar/mobile";
import { AnimatePresence } from "framer-motion";
import { MainAuth } from "@/components/modals";
import { usePathname } from "next/navigation";

export interface MainLayoutProps {
  children: ReactNode | ReactNode[];
}
export const MainLayout = (props: MainLayoutProps) => {
  const { children } = props;
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const [showAuthenticationModal, setShowAuthenticationModal] =
    useState<boolean>(false);
  const pathname = usePathname();
  const isAtSubnetInner =
    pathname.indexOf("/subnet") == 0 && pathname != "/subnet";
  return (
    <div className=" flex flex-col relative h-full">
      <AppHeader
        setShowMobileMenu={setShowMobileMenu}
        showMobileMenu={showMobileMenu}
        setShowAuthenticationModal={setShowAuthenticationModal}
        showAuthenticationModal={showAuthenticationModal}
      />
      <MainAuth
        isModalOpen={showAuthenticationModal}
        onCancel={() => {
          setShowAuthenticationModal((old) => !old);
        }}
        handleClose={() => setShowAuthenticationModal(false)}
      />
      <AnimatePresence>
        {showMobileMenu && (
          <AppAsideMobile
            setShowMobileMenu={setShowMobileMenu}
            showMobileMenu={showMobileMenu}
            setShowAuthenticationModal={setShowAuthenticationModal}
            showAuthenticationModal={showAuthenticationModal}
          />
        )}
      </AnimatePresence>
      <div className="grid grid-cols-12">
        <div
          className={`hidden lg:block ${
            isAtSubnetInner ? "col-span-1" : "col-span-2"
          }`}
        >
          <AppAside />
        </div>
        <section
          className={`relative  ${
            isAtSubnetInner ? "col-span-12 lg:col-span-11" : "col-span-12 lg:col-span-10"
          }`}
        >
          {children}
        </section>
      </div>

      <AppFooter />
    </div>
  );
};
