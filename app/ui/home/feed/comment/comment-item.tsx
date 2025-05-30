"use client";
import { useActionState, useState } from "react";
import { FaComment } from "react-icons/fa6";
import CommentBox from "./comment-box";
import { FaRegComment } from "react-icons/fa";
import { PiShareFat, PiShareFatFill, PiThumbsUp } from "react-icons/pi";
import { useDispatch } from "react-redux";
import ReactionIcons from "../reaction-icons";
import { LikeAction } from "@/app/libs/actions/user/actions";
import { LikeActionState } from "@/app/libs/actions/user/types";
import { Posts } from "@/app/libs/data/user/types";
import { showCommentBox } from "@/app/store/slices/user/commentSlice";

export default function CommentItem({ post }: { post: Posts }) {
  const [toShowCommentBox, setToShowCommentBox] = useState<boolean>(false);
  const initialState: LikeActionState = {
    isLiked: false,
    loading: true,
  };
  const [state, likeAction] = useActionState(LikeAction, initialState);
  const likeActionWithId = likeAction.bind(null, post.post.postId);
  const dispatch = useDispatch();
  const handelShowCommentBox = () => {
    setToShowCommentBox(true);
    dispatch(showCommentBox(true));
  };

  const handelHideCommentBox = () => {
    setToShowCommentBox(false);
    dispatch(showCommentBox(false));
  };

  return (
    <>
      {toShowCommentBox && (
        <CommentBox post={post} onClose={handelHideCommentBox} />
      )}

      <div className="flex items-center px-3 justify-between border-b py-2 border-b-gray-300">
        <div className="flex items-center space-x">
          <div className="flex -space-x-1">
            {post.reactionGroup.map((gr, index) => {
              return (
                <ReactionIcons key={index} reactiontype={gr.reactiontype} />
              );
            })}
          </div>
          <p>
            {state.loading ? null : post.reactions > 0 ? "You and" : "You"}{" "}
            {post.reactions > 0 ? post.reactions : null}
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <p>{post.comments > 0 ? post.comments : null}</p>
            <FaComment className="w-5 h-5 fill-gray-500" />
          </div>

          <div className="flex items-center space-x-1 fill-gray-500">
            <p></p>
            <PiShareFatFill className="w-5 h-5 fill-gray-500" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between px-2 py-1">
        <div
          className="flex items-center space-x-2 grow justify-center hover:bg-slate-50 px-3 py-1 rounded-md cursor-pointer"
          onClick={likeActionWithId}
        >
          <PiThumbsUp
            className={`w-6 h-6 ${state.loading ? "bg-gray-300" : "bg-white"} ${
              state.isLiked ? "bg-blue-600" : "bg-white"
            }`}
          />
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
