"use client";
import { useState } from "react";
import { FaComment } from "react-icons/fa6";
import CommentBox from "../comment-box/comment-box";
import { FaAngry, FaLaugh, FaRegComment } from "react-icons/fa";
import { PiShareFat, PiShareFatFill, PiThumbsUp } from "react-icons/pi";
import ReactionIcons from "../../reaction-icons/reaction-icons";
import { LikeAction } from "@/app/libs/actions/user/actions";
import { showCommentBox } from "@/app/store/slices/user/comment/commentSlice";
import { LoggedInUser } from "@/app/config/loggedinuser";
import { IoHeartCircle } from "react-icons/io5";
import { BsHeartPulseFill } from "react-icons/bs";
import { CgSmileMouthOpen } from "react-icons/cg";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  setLikeStateAction,
  updateFeeds,
} from "@/app/store/slices/user/post/postSlice";
import { CommentItemProps } from "./types";

export default function CommentItem({ feed }: CommentItemProps) {
  const dispatch = useAppDispatch();
  const likeActionState = useAppSelector(
    (state) => state.userPost.likeActionState
  );
  const [toShowCommentBox, setToShowCommentBox] = useState<boolean>(false);

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
      dispatch(
        setLikeStateAction({
          loading: true,
          error: false,
          reactionInfo: {
            isReacted: false,
            reactionType: undefined,
            reactor: undefined,
            reactions: 0,
            reactionGroup: [
              {
                count: 0,
                reactiontype: "",
              },
            ],
          },
        })
      );
      const reactionInfo = await LikeAction(
        feed.postId,
        LoggedInUser.userid,
        "like"
      );
      dispatch(
        setLikeStateAction({
          loading: false,
          error: false,
          reactionInfo: reactionInfo,
        })
      );

      dispatch(
        updateFeeds({
          postId: feed.postId,
          reactionInfo: reactionInfo,
        })
      );
    } catch (error) {
      console.error(`error ${error}`);
      dispatch(
        setLikeStateAction({
          loading: false,
          error: true,
          reactionInfo: {
            isReacted: false,
            reactionType: "",
            reactor: "",
            reactions: 0,
            reactionGroup: [
              {
                count: 0,
                reactiontype: "",
              },
            ],
          },
        })
      );
    }
  };

  const renderLikeState = () => {
    if (likeActionState.loading) {
      return null;
    }

    if (feed.reactionInfo.reactions === 1) {
      return <p>{feed.reactionInfo.reactor}</p>;
    }

    if (feed.reactionInfo.reactions > 1 && feed.reactionInfo.isReacted) {
      return (
        <p>
          You and {feed.reactionInfo.reactions} Other
          {feed.reactionInfo.reactions > 2 ? "s" : ""}
        </p>
      );
    }
    return null;
  };

  // useEffect(() => {
  //   console.log("Reaction state", likeActionState);
  // }, [likeActionState]);

  const renderReactionStatus = () => {
    if (likeActionState.loading) {
      return null;
    }

    if (
      likeActionState.reactionInfo.isReacted &&
      likeActionState.reactionInfo.reactionType === "like"
    ) {
      return (
        <div
          className="flex items-center space-x-2 grow justify-center hover:bg-slate-50 px-3 py-1 rounded-md cursor-pointer"
          onClick={handelLike}
        >
          <PiThumbsUp className="w-6 h-6 bg-blue-600" />
          <span className="text-blue-600 font-semibold">Like</span>
        </div>
      );
    }
    if (
      likeActionState.reactionInfo.isReacted &&
      likeActionState.reactionInfo.reactionType === "love"
    ) {
      return (
        <div
          className="flex items-center space-x-2 grow justify-center hover:bg-slate-50 px-3 py-1 rounded-md cursor-pointer"
          onClick={handelLike}
        >
          <IoHeartCircle
            className="w-6 h-6 fill-pink-500"
            onClick={handelLike}
          />
          <span className="text-pink-500 font-semibold">Love</span>
        </div>
      );
    }
    if (
      likeActionState.reactionInfo.isReacted &&
      likeActionState.reactionInfo.reactionType === "lagh"
    ) {
      return (
        <div
          className="flex items-center space-x-2 grow justify-center hover:bg-slate-50 px-3 py-1 rounded-md cursor-pointer"
          onClick={handelLike}
        >
          <FaLaugh className="w-6 h-6 fill-yellow-700" onClick={handelLike} />
          <span className="text-yellow-700 font-semibold">Haha</span>
        </div>
      );
    }
    if (
      likeActionState.reactionInfo.isReacted &&
      likeActionState.reactionInfo.reactionType === "care"
    ) {
      return (
        <div
          className="flex items-center space-x-2 grow justify-center hover:bg-slate-50 px-3 py-1 rounded-md cursor-pointer"
          onClick={handelLike}
        >
          <BsHeartPulseFill
            className="w-6 h-6 fill-orange-500"
            onClick={handelLike}
          />
          <span className="text-orange-500 font-semibold">Care</span>
        </div>
      );
    }
    if (
      likeActionState.reactionInfo.isReacted &&
      likeActionState.reactionInfo.reactionType === "angry"
    ) {
      return (
        <div
          className="flex items-center space-x-2 grow justify-center hover:bg-slate-50 px-3 py-1 rounded-md cursor-pointer"
          onClick={handelLike}
        >
          <FaAngry className="w-6 h-6 fill-yellow-700" onClick={handelLike} />
          <span className="text-yellow-700 font-semibold">Sad</span>
        </div>
      );
    }
    if (
      likeActionState.reactionInfo.isReacted &&
      likeActionState.reactionInfo.reactionType === "wow"
    ) {
      return (
        <div
          className="flex items-center space-x-2 grow justify-center hover:bg-slate-50 px-3 py-1 rounded-md cursor-pointer"
          onClick={handelLike}
        >
          <CgSmileMouthOpen
            className="w-6 h-6 fill-orange-500"
            onClick={handelLike}
          />
          <span className="text-orange-500 font-semibold">Wow</span>
        </div>
      );
    }
    if (
      !likeActionState.reactionInfo.isReacted &&
      likeActionState.reactionInfo.reactionType === ""
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
        <CommentBox post={feed} onClose={handelHideCommentBox} />
      )}

      <div className="flex items-center px-3 justify-between border-b py-2 border-b-gray-300">
        <div className="flex items-center space-x">
          <div className="flex space-x-0">
            {feed.reactionInfo.reactionGroup.length > 0
              ? feed.reactionInfo.reactionGroup.map((gr, index) => {
                  return (
                    <ReactionIcons key={index} reactiontype={gr.reactiontype} />
                  );
                })
              : null}
          </div>
          <p>{renderLikeState()}</p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <p>{feed.comments > 0 ? feed.comments : null}</p>
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
