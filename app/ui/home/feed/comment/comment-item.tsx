"use client";
import { useState } from "react";
import { FaComment } from "react-icons/fa6";
import { IoHeartCircle } from "react-icons/io5";
import CommentBox from "./comment-box";
import { FaRegComment } from "react-icons/fa";
import { PiShareFat, PiShareFatFill, PiThumbsUp } from "react-icons/pi";
import { IoMdThumbsUp } from "react-icons/io";

export default function CommentItem() {
  const [toShowCommentBox, setToShowCommentBox] = useState<boolean>(false);

  const handelShowCommentBox = () => {
    setToShowCommentBox(true);
  };

  return (
    <>
      {toShowCommentBox && <CommentBox onClose={setToShowCommentBox} />}

      <div className="flex items-center px-3 justify-between border-b py-2 border-b-gray-300">
        <div className="flex items-center space-x">
          <div className="flex -space-x-1">
            <IoMdThumbsUp className="w-6 h-6 fill-blue-500" />
            <IoHeartCircle className="w-6 h-6 fill-pink-500" />
          </div>
          <p>456</p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <p>345</p>
            <FaComment className="w-5 h-5 fill-gray-500" />
          </div>

          <div className="flex items-center space-x-1 fill-gray-500">
            <p>34</p>
            <PiShareFatFill className="w-5 h-5 fill-gray-500" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between px-2 py-1">
        <div className="flex items-center space-x-2 grow justify-center hover:bg-slate-50 px-3 py-1 rounded-md cursor-pointer">
          <PiThumbsUp className="w-6 h-6" />
          <span>Like</span>
        </div>
        <div
          className="flex items-center space-x-2 grow justify-center hover:bg-slate-50 px-3 py-1 rounded-md cursor-pointer"
          onClick={handelShowCommentBox}
        >
          <FaRegComment className="w-6 h-6" />
          <span>Comment</span>
        </div>

        <div className="flex items-center space-x-2 grow justify-center hover:bg-slate-50 px-3 py-1 rounded-md cursor-pointer">
          <PiShareFat className="w-6 h-6" />
          <span>Share</span>
        </div>
      </div>
    </>
  );
}
