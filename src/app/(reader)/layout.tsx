import { ReaderLayout } from "@/components";
import type { Metadata } from "next";

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
  return <ReaderLayout>{children}</ReaderLayout>;
}
