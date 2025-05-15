"use client";
import { FaLocationDot, FaLock, FaXmark } from "react-icons/fa6";
import Image from "next/image";
import { BsEmojiAstonished } from "react-icons/bs";
import { GrGallery } from "react-icons/gr";
import { FaUserFriends } from "react-icons/fa";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { PiGifFill } from "react-icons/pi";
import { IoIosMore } from "react-icons/io";
import {
  setMarginTop,
  setPost,
  setPostOption,
  setRows,
} from "@/app/store/slices/user/postSlice";
import React, {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { postOption } from "@/app/types/db/user";
import FileViewer from "./file-viewer";
// import { createPost, State } from "@/app/libs/actions"
export default function PostBox(props: { onClose: () => void }) {
  const dispatch = useAppDispatch();
  const post = useAppSelector((state) => state.userPost.post);
  const postOption = useAppSelector((state) => state.userPost.postOption);
  const rows = useAppSelector((state) => state.userPost.rows);
  const marginTop = useAppSelector((state) => state.userPost.marginTop);
  const [postFromPostBox, setpostFromPostBox] = useState<string>(post);

  const [postOptionFromPostBox, setpostOptionFromPostBox] =
    useState<postOption>(postOption);

  const [rowsFromPostBox, setrowsFromPostBox] = useState<number>(rows);
  const [marginTopFromPostBox, setmarginTopFromPostBox] =
    useState<number>(marginTop);

  const [showFiles, setshowFiles] = useState<boolean>(false);
  const [filesToView, setFilesToView] = useState<string[]>([]);

  const input = useRef<HTMLInputElement>(null);

  const showDialog = () => {
    input.current?.click();
  };
  const choosePhoto = () => {
    setpostOptionFromPostBox("textwithphoto");
  };

  const renderPhoto = () => {
    if (postOptionFromPostBox === "textonly") {
      return (
        <div>
          <textarea
            placeholder="What's in your mind, Amanuel"
            className="placeholder:text-gray-500 py-2  placeholder:text-2xl text-3xl outline-none pl-3 resize-none overflow-y-hidden border-none outline-0 w-full"
            value={postFromPostBox}
            onChange={onChangePost}
            onKeyDown={onKeyDownPostText}
            rows={rowsFromPostBox}
          ></textarea>
          <div className={`flex items-center justify-between my-4 px-3 `}>
            <div
              className={`w-8 h-8 bg-gradient-to-bl rounded-lg  from-yellow-400 to-green-500 ${
                rowsFromPostBox <= 3 ? "visible" : "invisible"
              }`}
            ></div>
            <BsEmojiAstonished className="w-7 h-7 fill-gray-600 " />
          </div>
        </div>
      );
    } else if (postOptionFromPostBox === "textwithphoto" && showFiles) {
      return <FileViewer files={filesToView} />;
    } else if (postOptionFromPostBox === "textwithphoto") {
      return (
        <div>
          <textarea
            className="pl-3 resize-none overflow-y-hidden border-none outline-0 w-full"
            placeholder="What is in your mind, Amanuel"
            value={postFromPostBox}
            onChange={onChangePost}
            onKeyDown={onKeyDownPost}
            rows={rowsFromPostBox}
          ></textarea>
          <input
            ref={input}
            multiple
            type="file"
            onChange={onChangeFile}
            className="relative hidden"
          ></input>
          <div className="p-2 w-full relative border border-gray-50 rounded-xl group">
            <FaXmark
              className="p-2 w-8 z-[400] peer  h-8  border border-gray-300 absolute right-4 top-4 cursor-pointer bg-white rounded-full hover:bg-gray-100"
              onClick={() => setpostOptionFromPostBox("textonly")}
            />
            <div
              className={`cursor-pointer peer-hover:bg-gray-50 peer py-[3rem] flex items-center justify-center rounded-xl bg-gray-50 group-hover:bg-gray-100`}
              onClick={showDialog}
            >
              <div className=" flex flex-col space-y-1.5 items-center justify-center">
                <GrGallery className="w-6 h-6 text-green-600 cursor-pointer" />
                <p className="text-sm font-medium">Add photos/videos</p>
                <p className="text-gray-600 text-sm">or drag and drop</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (window.FileReader) {
      const filesToView: string[] = [];
      const files = e.target.files;

      if (files) {
        for (const x in files) {
          const file = files[x];
          console.log(file);
          if (file) {
            const fr = new FileReader();
            fr.onloadend = (e: ProgressEvent<FileReader>) => {
              filesToView.push(e.target?.result as string);
              setFilesToView(filesToView);
              setshowFiles(true);
            };
            try {
              fr.readAsDataURL(file);
            } catch {}
          }
        }
      }
      //console.log(files![0]);
    }
  };

  useEffect(() => {
    console.log("FILES TO VIEW", filesToView.length);
  }, [filesToView]);

  const onChangePost = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setpostFromPostBox(e.target.value);
    dispatch(setPost(e.target.value));
  };

  const onKeyDownPost = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      setrowsFromPostBox(rowsFromPostBox + 1);
    } else if (e.key === "Backspace") {
      if (rowsFromPostBox <= 1) {
      } else {
        setrowsFromPostBox(rowsFromPostBox - 1);
      }
      //even if the rows is greater than one, it should only minus one from rows
    }
  };

  const getClassName = () => {
    if (postOptionFromPostBox === "textonly") {
      return {
        marginTop: `${marginTopFromPostBox}rem`,
      };
    } else {
      return {
        marginTop: "3.5rem",
      };
    }
  };
  const onKeyDownPostText = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      setrowsFromPostBox(rowsFromPostBox + 1);

      if (marginTopFromPostBox <= 3.5) {
      } else {
        setmarginTopFromPostBox(marginTopFromPostBox - 1);
      }
    } else if (e.key === "Backspace") {
      if (rowsFromPostBox <= 1) {
      } else {
        setrowsFromPostBox(rowsFromPostBox - 1);
      }

      if (marginTopFromPostBox >= 6) {
      } else {
        /**
         * The height of postBox will be pushed when the it's height becomes less
         * than it's maximum height (when the scroll-bar invisible)
         *
         *
         * But when the postBox height increases passing it's maximum height
         * depending on rows of textarea, as backspace pressed it's
         * margin pushes it down, that should not happen.
         *
         * updating it's marginTop should have effect when  it's height
         * is less than it's maximum height ! How exactly i know, it's
         * maximum height reached, well, by row count ...
         *
         *
         * then it's marginTop and height will be adjusted together.
         */
        if (rowsFromPostBox <= 7) {
          setmarginTopFromPostBox(marginTopFromPostBox + 1);
        }
      }
    }
  };

  useEffect(() => {
    if (!postFromPostBox) {
      setrowsFromPostBox(1);
    }
  }, [postFromPostBox]);

  return (
    <>
      <section className="bg-gray-100/75 fixed top-0 bottom-0 left-0 right-0 z-[300] overflow-hidden">
        <div
          className={`max-w-[517px] mx-auto shadow-gray-400 shadow-lg rounded-xl bg-white 
            `}
          style={getClassName()}
        >
          <div className="p-3 border-b pb-2 border-b-gray-200 flex items-center justify-between">
            <p className=""></p>
            <p className="font-bold text-xl">Create Post</p>
            <FaXmark
              className="w-10 h-10 p-2 hover:bg-gray-50 bg-gray-100 rounded-full cursor-pointer"
              onClick={() => {
                props.onClose();
                dispatch(setRows(rowsFromPostBox));
                dispatch(setMarginTop(marginTopFromPostBox));
                dispatch(setPostOption("textwithphoto"));
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
                postOptionFromPostBox === "textonly"
                  ? "max-h-[20.5rem]"
                  : "max-h-80"
              } overflow-y-auto`}
            >
              {renderPhoto()}
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
              disabled={postFromPostBox ? true : false}
              className={`w-full text-center py-2 text-white rounded-md ${
                !postFromPostBox ? "bg-gray-300" : "bg-blue-600"
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
