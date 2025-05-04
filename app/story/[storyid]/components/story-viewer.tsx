"use client";
import { BiSolidLike } from "react-icons/bi";
import Image from "next/image";
import { IoMdHeart } from "react-icons/io";
import { BsEmojiSmileFill, BsFillEmojiSurpriseFill } from "react-icons/bs";
import { QueryResultRow } from "@vercel/postgres";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useState } from "react";
import { useAppSelector } from "@/app/store/hooks";
import { setCurrentStory } from "@/app/store/slices/storySlice";
import { useDispatch } from "react-redux";
export default function StoryViewer(props: {
  currentStoryPhotos: QueryResultRow[];
  currentStory: QueryResultRow;
  storyid: string;
}) {
  const currentStory = useAppSelector((state) => state.stores.currentStory);
  const stories = useAppSelector((state) => state.stores.stories);
  const dispatch = useDispatch();
  const _currentStoryIndex = stories.findIndex((story) => {
    return story.storyid === currentStory.storyid;
  });

  const [currentStoryIndex, setcurrentStoryIndex] =
    useState<number>(_currentStoryIndex);

  const [currentPhotoIndex, setcurrentPhotoIndex] = useState<number>(0);

  const handelNext = () => {
    alert(currentPhotoIndex);
    if (currentPhotoIndex >= props.currentStoryPhotos.length - 1) {
      setcurrentStoryIndex(currentStoryIndex + 1);
      dispatch(setCurrentStory(currentStoryIndex + 1));
    } else {
      setcurrentPhotoIndex(currentPhotoIndex + 1);
    }
  };

  const handelPrev = () => {
    if (currentPhotoIndex <= 0) {
      return;
    }
    setcurrentPhotoIndex(currentPhotoIndex - 1);
  };

  return (
    <div className="w-[74%] bg-black relative h-screen ml-[26%] pt-2">
      <MdNavigateNext
        onClick={handelNext}
        className="w-12 h-12 text-gray-400 flex items-center justify-center absolute top-1/2 right-64 z-20 bg-white outline outline-gray-500 cursor-pointer rounded-full p-2  hover:fill-200  transition duration-300 ease-out "
      />
      <MdNavigateBefore
        onClick={handelPrev}
        className="w-12 h-12 text-gray-400 flex items-center justify-center absolute top-1/2 left-64 z-20 bg-white outline outline-gray-500 cursor-pointer rounded-full p-2 hover:fill-200  transition duration-300 ease-out"
      />
      <div className="w-full h-[85%] flex items-center justify-center">
        <div className="w-1/3 bg-black h-full rounded-xl relative">
          <div className="absolute flex items-center justify-between p-2">
            <div className="flex items-center space-x-2">
              <Image
                alt="Amanuel Ferede"
                src={props.currentStory?.profilepic}
                width={0}
                height={0}
                sizes="100vh"
                className="w-10 h-10 rounded-full flex-none object-cover"
              />
              <p className="text-white">
                {props.currentStory?.fname} {props.currentStory?.lname}
              </p>
            </div>
          </div>
          <Image
            alt="Amanuel Ferede"
            src={props.currentStoryPhotos[currentPhotoIndex]?.photo}
            width={0}
            height={0}
            sizes="100vh"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>

      <div className="flex p-3 items-center justify-center space-x-6">
        <input
          className="p-2 border-2 placeholder:text-white border-white rounded-3xl"
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
