"use client";
import { useState } from "react";
import { FaComment } from "react-icons/fa6";
import CommentBox from "../comment-box/comment-box";
import { FaAngry, FaLaugh, FaRegComment } from "react-icons/fa";
import { PiShareFat, PiShareFatFill, PiThumbsUp } from "react-icons/pi";
import ReactionIcons from "../../reaction-icons/reaction-icons";
import { LikeAction, UpdateReaction } from "@/app/libs/actions/user/actions";
import { showCommentBox } from "@/app/store/slices/user/comment/commentSlice";
import { LoggedInUser } from "@/app/config/loggedinuser";
import { IoHeartCircle } from "react-icons/io5";
import { BsHeartPulseFill } from "react-icons/bs";
import { CgSmileMouthOpen } from "react-icons/cg";
import { useAppDispatch } from "@/app/store/hooks";

import { CommentItemProps } from "./types";
import { ImCrying } from "react-icons/im";

export default function CommentItem({ feed }: CommentItemProps) {
  const dispatch = useAppDispatch();

  const [toShowCommentBox, setToShowCommentBox] = useState<boolean>(false);
  const [toShowReactionBox, settoShowReactionBox] = useState<boolean>(false);

  const handelShowCommentBox = () => {
    setToShowCommentBox(true);
    dispatch(showCommentBox(true));
  };

  const handelHideCommentBox = () => {
    setToShowCommentBox(false);
    dispatch(showCommentBox(false));
  };

  const handelMouseOverLike = () => {
    setTimeout(() => {
      settoShowReactionBox(true);
    }, 1000);
  };

  const handelMouseOutLike = () => {
    settoShowReactionBox(false);
  };

  const handelUpdateLike = async (
    postId: string,
    userId: string,
    reactionType: string
  ) => {
    await UpdateReaction(postId, userId, reactionType);
    try {
    } catch (error) {
      console.error(`error while updating reactions ${error}`);
    }
  };

  const handelReaction = async (
    postId: string,
    userId: string,
    reactionType: string
  ) => {
    try {
      await LikeAction(postId, userId, reactionType);
      settoShowReactionBox(false);
    } catch (error) {
      console.error(`error ${error}`);
    }
  };

  const renderReactionState = () => {
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
    if (
      feed.reactionInfo.isReacted &&
      feed.reactionInfo.reactionType === "like"
    ) {
      return (
        <div
          className="flex items-center space-x-2 grow justify-center hover:bg-slate-50 px-3 py-1 rounded-md cursor-pointer"
          onClick={() => {
            handelReaction(feed.postId, LoggedInUser.userid, "like");
          }}
          onMouseOver={handelMouseOverLike}
        >
          <PiThumbsUp className="w-6 h-6 bg-blue-600" />
          <span className="text-blue-600 font-semibold">Like</span>
        </div>
      );
    }
    if (
      feed.reactionInfo.isReacted &&
      feed.reactionInfo.reactionType === "love"
    ) {
      return (
        <div
          className="flex items-center space-x-2 grow justify-center hover:bg-slate-50 px-3 py-1 rounded-md cursor-pointer"
          onClick={() => {
            handelReaction(feed.postId, LoggedInUser.userid, "like");
          }}
          onMouseOver={handelMouseOverLike}
        >
          <IoHeartCircle className="w-6 h-6 fill-pink-500" />
          <span className="text-pink-500 font-semibold">Love</span>
        </div>
      );
    }
    if (
      feed.reactionInfo.isReacted &&
      feed.reactionInfo.reactionType === "lagh"
    ) {
      return (
        <div
          className="flex items-center space-x-2 grow justify-center hover:bg-slate-50 px-3 py-1 rounded-md cursor-pointer"
          onClick={() => {
            handelReaction(feed.postId, LoggedInUser.userid, "like");
          }}
          onMouseOver={handelMouseOverLike}
        >
          <FaLaugh className="w-6 h-6 fill-yellow-700" />
          <span className="text-yellow-700 font-semibold">Haha</span>
        </div>
      );
    }
    if (
      feed.reactionInfo.isReacted &&
      feed.reactionInfo.reactionType === "care"
    ) {
      return (
        <div
          className="flex items-center space-x-2 grow justify-center hover:bg-slate-50 px-3 py-1 rounded-md cursor-pointer"
          onClick={() => {
            handelReaction(feed.postId, LoggedInUser.userid, "like");
          }}
          onMouseOver={handelMouseOverLike}
        >
          <BsHeartPulseFill className="w-6 h-6 fill-orange-500" />
          <span className="text-orange-500 font-semibold">Care</span>
        </div>
      );
    }
    if (
      feed.reactionInfo.isReacted &&
      feed.reactionInfo.reactionType === "angry"
    ) {
      return (
        <div
          className="flex items-center space-x-2 grow justify-center hover:bg-slate-50 px-3 py-1 rounded-md cursor-pointer"
          onClick={() => {
            handelReaction(feed.postId, LoggedInUser.userid, "like");
          }}
          onMouseOver={handelMouseOverLike}
        >
          <FaAngry className="w-6 h-6 fill-yellow-700" />
          <span className="text-yellow-700 font-semibold">Angry</span>
        </div>
      );
    }

    if (
      feed.reactionInfo.isReacted &&
      feed.reactionInfo.reactionType === "sad"
    ) {
      return (
        <div
          className="flex items-center space-x-2 grow justify-center hover:bg-slate-50 px-3 py-1 rounded-md cursor-pointer"
          onClick={() => {
            handelReaction(feed.postId, LoggedInUser.userid, "like");
          }}
          onMouseOver={handelMouseOverLike}
        >
          <ImCrying className="w-6 h-6 fill-yellow-700" />
          <span className="text-yellow-700 font-semibold">Sad</span>
        </div>
      );
    }
    if (
      feed.reactionInfo.isReacted &&
      feed.reactionInfo.reactionType === "wow"
    ) {
      return (
        <div
          className="flex items-center space-x-2 grow justify-center hover:bg-slate-50 px-3 py-1 rounded-md cursor-pointer"
          onClick={() => {
            handelReaction(feed.postId, LoggedInUser.userid, "like");
          }}
          onMouseOver={handelMouseOverLike}
        >
          <CgSmileMouthOpen className="w-6 h-6 fill-orange-500" />
          <span className="text-orange-500 font-semibold">Wow</span>
        </div>
      );
    }
    if (!feed.reactionInfo.isReacted && feed.reactionInfo.reactionType === "") {
      return (
        <div
          className="flex items-center space-x-2 grow justify-center hover:bg-slate-50 px-3 py-1 rounded-md cursor-pointer"
          onClick={() => {
            handelReaction(feed.postId, LoggedInUser.userid, "like");
          }}
          onMouseOver={handelMouseOverLike}
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
          <p>{renderReactionState()}</p>
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
        {toShowReactionBox && (
          <div
            className="flex items-center py-2 px-3 bg-white space-x-6 rounded-2xl"
            onMouseOut={handelMouseOutLike}
          >
            <PiThumbsUp
              className="w-14 h-14 bg-blue-600 rounded-full"
              onClick={() => {
                handelUpdateLike(feed.postId, LoggedInUser.userid, "like");
              }}
            />
            <IoHeartCircle
              className="w-14 h-14 fill-pink-500 rounded-full"
              onClick={() => {
                handelUpdateLike(feed.postId, LoggedInUser.userid, "love");
              }}
            />
            <FaLaugh
              className="w-14 h-14 fill-yellow-700 rounded-full"
              onClick={() => {
                handelUpdateLike(feed.postId, LoggedInUser.userid, "lagh");
              }}
            />
            <BsHeartPulseFill
              className="w-14 h-14 fill-orange-500 rounded-full"
              onClick={() => {
                handelUpdateLike(feed.postId, LoggedInUser.userid, "care");
              }}
            />
            <FaAngry
              className="w-14 h-14 fill-yellow-700 rounded-full"
              onClick={() => {
                handelUpdateLike(feed.postId, LoggedInUser.userid, "angry");
              }}
            />
            <CgSmileMouthOpen
              className="w-14 h-14 fill-orange-500 rounded-full"
              onClick={() => {
                handelUpdateLike(feed.postId, LoggedInUser.userid, "wow");
              }}
            />

            <ImCrying
              className="w-14 h-14 fill-orange-500 rounded-full"
              onClick={() => {
                handelUpdateLike(feed.postId, LoggedInUser.userid, "sad");
              }}
            />
          </div>
        )}
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
