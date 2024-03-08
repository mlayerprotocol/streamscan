import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";

import localFont from "next/font/local";

import {
  AppContextProvider,
  MetaWrapper,
  ThemeContextProvider,
  WalletContextProvider,
} from "@/context";
import { MetaMaskProvider } from "@metamask/sdk-react";

const inter = Inter({ subsets: ["latin"] });
const myFont = localFont({ src: "../fonts/geist/GeistVariableVF.ttf" });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${myFont.className} `}>
        <ThemeContextProvider>
          <AppContextProvider>
            <AntdRegistry>
              <MetaWrapper>
                <WalletContextProvider>{children}</WalletContextProvider>
              </MetaWrapper>
            </AntdRegistry>
          </AppContextProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
