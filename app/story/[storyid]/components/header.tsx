import { FaXmark } from "react-icons/fa6";
import Link from "next/link";
import { BiPlus } from "react-icons/bi";

export default function StoryHeader() {
  return (
    <>
      <p className="text-lg font-bold mb-3">All stories</p>
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
    </>
  );
}
