"use client";

import NavBar from "@/app/ui/home/sections/nav-bar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Error() {
  const pathName = usePathname();
  return (
    <>
      <NavBar />
      <div className="w-full h-screen flex items-center justify-center bg-gray-50">
        <div className="w-md flex flex-col items-center">
          <p className="text-gray-600 font-bold text-xl text-center">
            This page isn&apos;t available right now
          </p>
          <p className="text-gray-500 text-lg text-center">
            This may be because of a technical error that we&apos;re working to
            get fixed. Try reloading this page.
          </p>
          <Link
            href={pathName}
            className="block w-40 mt-5 py-2 px-4 text-center text-white rounded-md bg-blue-600"
          >
            Reload Page
          </Link>
        </div>
      </div>
    </>
  );
}
