import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { MainLayout } from "@/components";

const inter = Inter({ subsets: ["latin"] });
const myFont = localFont({ src: "../../fonts/geist/GeistVariableVF.ttf" });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
