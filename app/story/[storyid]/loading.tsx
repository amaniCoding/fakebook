import StoryHeaderSkeloton from "@/app/ui/skeletons/story-header";
import StorySkeleton from "./components/skeletons/story";
import Link from "next/link";
import { FaXmark } from "react-icons/fa6";
import Image from "next/image";

export default function Loading() {
  return (
    <>
      <div className="story">
        <div className="w-[26%] bg-white fixed top-0 left-0 bottom-0">
          <div className="flex items-center space-x-2 p-3 border-b border-b-gray-200">
            <Link href="/">
              <FaXmark className="w-11 h-11 p-3 bg-gray-200 rounded-full" />
            </Link>
            <Image
              alt="Amanuel Ferede"
              src="/feeds/logoc.png"
              width={0}
              height={0}
              sizes="100vh"
              className="w-11 h-11 object-cover rounded-full"
            />
          </div>
          <div className="h-screen overflow-auto p-3">
            <StoryHeaderSkeloton />
            <StorySkeleton />
          </div>
        </div>
        <div className="w-[74%] bg-black relative h-screen ml-[26%] pt-2 flex items-center justify-center">
          <div className="w-12 h-12 text-gray-400 animate-pulse flex items-center justify-center absolute top-1/2 right-64 z-20 bg-white outline outline-gray-500 cursor-pointer rounded-full p-2  hover:fill-200  transition duration-300 ease-out " />
          <div className="w-12 h-12 text-gray-400 animate-pulse flex items-center justify-center absolute top-1/2 left-64 z-20 bg-white outline outline-gray-500 cursor-pointer rounded-full p-2 hover:fill-200  transition duration-300 ease-out" />
          <div className="w-1/3 h-full rounded-xl">
            <div className="w-full h-[85%] bg-gray-700 rounded-xl animate-pulse relative">
              <div className="absolute left-2 top-2 flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full flex-none bg-gray-300 animate-pulse" />
                <p className="w-36 h-4 rounded-xl bg-gray-300 animate-pulse"></p>
              </div>
            </div>

            <div className="flex p-3 items-center justify-center space-x-6">
              <div className="p-6 w-60 bg-gray-400 animate-pulse rounded-3xl"></div>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 text-white rounded-full p-3 bg-gray-300 animate-pulse" />
                <div className="w-10 h-10 text-white rounded-full p-3 bg-gray-300 animate-pulse" />
                <div className="w-10 h-10 text-white rounded-full bg-gray-300 animate-pulse" />
                <div className="w-10 h-10 text-white rounded-full bg-gray-300 animate-pulse " />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
