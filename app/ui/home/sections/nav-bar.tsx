"use client";
import Image from "next/image";
import Link from "next/link";
import { BiSolidGrid } from "react-icons/bi";
import { FaFacebookMessenger } from "react-icons/fa6";

import { IoNotificationsSharp } from "react-icons/io5";
import { LiaSellcast } from "react-icons/lia";
import { LuTvMinimalPlay } from "react-icons/lu";
import { MdHomeFilled, MdOutlineGroups2 } from "react-icons/md";

import { SiYoutubegaming } from "react-icons/si";
export default function NavBar() {
  return (
    <nav className="py-1.5 px-4 fixed top-0 left-0 right-0 z-10 bg-white w-full shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href={"/home"}>
            <Image
              alt="Amanuel Ferede"
              src={"/feeds/clogo.jpg"}
              width={0}
              height={0}
              sizes="100vh"
              className="w-10 h-10 object-center rounded-full border-2 border-blue-700"
            />
          </Link>
          <input
            className="md:block outline-none border-none bg-gray-100 hidden py-2 px-4 rounded-3xl border-2 border-gray-300"
            placeholder="Search Developers ..."
          ></input>
        </div>
        <div className="md:flex hidden items-center space-x-3 text-gray-500">
          <div className="rounded-md transition duration-300 ease-in-out hover:bg-slate-50 py-3 px-6 cursor-pointer">
            <MdHomeFilled className="w-[26px] fill-blue-600 h-[26px]" />
          </div>
          <div className="rounded-md transition duration-300 ease-in-out hover:bg-slate-50 py-3 px-6 cursor-pointer">
            <LuTvMinimalPlay className="w-[26px] h-[26px]" />
          </div>
          <div className="rounded-md transition duration-300 ease-in-out hover:bg-slate-50 py-3 px-6 cursor-pointer">
            <LiaSellcast className="w-[26px] h-[26px]" />
          </div>
          <div className="rounded-md transition duration-300 ease-in-out hover:bg-slate-50 py-3 px-6 cursor-pointer">
            <MdOutlineGroups2 className="w-[26px] h-[26px]" />
          </div>
          <div className="rounded-md transition duration-300 ease-in-out hover:bg-slate-50 py-3 px-6 cursor-pointer">
            <SiYoutubegaming className="w-[26px] h-[26px]" />
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <BiSolidGrid className="w-10 h-10 p-2 fill-black bg-gray-200 rounded-full" />
          <FaFacebookMessenger className="w-10 h-10 fill-black p-2 bg-gray-200 rounded-full" />
          <IoNotificationsSharp className="w-10 h-10 fill-black p-2 bg-gray-200 rounded-full" />

          <Image
            alt="Amanuel Ferede"
            src={"/feeds/user.jpg"}
            width={0}
            height={0}
            sizes="100vh"
            className="w-10 h-10 object-contain rounded-full"
          />
        </div>
      </div>
    </nav>
  );
}
