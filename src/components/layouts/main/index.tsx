import React, { ReactNode } from "react";
import { AppHeader } from "./header";
import { AppFooter } from "./footer";

export interface MainLayoutProps {
  children: ReactNode | ReactNode[];
}
export const MainLayout = (props: MainLayoutProps) => {
  const { children } = props;
  return (
    <div className=" flex flex-col relative h-full">
      <AppHeader />
      <section className="px-4 md:px-20 relative grow">{children}</section>
      <AppFooter />
    </div>
  );
};
