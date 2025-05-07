"use client";
import { FaLocationDot, FaLock, FaXmark } from "react-icons/fa6";
import Image from "next/image";
import { BsEmojiAstonished } from "react-icons/bs";
import { GrGallery } from "react-icons/gr";
import { FaUserFriends } from "react-icons/fa";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { PiGifFill } from "react-icons/pi";
import { IoIosMore } from "react-icons/io";
// import { createPost, State } from "@/app/libs/actions"
export default function PostBox(props: { onClose: () => void }) {
  //

  return (
    <>
      <section className="bg-gray-100/75 fixed top-0 bottom-0 left-0 right-0 z-[300] overflow-hidden">
        <div className="max-w-[515px] mx-auto shadow-gray-400 shadow-lg rounded-xl z-30 bg-white mt-28">
          <div className="p-3 border-b pb-2 border-b-gray-200 flex items-center justify-between">
            <p className=""></p>
            <p className="font-bold text-xl">Create Post</p>
            <FaXmark
              className="w-10 h-10 p-2 hover:bg-gray-50 bg-gray-100 rounded-full cursor-pointer"
              onClick={() => {
                props.onClose();
              }}
            />
          </div>
          <form className="p-3">
            <div className="flex space-x-3">
              <Image
                alt="Amanuel Ferede"
                src={"/feeds/user.jpg"}
                width={0}
                height={0}
                sizes="100vh"
                className="w-10 h-10 object-center rounded-full border-2 border-blue-700"
              />

              <div className="flex flex-col">
                <p>Amanuel Ferede</p>
                <button className="py-[0.4px] rounded-lg bg-gray-200 flex items-center justify-center space-x-1">
                  <FaLock className="w-3 h-3" />
                  <span>Only me</span>
                </button>
              </div>
            </div>

            <textarea
              placeholder="What's in your mind, Amanuel"
              className="placeholder:text-gray-500 pt-5 placeholder:text-2xl w-full text-3xl block outline-none border-none overflow-y-auto socrollabar resize-none"
              rows={4}
            ></textarea>
            <div className="flex items-center justify-between my-4">
              <div className="w-8 h-8 bg-gradient-to-bl rounded-lg  from-yellow-400 to-green-500"></div>
              <BsEmojiAstonished className="w-7 h-7 fill-gray-600 " />
            </div>

            <div className="mb-4 p-3 border border-gray-300 rounded-lg flex items-center justify-between">
              <p>Add to your post</p>
              <div className="flex items-center space-x-4">
                <GrGallery className="w-6 h-6 text-green-600" />
                <FaUserFriends className="w-6 h-6 fill-blue-600" />
                <HiOutlineEmojiHappy className="w-6 h-6 text-yellow-600" />
                <FaLocationDot className="w-6 h-6 fill-red-600" />
                <PiGifFill className="w-6 h-6 fill-green-600" />
                <IoIosMore className="w-6 h-6 fill-gray-600" />
              </div>
            </div>
            <button className="w-full text-center py-2 bg-gray-300 text-white rounded-md">
              Post
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
