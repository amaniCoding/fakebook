"use client";
import { FaLocationDot, FaLock, FaXmark } from "react-icons/fa6";
import Image from "next/image";
import { BsEmojiAstonished } from "react-icons/bs";
import { GrGallery } from "react-icons/gr";
import { FaUserFriends } from "react-icons/fa";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { PiGifFill } from "react-icons/pi";
import { IoIosMore } from "react-icons/io";
import React, { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
// import { createPost, State } from "@/app/libs/actions"
export default function PostBox(props: { onClose: () => void }) {
  const [isPostButtonDisabled, setPostButtonDisabled] =
    useState<boolean>(false);
  const [post, setPost] = useState<string>("");

  const [postOption, setPostOption] = useState<string>("textonly");

  const [rows, setRows] = useState<number>(1);

  const [postBoxTextOnlyMarginTop, setPostBoxTextOnlyMarginTop] =
    useState<number>(6.5);
  const input = useRef<HTMLInputElement>(null);

  const showDialog = () => {
    input.current?.click();
  };
  const choosePhoto = () => {
    setPostOption("textandphoto");
  };

  const onChangePost = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setPost(e.target.value);
    if (e.target.value) {
      setPostButtonDisabled(true);
    } else {
      setPostButtonDisabled(false);
    }
  };

  const onKeyDownPost = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      setRows(rows + 1);
    } else if (e.key === "Backspace") {
      if (rows <= 1) {
      } else {
        setRows(rows - 1);
      }
      //even if the rows is greater than one, it should only minus one from rows
    }
  };

  const onKeyDownPostText = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      setRows(rows + 1);

      if (postBoxTextOnlyMarginTop <= 3.5) {
      } else {
        setPostBoxTextOnlyMarginTop(postBoxTextOnlyMarginTop - 1);
      }
    } else if (e.key === "Backspace") {
      if (rows <= 1) {
      } else {
        setRows(rows - 1);
      }

      if (postBoxTextOnlyMarginTop >= 6.5) {
      } else {
        if (rows <= 7) {
          setPostBoxTextOnlyMarginTop(postBoxTextOnlyMarginTop + 1);
        }
        // setPostBoxTextOnlyMarginTop(postBoxTextOnlyMarginTop + 1);
      }
    }
  };

  return (
    <>
      <section className="bg-gray-100/75 fixed top-0 bottom-0 left-0 right-0 z-[300] overflow-hidden">
        <div
          className={`max-w-[517px] mx-auto shadow-gray-400 shadow-lg rounded-xl bg-white ${
            postOption === "textonly"
              ? `mt-[${postBoxTextOnlyMarginTop}rem]`
              : `mt-[3.5rem]`
          }`}
        >
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

              <div className="flex flex-col pb-3 space-y-1">
                <p>Amanuel Ferede</p>
                <button className="py-[0.4px] rounded-lg bg-gray-200 flex items-center justify-center space-x-1">
                  <FaLock className="w-3 h-3" />
                  <span>Only me</span>
                </button>
              </div>
            </div>

            <div
              className={`${
                postOption === "textonly" ? "max-h-80" : "max-h-80"
              } overflow-y-auto`}
            >
              {postOption === "textonly" ? (
                <div>
                  <textarea
                    placeholder="What's in your mind, Amanuel"
                    className="placeholder:text-gray-500 pt-3  placeholder:text-2xl text-3xl outline-none pl-3 resize-none overflow-y-hidden border-none outline-0 w-full"
                    value={post}
                    onChange={onChangePost}
                    onKeyDown={onKeyDownPostText}
                    rows={rows}
                  ></textarea>
                  <div
                    className={`flex items-center justify-between my-4 ${
                      rows <= 3 ? "visible" : "invisible"
                    }`}
                  >
                    <div className="w-8 h-8 bg-gradient-to-bl rounded-lg  from-yellow-400 to-green-500"></div>
                    <BsEmojiAstonished className="w-7 h-7 fill-gray-600 " />
                  </div>
                </div>
              ) : (
                <div>
                  <textarea
                    className="pl-3 resize-none overflow-y-hidden border-none outline-0 w-full"
                    placeholder="What is in your mind, Amanuel"
                    value={post}
                    onChange={onChangePost}
                    onKeyDown={onKeyDownPost}
                    rows={rows}
                  ></textarea>
                  <input
                    ref={input}
                    multiple
                    type="file"
                    className="relative hidden"
                  ></input>
                  <div className="p-2 w-full relative border border-gray-50 rounded-xl group">
                    <FaXmark
                      className="p-2 w-8 z-[400] peer  h-8  border border-gray-300 absolute right-4 top-4 cursor-pointer bg-white rounded-full hover:bg-gray-100"
                      onClick={() => setPostOption("textonly")}
                    />
                    <div
                      className={`cursor-pointer peer-hover:bg-gray-50 peer py-[3rem] flex items-center justify-center rounded-xl bg-gray-50 group-hover:bg-gray-100`}
                      onClick={showDialog}
                    >
                      <div className=" flex flex-col space-y-1.5 items-center justify-center">
                        <GrGallery className="w-6 h-6 text-green-600 cursor-pointer" />
                        <p className="text-sm font-medium">Add photos/videos</p>
                        <p className="text-gray-600 text-sm">
                          or drag and drop
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mb-4 p-3 border border-gray-300 rounded-lg flex items-center justify-between">
              <p>Add to your post</p>
              <div className="flex items-center space-x-4">
                <GrGallery
                  className="w-6 h-6 text-green-600 cursor-pointer"
                  onClick={choosePhoto}
                />
                <FaUserFriends className="w-6 h-6 fill-blue-600" />
                <HiOutlineEmojiHappy className="w-6 h-6 text-yellow-600" />
                <FaLocationDot className="w-6 h-6 fill-red-600" />
                <PiGifFill className="w-6 h-6 fill-green-600" />
                <IoIosMore className="w-6 h-6 fill-gray-600" />
              </div>
            </div>
            <button
              disabled={isPostButtonDisabled}
              className={`w-full text-center py-2 text-white rounded-md ${
                !isPostButtonDisabled ? "bg-gray-300" : "bg-blue-600"
              }`}
            >
              Post
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
