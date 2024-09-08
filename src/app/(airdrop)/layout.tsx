import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { AirdropLayout } from "@/components";

const inter = Inter({ subsets: ["latin"] });
const myFont = localFont({ src: "../../fonts/geist/GeistVariableVF.ttf" });

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
  return <AirdropLayout>{children}</AirdropLayout>;
}
