import Image from "next/image";
import React from "react";

interface AppFooterProps {}
export const AppFooter = (props: AppFooterProps) => {
  return (
    <footer className="p-4 lg:p-12 mt-10 bg-gray-300 dark:bg-[#292929] flex flex-col gap-12   ">
      <div className="flex ml-auto">
        <div className="flex  gap-4">
          <Image
            src="/icons/icons8-twitterx.svg"
            alt="twitterx Logo"
            width={40}
            height={40}
            priority
          />
          <Image
            src="/icons/icons8-medium.svg"
            alt="medium Logo"
            width={40}
            height={40}
            priority
          />
          <Image
            src="/icons/icons8-facebook.svg"
            alt="medium Logo"
            width={40}
            height={40}
            priority
          />
          <Image
            src="/icons/icons8-reddit.svg"
            alt="medium Logo"
            width={40}
            height={40}
            priority
          />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col gap-2 lg:mr-[148px]">
          <span className="text-2xl">ML Stream Explorer</span>
          <span className=" font-light   text-opacity-80">by Fero Tech</span>
        </div>

        <div className="hidden lg:flex flex-col gap-4">
          <span className="font-semibold mb-2">Company</span>
          <span className="font-light text-sm  text-opacity-80">About Us</span>
          <span className="font-light text-sm  text-opacity-80">
            Brand Assets
          </span>
          <span className="font-light text-sm  text-opacity-80">
            Contact Us
          </span>
        </div>

        <div className="hidden lg:flex flex-col gap-4">
          <span className="font-semibold mb-2">Socials</span>
          <span className="font-light text-sm  text-opacity-80">
            Api Documentation
          </span>
          <span className="font-light text-sm  text-opacity-80">
            Knowledge Base
          </span>
          <span className="font-light text-sm  text-opacity-80">
            Network Status
          </span>
        </div>

        <div className="hidden lg:flex flex-col gap-4">
          <span className="font-semibold mb-2">Products & Services</span>
          <span className="font-light text-sm  text-opacity-80">Advertise</span>
          <span className="font-light text-sm  text-opacity-80">
            Explore-as-a-Service (EaaS)
          </span>
          <span className="font-light text-sm  text-opacity-80">Api Plans</span>
        </div>
      </div>
    </footer>
  );
};
