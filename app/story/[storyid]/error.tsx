"use client";
import Image from "next/image";
import { FaXmark } from "react-icons/fa6";
import StorySkeleton from "./components/skeletons/story";
import Link from "next/link";
import { usePathname } from "next/navigation";
import StoryHeaderSkeloton from "@/app/ui/skeletons/story-header";

export default function Error() {
  const pathname = usePathname();
  return (
    <>
      <div className="story">
        <div className="w-[26%] bg-white fixed top-0 left-0 bottom-0 p-1">
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
          <div className="h-[90vh] overflow-auto p-3">
            <StoryHeaderSkeloton />
            <StorySkeleton />
          </div>
        </div>
        <div className="w-[74% bg-gray-200 relative h-screen ml-[26%] pt-2 flex items-center justify-center">
          <div className="flex flex-col space-y-2">
            <p className="text-xl font-bold text-red-600">
              Something went wrong
            </p>
            <Link
              href={`${pathname}`}
              className="py-2 px-5 block rounded-xl text-center bg-blue-600 text-white"
            >
              Try again
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
