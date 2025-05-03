"use client";
import { BiSolidLike } from "react-icons/bi";
import Image from "next/image";
import { IoMdHeart } from "react-icons/io";
import { BsEmojiSmileFill, BsFillEmojiSurpriseFill } from "react-icons/bs";
import { QueryResultRow } from "@vercel/postgres";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useState } from "react";
export default function StoryViewer(props: {
  availabePhotos: QueryResultRow[];
  allStoriesWithPhotos: QueryResultRow;
}) {
  const [curreIndex, setCurreIndex] = useState<number>(0);
  const handelNext = () => {
    if (curreIndex >= props.availabePhotos.length - 1) {
      return;
    } else {
      setCurreIndex(curreIndex + 1);
    }
  };

  const handelPrev = () => {
    if (curreIndex <= 0) {
      return;
    }
    setCurreIndex(curreIndex - 1);
  };

  return (
    <div className="w-[74%] bg-black relative h-screen ml-[26%] pt-[4.5rem]">
      <MdNavigateNext
        onClick={handelNext}
        className="w-12 h-12 text-gray-400 flex items-center justify-center absolute top-1/2 right-64 z-20 bg-white outline outline-gray-500 cursor-pointer rounded-full p-2  hover:fill-200  transition duration-300 ease-out "
      />
      <MdNavigateBefore
        onClick={handelPrev}
        className="w-12 h-12 text-gray-400 flex items-center justify-center absolute top-1/2 left-64 z-20 bg-white outline outline-gray-500 cursor-pointer rounded-full p-2 hover:fill-200  transition duration-300 ease-out"
      />
      <div className="w-full h-[85%] flex items-center justify-center">
        <div className="w-1/3 bg-black h-full rounded-xl">
          <Image
            alt="Amanuel Ferede"
            src={props.availabePhotos[curreIndex]?.photo || null}
            width={0}
            height={0}
            sizes="100vh"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>

      <div className="flex p-3 items-center justify-center space-x-6">
        <input
          className="p-3 border-2 placeholder:text-white border-white rounded-3xl"
          placeholder="Reply ..."
        ></input>
        <div className="flex items-center space-x-2">
          <BiSolidLike className="w-12 h-12 text-white rounded-full p-3 bg-blue-600" />
          <IoMdHeart className="w-12 h-12 text-white rounded-full p-3 bg-pink-600" />
          <BsEmojiSmileFill className="w-12 h-12 text-white rounded-full fill-yellow-600" />
          <BsFillEmojiSurpriseFill className="w-12 h-12 text-white rounded-full fill-yellow-600 " />
        </div>
      </div>
    </div>
  );
}
