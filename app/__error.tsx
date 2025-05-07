"use client";

import Link from "next/link";
import NavBar from "./ui/home/sections/nav-bar";
import SideSection from "./ui/home/sections/side-section";
export default function Error() {
  return (
    <section className="bg-gray-100 md:pt-[73px] pt-[55px] h-screen overflow-y-auto">
      <NavBar />
      <div className="flex">
        <SideSection />
        <div className="xl:w-[40%] lg:w-[95%] xl:ml-[30%] lg:ml-[30%] w-full">
          <div className="wrong shadow-sm w-full rounded-xl ">
            <div className="flex items-center rounded-xl justify-center w-full h-60 p-3 bg-white mb-4">
              <div className="flex flex-col space-y-6">
                <p className="text-xl font-bold text-red-600">
                  Something went wrong
                </p>
                <Link
                  href={`/`}
                  className="block text-xl px-5 py-3 text-center bg-blue-600 rounded-xl text-white outline-none"
                >
                  Try Again
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`xl:w-[30%] opacity-40 [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 w-full xl:pl-32 xl:block hidden fixed right-0 bottom-0 top-0 h-screen pt-20 overflow-y-auto
  [&::-webkit-scrollbar]:w-0"
  `}
        ></div>
      </div>
    </section>
  );
}
