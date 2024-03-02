import React, { ReactNode } from "react";
import { AppHeader } from "./header";
import { AppFooter } from "./footer";

export interface ReaderLayoutProps {
  children: ReactNode | ReactNode[];
}
export const ReaderLayout = (props: ReaderLayoutProps) => {
  const { children } = props;
  return (
    <div className=" flex flex-col relative">
      <AppHeader />
      <section className="px-4 md:px-20 relative">{children}</section>
      <AppFooter />
    </div>
  );
};
