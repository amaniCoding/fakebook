"use client";
import Image from "next/image";

import PostBox from "./post-box";
import { useState } from "react";
import { RiLiveFill } from "react-icons/ri";
import { MdPhotoLibrary } from "react-icons/md";
import { FaRegSmile } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setPostOption, showPostBox } from "@/app/store/slices/user/postSlice";
import { useAppSelector } from "@/app/store/hooks";
import { postOption } from "@/app/types/db/user";
export default function AddPost() {
  const [isPostBoxShow, setIsPostBoxShown] = useState<boolean>(false);
  const dispatch = useDispatch();
  const post = useAppSelector((state) => state.userPost.post);
  const handelShowPostBox = (postOption: postOption) => {
    dispatch(setPostOption(postOption));
    setIsPostBoxShown(true);
    dispatch(showPostBox(true));
  };

  const handelHidePostBox = () => {
    setIsPostBoxShown(false);
    dispatch(showPostBox(false));
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
            value={post}
            onFocus={() => {
              handelShowPostBox("textonly");
            }}
          ></input>
        </div>

        <div className="flex items-center xl:justify-center justify-between space-x-2 py-2">
          <button className="rounded-md hover:bg-gray-100 px-3 flex items-center space-x-2 py-2">
            <RiLiveFill className="w-7 h-7 fill-red-500" />
            <span className="md:block hidden">Live Video</span>
          </button>
          <button
            className="rounded-md hover:bg-gray-100 px-3 flex items-center space-x-2 py-2"
            onClick={() => {
              handelShowPostBox("textwithphoto");
            }}
          >
            <MdPhotoLibrary className="w-7 h-7 fill-green-500" />
            <span className="md:block hidden">Photo / Video</span>
          </button>
          <button className="rounded-md hover:bg-gray-100 px-3 flex items-center space-x-2 py-2">
            <FaRegSmile className="w-7 h-7 fill-orange-300" />
            <span className="md:block hidden">Photo / Video</span>
          </button>
        </div>
      </div>

      {isPostBoxShow && <PostBox onClose={handelHidePostBox} />}
    </>
  );
}
