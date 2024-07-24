import type { Metadata } from "next";
import { Inter, Josefin_Slab, Jost } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";

import localFont from "next/font/local";

import {
  AppContextProvider,
  MetaWrapper,
  ThemeContextProvider,
  WagmiWrapper,
  WalletContextProvider,
} from "@/context";

const gFont = Jost({ subsets: ["latin"] });
// const myFont = localFont({ src: "../fonts/geist/GeistVariableVF.ttf" });

export const metadata: Metadata = {
  title: "mLayer",
  description:
    "mLayer is a blockchain optimized for scalable data communication needed to build DePIN and EoT for mobility, energy, monitoring and other real world applications",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="icon" type="image/png" sizes="any" href="/logo.png" />
        <link rel="icon" href="/favicon.png" sizes="any" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body className={`${gFont.className} `} style={{ height: "100vh" }}>
        <ThemeContextProvider>
          <AppContextProvider>
            <AntdRegistry>
              {/* <MetaWrapper> */}
                <WagmiWrapper>
                  <WalletContextProvider>{children}</WalletContextProvider>
                </WagmiWrapper>
              {/* </MetaWrapper> */}
            </AntdRegistry>
          </AppContextProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
