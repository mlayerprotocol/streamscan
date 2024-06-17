import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  BsDiscord,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsX,
  BsLinkedin,
  BsReddit,
  BsTelegram,
  BsYoutube,
} from 'react-icons/bs';

interface AppFooterProps {}
export const AppFooter = (props: AppFooterProps) => {
  return (
    <footer className="p-4 lg:p-12 mt-10 bg-gray-300 dark:bg-[#292929] flex flex-col gap-12   ">
      <div className="flex ml-auto">
        <div className="flex  gap-4">
        <Link
                className="inline-block hover:text-white transition-all duration-300"
                target='_blank'
                href="https://github.com/mlayerprotocol"
              >
                <BsGithub />
              </Link>
              {/* <Link
                className="inline-block hover:text-white transition-all duration-300"
                href="#"
              >
                <BsFacebook />
              </Link> */}
              <Link
                className="inline-block hover:text-white transition-all duration-300"
                href="https://twitter.com/mlayerprotocol"
                target='_blank'
              >
                <BsX />
              </Link>
              <Link
                className="inline-block hover:text-white transition-all duration-300"
                href="https://discord.gg/QazYZYBqus"
                target='_blank'
              >
                <BsDiscord />
              </Link>
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
