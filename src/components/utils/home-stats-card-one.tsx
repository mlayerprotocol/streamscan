import { AuthModelData } from "@/model";
import * as HeroIcons from "@heroicons/react/24/solid";
import { ReactNode } from "react";

interface HomeStatCardOneProps {
  title: string;
  amount: string;
  date: string;
  offset: string;
  icon?: ReactNode;
}
export const HomeStatCardOne = (props: HomeStatCardOneProps) => {
  const { title, amount, date, offset, icon } = props;
  return (
    <div className="flex gap-2">
      {icon ?? <HeroIcons.UsersIcon className="ml-2 h-[30px] " />}
      <div className="flex flex-col grow">
        <span className="text-gray-500 text-sm">{title}</span>
        <span className="font-bold">{amount}</span>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-gray-500 text-sm">{date}</span>
        <span className="text-sm text-green-500">{offset}</span>
      </div>
    </div>
  );
};
