// Use the client directive for using usePathname hook.
"use client";

// Use usePathname for catching route name.
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  return (
    <>
      {pathname === "/posts" && <h1>Welcome to Posts page!</h1>}
      {children}
    </>
  );
};
