import { AuthModelData } from "@/model";
import { Button } from "antd";
import Image from "next/image";

interface ComingSoonStateProps {
  userData?: AuthModelData;
}
export const ComingSoonState = (props: ComingSoonStateProps) => {
  return (
    <div className="flex flex-col items-center my-10 lg:my-20 gap-6">
      <div className="flex justify-center w-[150px] h-[150px] shadow-[0_35px_60px_-15px_rgba(255,255,255,0.3)]">
        <Image
          src="/icons/clock.svg"
          alt="Vercel Logo"
          width={40}
          height={40}
          priority
        />
      </div>
      <span
        className="text-base lg:text-xl font-medium"
        style={{ letterSpacing: "5px" }}
      >
        Coming Soon!
      </span>
    </div>
  );
};
