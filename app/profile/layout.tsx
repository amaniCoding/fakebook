import NavBar from "@/app/ui/home/sections/nav-bar";
import type { Metadata } from "next";
import Image from "next/image";
import { FaBusinessTime } from "react-icons/fa6";
import { GrTechnology } from "react-icons/gr";
import {
  MdEventNote,
  MdOutlineAppShortcut,
  MdOutlineLiveTv,
} from "react-icons/md";
import AddPost from "../ui/home/feed/add-post";
import Link from "next/link";
import FeedItems from "../ui/home/feed/feed-items";
export const metadata: Metadata = {
  title: "Amanuel Ferede",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <section className="bg-slate-100 mt-[66px]">
          <div className="w-full bg-white">
            <div className="max-w-screen-lg mx-auto">
              <div className="w-full h-[60vh] pb-1 relative bg-[url('/feeds/5.jpg')] bg-no-repeat bg-cover"></div>

              <div className="w-full px-3 py-6 bg-white relative">
                <Image
                  className="w-40 h-40 rounded-full object-center absolute -top-1/2 left-10 border-4 border-white"
                  alt="Amanuel Ferede"
                  src={"/feeds/4.jpg"}
                  width={0}
                  height={0}
                  sizes="100vh"
                />

                <div className="p-3 flex items-center md:ml-48 space-x-5 md:mt-0 mt-12">
                  <div>
                    <p className="text-lg font-bold">Amanuel Ferede</p>
                    <p>972 followers</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Link
                      href={"/#"}
                      className="block px-3 py-2 bg-gray-200 rounded-lg"
                    >
                      Follow
                    </Link>
                    <Link
                      href={"/#"}
                      className="block px-3 py-2 bg-blue-500 text-white rounded-lg"
                    >
                      Follow
                    </Link>
                  </div>
                </div>
              </div>

              <div className="w-full bg-white">
                <div className="flex items-center max-w-[900px] mx-auto border-t-2 border-t-slate-300 p-2  mb-5">
                  <div className="p-2 flex items-center justify-center mb-1 space-x-2 hover:bg-gray-200 rounded-l-md rounded-b-md cursor-pointer w-full">
                    <MdOutlineLiveTv className="w-6 h-6" />
                    <span>Vidoes</span>
                  </div>
                  <div className="p-2 flex items-center justify-center mb-1 space-x-2 hover:bg-gray-200 rounded-l-md rounded-b-md cursor-pointer w-full">
                    <FaBusinessTime className="w-6 h-6" />
                    <span>Jobs</span>
                  </div>
                  <div className="p-2 flex items-center justify-center mb-1 space-x-2 hover:bg-gray-200 rounded-l-md rounded-b-md cursor-pointer w-full">
                    <MdEventNote className="w-6 h-6" />
                    <span>Events</span>
                  </div>
                  <div className="p-2 flex items-center justify-center mb-1 space-x-2 hover:bg-gray-200 rounded-l-md rounded-b-md cursor-pointer w-full">
                    <MdOutlineAppShortcut className="w-6 h-6" />
                    <span>Shorts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-screen-lg mx-auto">
            <div className="flex md:space-x-5 max-w-[900px] mx-auto">
              <div className="md:w-[40%] md:block hidden p-3 bg-white rounded-lg sticky top-20 h-screen">
                <div>
                  <p className="p-1 bg-slate-100 my-1 text-sm">
                    Full Stack Software Engineer at Andela
                  </p>
                  <p>
                    Knows React, Next.js, Tailwind.css, HTML, CSS, JAVASCRIPT
                    and more
                  </p>
                  <div className="p-2 flex items-center mb-1 space-x-2 hover:bg-gray-200 rounded-l-md rounded-b-md cursor-pointer w-full">
                    <MdOutlineLiveTv className="w-6 h-6" />
                    <span>Vidoes</span>
                  </div>
                  <div className="p-2 flex items-center mb-1 space-x-2 hover:bg-gray-200 rounded-l-md rounded-b-md cursor-pointer w-full">
                    <FaBusinessTime className="w-6 h-6" />
                    <span>Jobs</span>
                  </div>
                  <div className="p-2 flex items-center mb-1 space-x-2 hover:bg-gray-200 rounded-l-md rounded-b-md cursor-pointer w-full">
                    <MdEventNote className="w-6 h-6" />
                    <span>Events</span>
                  </div>
                  <div className="p-2 flex items-center mb-1 space-x-2 hover:bg-gray-200 rounded-l-md rounded-b-md cursor-pointer w-full">
                    <GrTechnology className="w-6 h-6" />
                    <span>Tech Companies</span>
                  </div>
                  <div className="p-2 flex items-center mb-1 space-x-2 hover:bg-gray-200 rounded-l-md rounded-b-md cursor-pointer w-full">
                    <MdOutlineAppShortcut className="w-6 h-6" />
                    <span>Shorts</span>
                  </div>
                </div>
              </div>
              <div className="md:w-[60%] w-full rounded-lg">
                <AddPost />
                <FeedItems />
                {children}
              </div>
            </div>
          </div>
        </section>
      </body>
    </html>
  );
}
