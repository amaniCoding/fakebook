"use client";
import Image from "next/image";

import PostBox from "./post-box";
import { useState } from "react";
import { RiLiveFill } from "react-icons/ri";
import { MdPhotoLibrary } from "react-icons/md";
import { FaRegSmile } from "react-icons/fa";
export default function AddPost() {
  const [isPostBoxShow, setIsPostBoxShown] = useState<boolean>(false);

  const showPostBox = () => {
    setIsPostBoxShown(true);
  };
  return (
    <>
      <div className=" mb-4 px-3 bg-white rounded-lg">
        <div className="w-full px-3 py-3 border-b border-b-gray-100 flex md:items-center space-x-3">
          <Image
            alt="Amanuel Ferede"
            src={"/feeds/user.jpg"}
            width={0}
            height={0}
            sizes="100vh"
            className="w-10 h-10 object-cover rounded-full border-2 border-black/40"
          />
          <input
            type="text"
            placeholder="What is on your mind, Amanuel"
            className="w-full outline-none focus:outline-none p-2 bg-gray-50 rounded-3xl placeholder:font-sans pl-5 text-black"
            onFocus={showPostBox}
          ></input>
        </div>

        <div className="flex items-center justify-center space-x-2 py-2">
          <button className="rounded-md hover:bg-gray-100 px-3 flex items-center space-x-2 py-2">
            <RiLiveFill className="w-7 h-7 fill-red-500" />
            <span>Live Video</span>
          </button>
          <button className="rounded-md hover:bg-gray-100 px-3 flex items-center space-x-2 py-2">
            <MdPhotoLibrary className="w-7 h-7 fill-green-500" />
            <span>Photo / Video</span>
          </button>
          <button className="rounded-md hover:bg-gray-100 px-3 flex items-center space-x-2 py-2">
            <FaRegSmile className="w-7 h-7 fill-orange-300" />
            <span>Photo / Video</span>
          </button>
        </div>
      </div>

      {isPostBoxShow && <PostBox onClose={setIsPostBoxShown} />}
    </>
  );
}
