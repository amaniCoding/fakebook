"use client";
import { useState } from "react";
import { BiCalendarEvent } from "react-icons/bi";
import { FaBirthdayCake, FaUserFriends } from "react-icons/fa";
import { FaFacebookMessenger, FaGamepad } from "react-icons/fa6";
import { IoSaveSharp } from "react-icons/io5";
import { MdFeed, MdGroups, MdPayments } from "react-icons/md";
import { PiFilmReelFill, PiVideoFill } from "react-icons/pi";
import { RiPagesFill } from "react-icons/ri";
import {
  SiCodeclimate,
  SiFacebookgaming,
  SiGooglemarketingplatform,
} from "react-icons/si";
export default function SideSection() {
  const [showScrollBar, setShowScrollBar] = useState(false);
  return (
    <div className="w-[30%] md:flex hidden pt-12 flex-col space-y-5  fixed left-0 bottom-0 top-0 ">
      <div
        className={`w-3/4 h-full overflow-y-scroll  pt-10 pl-3 ${
          showScrollBar ? "socrollabar" : "socrollabar-hidden"
        }`}
        onMouseOver={() => setShowScrollBar(true)}
        onMouseOut={() => setShowScrollBar(false)}
      >
        <div className="p-2 flex items-center mb-1 space-x-2 hover:bg-gray-200 rounded-l-md rounded-b-md cursor-pointer w-full">
          <FaUserFriends className="w-6 h-6 fill-blue-600" />
          <span>Freinds</span>
        </div>
        <div className="p-2 flex items-center mb-1 space-x-2 hover:bg-gray-200 rounded-l-md rounded-b-md cursor-pointer w-full">
          <MdGroups className="w-6 h-6 fill-blue-600" />
          <span>Groups</span>
        </div>

        <div className="p-2 flex items-center mb-1 space-x-2 hover:bg-gray-200 rounded-l-md rounded-b-md cursor-pointer w-full">
          <RiPagesFill className="w-6 h-6 fill-pink-600" />
          <span>Pages</span>
        </div>
        <div className="p-2 flex items-center mb-1 space-x-2 hover:bg-gray-200 rounded-l-md rounded-b-md cursor-pointer w-full">
          <PiVideoFill className="w-6 h-6 fill-blue-600" />
          <span>Videos</span>
        </div>
        <div className="p-2 flex items-center mb-1 space-x-2 hover:bg-gray-200 rounded-l-md rounded-b-md cursor-pointer w-full">
          <IoSaveSharp className="w-6 h-6 fill-pink-600" />
          <span>Saved</span>
        </div>
        <div className="p-2 flex items-center mb-1 space-x-2 hover:bg-gray-200 rounded-l-md rounded-b-md cursor-pointer w-full">
          <PiFilmReelFill className="w-6 h-6 fill-pink-600" />
          <span>Reels</span>
        </div>
        <div className="p-2 flex items-center mb-1 space-x-2 hover:bg-gray-200 rounded-l-md rounded-b-md cursor-pointer w-full">
          <FaFacebookMessenger className="w-6 h-6 fill-blue-600" />
          <span>Messenger</span>
        </div>
        <div className="p-2 flex items-center mb-1 space-x-2 hover:bg-gray-200 rounded-l-md rounded-b-md cursor-pointer w-full">
          <MdFeed className="w-6 h-6 fill-pink-600" />
          <span>Feeds</span>
        </div>
        <div className="p-2 flex items-center mb-1 space-x-2 hover:bg-gray-200 rounded-l-md rounded-b-md cursor-pointer w-full">
          <BiCalendarEvent className="w-6 h-6 fill-blue-600" />
          <span>Events</span>
        </div>

        <div className="p-2 flex items-center mb-1 space-x-2 hover:bg-gray-200 rounded-l-md rounded-b-md cursor-pointer w-full">
          <FaBirthdayCake className="w-6 h-6 fill-blue-600" />
          <span>Birthdays</span>
        </div>

        <div className="p-2 flex items-center mb-1 space-x-2 hover:bg-gray-200 rounded-l-md rounded-b-md cursor-pointer w-full">
          <SiCodeclimate className="w-6 h-6 fill-blue-600" />
          <span>Climate sicence center</span>
        </div>
        <div className="p-2 flex items-center mb-1 space-x-2 hover:bg-gray-200 rounded-l-md rounded-b-md cursor-pointer w-full">
          <FaGamepad className="w-6 h-6 fill-blue-600" />
          <span>Play Games</span>
        </div>

        <div className="p-2 flex items-center mb-1 space-x-2 hover:bg-gray-200 rounded-l-md rounded-b-md cursor-pointer w-full">
          <SiFacebookgaming className="w-6 h-6 fill-pink-600" />
          <span>Gaming Videos</span>
        </div>
        <div className="p-2 flex items-center mb-1 space-x-2 hover:bg-gray-200 rounded-l-md rounded-b-md cursor-pointer w-full">
          <MdPayments className="w-6 h-6 fill-blue-600" />
          <span>Orders and payments</span>
        </div>

        <div className="p-2 flex items-center mb-1 space-x-2 hover:bg-gray-200 rounded-l-md rounded-b-md cursor-pointer w-full">
          <SiGooglemarketingplatform className="w-6 h-6 fill-blue-600" />
          <span>Market Place</span>
        </div>
      </div>
    </div>
  );
}
