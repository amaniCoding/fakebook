import NavBar from "@/app/ui/home/sections/nav-bar";
import StorySkeleton from "./components/skeletons/story";
import { FaXmark } from "react-icons/fa6";

export default function Loading() {
  return (
    <>
      <NavBar />
      <div className="story">
        <div className="w-[26%] bg-white fixed top-0 left-0 bottom-0 pt-16">
          <div className="h-screen overflow-auto p-3">
            <div className="w-full flex items-center space-x-1 mb-3">
              <FaXmark className="w-11 h-11 text-black bg-gray-200 p-3 rounded-full" />
              <p className="text-xl font-bold mb-3">Stories</p>
            </div>
            <div className="flex items-center space-x-3">
              <p>Active</p>
              <p>Settings</p>
            </div>
            <p className="font-bold mb-3 mt-3">Your Story</p>
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-14 h-14 rounded-full p-3 bg-gray-100 animate-pulse"></div>
              <div className="flex flex-col">
                <p className="w-44 h-4 mb-3 rounded-xl animate-pulse bg-gray-100"></p>
                <p className="w-52 h-4 animate-pulse rounded-xl bg-gray-100"></p>
              </div>
            </div>
            <p className="text-lg font-bold mb-3">All stories</p>

            <StorySkeleton />
          </div>
        </div>
        <div className="w-[74%] bg-black h-screen ml-[26%] pt-[4.5rem]">
          <div className="w-full h-[85%] flex items-center justify-center">
            <div className="w-1/3 bg-black h-full rounded-xl"></div>
          </div>
        </div>
      </div>
    </>
  );
}
