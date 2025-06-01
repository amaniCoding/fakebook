"use client";
import { useEffect, useState } from "react";
import { FaComment } from "react-icons/fa6";
import CommentBox from "./comment-box";
import { FaAngry, FaLaugh, FaRegComment } from "react-icons/fa";
import { PiShareFat, PiShareFatFill, PiThumbsUp } from "react-icons/pi";
import { useDispatch } from "react-redux";
import ReactionIcons from "../reaction-icons";
import { LikeAction } from "@/app/libs/actions/user/actions";
import { LikeActionState } from "@/app/libs/actions/user/types";
import { Posts } from "@/app/libs/data/user/types";
import { showCommentBox } from "@/app/store/slices/user/commentSlice";
import { LoggedInUser } from "@/app/config/loggedinuser";
import { IoHeartCircle } from "react-icons/io5";
import { BsHeartPulseFill } from "react-icons/bs";
import { CgSmileMouthOpen } from "react-icons/cg";

export default function CommentItem({ post }: { post: Posts }) {
  const [toShowCommentBox, setToShowCommentBox] = useState<boolean>(false);
  const [reactionActionState, setReactionActionState] =
    useState<LikeActionState>({
      reactionInfo: post.reactionInfo,
      loading: false,
    });

  const dispatch = useDispatch();
  const handelShowCommentBox = () => {
    setToShowCommentBox(true);
    dispatch(showCommentBox(true));
  };

  const handelHideCommentBox = () => {
    setToShowCommentBox(false);
    dispatch(showCommentBox(false));
  };

  const handelLike = async () => {
    try {
      setReactionActionState({
        loading: true,
        reactionInfo: {
          isReacted: false,
          reactionType: "",
          reactor: undefined,
          me: undefined,
        },
      });
      const reactionInfo = await LikeAction(
        post.post.postId,
        LoggedInUser.userid,
        "like"
      );
      setReactionActionState({
        loading: false,
        reactionInfo: reactionInfo,
      });
    } catch (error) {
      console.error(`error ${error}`);
      setReactionActionState({
        loading: true,
        reactionInfo: {
          isReacted: false,
          reactionType: undefined,
          reactor: undefined,
          me: undefined,
        },
      });
    }
  };

  useEffect(() => {
    console.log("Reaction state", reactionActionState);
  }, [reactionActionState]);

  const renderReactionStatus = () => {
    if (reactionActionState.loading) {
      return <div>Loading ...</div>;
    } else if (
      reactionActionState.reactionInfo.isReacted &&
      reactionActionState.reactionInfo.reactionType === "like"
    ) {
      return (
        <PiThumbsUp className="w-6 h-6 bg-blue-600" onClick={handelLike} />
      );
    } else if (
      reactionActionState.reactionInfo.isReacted &&
      reactionActionState.reactionInfo.reactionType === "love"
    ) {
      return (
        <IoHeartCircle className="w-6 h-6 fill-pink-500" onClick={handelLike} />
      );
    } else if (
      reactionActionState.reactionInfo.isReacted &&
      reactionActionState.reactionInfo.reactionType === "lagh"
    ) {
      return (
        <FaLaugh className="w-6 h-6 fill-yellow-700" onClick={handelLike} />
      );
    } else if (
      reactionActionState.reactionInfo.isReacted &&
      reactionActionState.reactionInfo.reactionType === "care"
    ) {
      return (
        <BsHeartPulseFill
          className="w-6 h-6 fill-orange-500"
          onClick={handelLike}
        />
      );
    } else if (
      reactionActionState.reactionInfo.isReacted &&
      reactionActionState.reactionInfo.reactionType === "angry"
    ) {
      return (
        <FaAngry className="w-6 h-6 fill-yellow-700" onClick={handelLike} />
      );
    } else if (
      reactionActionState.reactionInfo.isReacted &&
      reactionActionState.reactionInfo.reactionType === "wow"
    ) {
      return (
        <CgSmileMouthOpen
          className="w-6 h-6 fill-orange-500"
          onClick={handelLike}
        />
      );
    } else if (
      !reactionActionState.reactionInfo.isReacted &&
      reactionActionState.reactionInfo.reactionType === undefined
    ) {
      return (
        <div
          className="flex items-center space-x-2 grow justify-center hover:bg-slate-50 px-3 py-1 rounded-md cursor-pointer"
          onClick={handelLike}
        >
          <PiThumbsUp className="w-6 h-6 bg-white" />
          <span>Like</span>
        </div>
      );
    }
  };

  return (
    <>
      {toShowCommentBox && (
        <CommentBox post={post} onClose={handelHideCommentBox} />
      )}

      <div className="flex items-center px-3 justify-between border-b py-2 border-b-gray-300">
        <div className="flex items-center space-x">
          <div className="flex space-x-0">
            {post.reactionGroup.map((gr, index) => {
              return (
                <ReactionIcons key={index} reactiontype={gr.reactiontype} />
              );
            })}
          </div>
          <p>
            {post.reactions === 1 && post.reactionInfo.me
              ? "You"
              : post.reactions > 1 && post.reactionInfo.me
              ? `You and ${post.reactions} other${
                  post.reactions === 1 ? "" : "s"
                }`
              : post.reactions}
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
        {renderReactionStatus()}
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
