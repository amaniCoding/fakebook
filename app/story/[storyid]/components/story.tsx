import { BiPlus, BiSolidLike } from "react-icons/bi";

import Image from "next/image";
import { IoMdHeart } from "react-icons/io";
import { BsEmojiSmileFill, BsFillEmojiSurpriseFill } from "react-icons/bs";
import { FaXmark } from "react-icons/fa6";
import { QueryResultRow } from "@vercel/postgres";
import Stories from "./stories";
import { fetchStoryPhotos } from "@/app/libs/data/user";
import Link from "next/link";

export default async function Story(props: {
  stories: QueryResultRow[];
  storyid: string;
}) {
  const story = props.stories.find((story) => {
    return story.storyid === props.storyid;
  });
  const storyId = story?.storyid;

  const storyPhoto = await fetchStoryPhotos(storyId);
  return (
    <div className="story">
      <div className="w-[26%] bg-white fixed top-0 left-0 bottom-0 pt-16">
        <div className="h-screen overflow-auto p-3">
          <div className="w-full flex items-center space-x-1 mb-3">
            <Link href="/">
              <FaXmark className="w-11 h-11 text-black bg-gray-200 p-3 rounded-full" />
            </Link>
            <p className="text-xl font-bold mb-3">Stories</p>
          </div>
          <div className="flex items-center space-x-3">
            <p>Active</p>
            <p>Settings</p>
          </div>
          <p className="font-bold mb-3 mt-3">Your Story</p>
          <div className="flex items-center space-x-3 mb-3">
            <BiPlus className="w-14 h-14 rounded-full p-3 bg-gray-100" />
            <div className="flex flex-col">
              <p>Create a story</p>
              <p>Share a photo or write something</p>
            </div>
          </div>
          <p className="text-lg font-bold mb-3">All stories</p>

          <Stories stories={props.stories} />
        </div>
      </div>
      <div className="w-[74%] bg-black h-screen ml-[26%] pt-[4.5rem]">
        <div className="w-full h-[85%] flex items-center justify-center">
          <div className="w-1/3 bg-blue-400 h-full rounded-xl">
            <Image
              alt="Amanuel Ferede"
              src={storyPhoto[0].photo}
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
    </div>
  );
}
