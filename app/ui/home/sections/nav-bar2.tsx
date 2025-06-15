"use client";
import Image from "next/image";
import { BiSolidGrid } from "react-icons/bi";
import { FaFacebookMessenger } from "react-icons/fa6";

import { IoNotificationsSharp } from "react-icons/io5";
export default function NavBar2() {
  return (
    <nav className="flex items-center space-x-3 justify-end w-full px-6 py-2">
      <BiSolidGrid className="w-11 h-11 p-2 fill-black bg-gray-200 rounded-full" />
      <FaFacebookMessenger className="w-11 h-11 fill-black p-2 bg-gray-200 rounded-full" />
      <IoNotificationsSharp className="w-11 h-11 fill-black p-2 bg-gray-200 rounded-full" />

      <Image
        alt="Amanuel Ferede"
        src={"/feeds/user.jpg"}
        width={0}
        height={0}
        sizes="100vh"
        className="w-11 h-11 object-contain rounded-full"
      />
    </nav>
  );
}
