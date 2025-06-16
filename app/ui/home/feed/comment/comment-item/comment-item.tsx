"use client";
import Image from "next/image";
import { useState } from "react";
import { FaComment } from "react-icons/fa6";
import CommentBox from "../comment-box/comment-box";
import { FaRegComment } from "react-icons/fa";
import { PiShareFat, PiShareFatFill } from "react-icons/pi";
import ReactionIcons from "../../reaction-icons/reaction-icons";
import { showCommentBox } from "@/app/store/slices/user/comment/commentSlice";
import { LoggedInUser } from "@/app/config/loggedinuser";
import { useAppDispatch } from "@/app/store/hooks";

import { CommentItemProps } from "./types";
import { react, reReact } from "@/app/libs/actions/post";
import { updateFeedsWithReactionInfo } from "@/app/store/slices/user/post/postSlice";

export default function CommentItem({ feed }: CommentItemProps) {
  const dispatch = useAppDispatch();

  const [toShowCommentBox, setToShowCommentBox] = useState<boolean>(false);
  const [toShowReactionBox, settoShowReactionBox] = useState<boolean>(false);
  const [timeOutId, setTimeOutId] = useState<NodeJS.Timeout>();
  const handelShowCommentBox = () => {
    setToShowCommentBox(true);
    dispatch(showCommentBox(true));
  };

  const handelHideCommentBox = () => {
    setToShowCommentBox(false);
    dispatch(showCommentBox(false));
  };

  const handelMouseOverLike = () => {
    const timeoutid = setTimeout(() => {
      settoShowReactionBox(true);
    }, 1000);
    setTimeOutId(timeoutid);
  };

  const handelMouseLeaveLike = () => {
    const timeoutid = setTimeout(() => {
      settoShowReactionBox(false);
    }, 1000);
    setTimeOutId(timeoutid);
  };

  const handelMouseOutLike = () => {
    settoShowReactionBox(false);
  };

  const handelMouseEnterLike = () => {
    clearTimeout(timeOutId);
    settoShowReactionBox(true);
  };

  const handelUpdateLike = async (
    postId: string,
    userId: string,
    reactionType: string
  ) => {
    try {
      settoShowReactionBox(false);
      const reactionInfo = await reReact(postId, userId, reactionType);
      if (reactionInfo) {
        dispatch(
          updateFeedsWithReactionInfo({
            postId: feed.postId,
            reactionInfo: reactionInfo,
          })
        );
      }
    } catch (error) {
      console.error(`error while updating reactions ${error}`);
      settoShowReactionBox(false);
    }
  };

  const handelReaction = async (
    postId: string,
    userId: string,
    reactionType: string
  ) => {
    try {
      clearTimeout(timeOutId);
      settoShowReactionBox(false);
      const updatedReactionInfo = await react(postId, userId, reactionType);
      if (updatedReactionInfo) {
        dispatch(
          updateFeedsWithReactionInfo({
            postId: feed.postId,
            reactionInfo: updatedReactionInfo,
          })
        );
      }
    } catch (error) {
      clearTimeout(timeOutId);
      settoShowReactionBox(false);
      console.error(`error ${error}`);
    }
  };

  const renderReactionState = () => {
    if (parseInt(feed.reactionInfo.reactions) === 1) {
      return <p>{feed.reactionInfo.firstReactorInfo.reactor}</p>;
    }

    if (
      parseInt(feed.reactionInfo.reactions) > 1 &&
      feed.reactionInfo.isReacted
    ) {
      return (
        <p>
          You and {parseInt(feed.reactionInfo.reactions) - 1} Other
          {parseInt(feed.reactionInfo.reactions) - 1 >= 1 ? "s" : ""}
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
          onMouseEnter={handelMouseOverLike}
          onMouseLeave={handelMouseLeaveLike}
        >
          <Image
            alt="Amanuel Ferede"
            src={"/reactions/like.png"}
            width={0}
            height={0}
            sizes="100vh"
            className="w-6 h-6 object-cover rounded-full block flex-none"
          />
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
            handelReaction(feed.postId, LoggedInUser.userid, "love");
          }}
          onMouseEnter={handelMouseOverLike}
          onMouseLeave={handelMouseLeaveLike}
        >
          <Image
            alt="Amanuel Ferede"
            src={"/reactions/love.png"}
            width={0}
            height={0}
            sizes="100vh"
            className="w-6 h-6 object-cover rounded-full block flex-none"
          />
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
            handelReaction(feed.postId, LoggedInUser.userid, "lagh");
          }}
          onMouseEnter={handelMouseOverLike}
          onMouseLeave={handelMouseLeaveLike}
        >
          <Image
            alt="Amanuel Ferede"
            src={"/reactions/haha.png"}
            width={0}
            height={0}
            sizes="100vh"
            className="w-6 h-6 object-cover rounded-full block flex-none"
          />
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
            handelReaction(feed.postId, LoggedInUser.userid, "care");
          }}
          onMouseEnter={handelMouseOverLike}
          onMouseLeave={handelMouseLeaveLike}
        >
          <Image
            alt="Amanuel Ferede"
            src={"/reactions/care.png"}
            width={0}
            height={0}
            sizes="100vh"
            className="w-6 h-6 object-cover rounded-full block flex-none"
          />
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
            handelReaction(feed.postId, LoggedInUser.userid, "angry");
          }}
          onMouseEnter={handelMouseOverLike}
          onMouseLeave={handelMouseLeaveLike}
        >
          <Image
            alt="Amanuel Ferede"
            src={"/reactions/angry.png"}
            width={0}
            height={0}
            sizes="100vh"
            className="w-6 h-6 object-cover rounded-full block flex-none"
          />
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
            handelReaction(feed.postId, LoggedInUser.userid, "sad");
          }}
          onMouseEnter={handelMouseOverLike}
          onMouseLeave={handelMouseLeaveLike}
        >
          <Image
            alt="Amanuel Ferede"
            src={"/reactions/sad.png"}
            width={0}
            height={0}
            sizes="100vh"
            className="w-6 h-6 object-cover rounded-full block flex-none"
          />
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
            handelReaction(feed.postId, LoggedInUser.userid, "wow");
          }}
          onMouseEnter={handelMouseOverLike}
          onMouseLeave={handelMouseLeaveLike}
        >
          <Image
            alt="Amanuel Ferede"
            src={"/reactions/wow.png"}
            width={0}
            height={0}
            sizes="100vh"
            className="w-6 h-6 object-cover rounded-full block flex-none"
          />
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
          onMouseEnter={handelMouseOverLike}
          onMouseLeave={handelMouseLeaveLike}
        >
          <Image
            alt="Amanuel Ferede"
            src={"/reactions/likew.png"}
            width={0}
            height={0}
            sizes="100vh"
            className="w-6 h-6 object-cover rounded-full block flex-none"
          />
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
        <div className="flex items-center space-x-0">
          <div className="flex -space-x-1.5">
            {feed.reactionInfo.reactionGroup.length > 0
              ? feed.reactionInfo.reactionGroup.map((gr, index) => {
                  return (
                    <ReactionIcons key={index} reactiontype={gr.reactionType} />
                  );
                })
              : null}
          </div>
          <p>{renderReactionState()}</p>
        </div>

        <div className="flex items-center space-x-4">
          {parseInt(feed.commentInfo.commentsCount) > 0 ? (
            <div className="flex items-center space-x-1">
              <p>{feed.commentInfo.commentsCount}</p>
              <FaComment className="w-5 h-5 fill-gray-500" />
            </div>
          ) : null}

          <div className="flex items-center space-x-1 fill-gray-500">
            <p></p>
            <PiShareFatFill className="w-5 h-5 fill-gray-500" />
          </div>
        </div>
      </div>
      <div className="relative flex items-center justify-between px-2 py-1">
        {renderReactionStatus()}
        {toShowReactionBox && (
          <div
            className="absolute left-0 bottom-12 z-[100] flex items-center py-2 px-2 bg-white shadow-lg space-x-1 rounded-2xl"
            onMouseLeave={handelMouseOutLike}
            onMouseEnter={handelMouseEnterLike}
          >
            <Image
              onClick={() => {
                handelUpdateLike(feed.postId, LoggedInUser.userid, "like");
              }}
              alt="Amanuel Ferede"
              src={"/reactions/like.png"}
              width={0}
              height={0}
              sizes="100vh"
              className="cursor-pointer w-14 h-14 object-cover rounded-full block flex-none"
            />
            <Image
              onClick={() => {
                handelUpdateLike(feed.postId, LoggedInUser.userid, "love");
              }}
              alt="Amanuel Ferede"
              src={"/reactions/love.png"}
              width={0}
              height={0}
              sizes="100vh"
              className="cursor-pointer w-14 h-14 object-cover rounded-full block flex-none"
            />
            <Image
              onClick={() => {
                handelUpdateLike(feed.postId, LoggedInUser.userid, "care");
              }}
              alt="Amanuel Ferede"
              src={"/reactions/care.png"}
              width={0}
              height={0}
              sizes="100vh"
              className="cursor-pointer w-14 h-14 object-cover rounded-full block flex-none"
            />
            <Image
              onClick={() => {
                handelUpdateLike(feed.postId, LoggedInUser.userid, "lagh");
              }}
              alt="Amanuel Ferede"
              src={"/reactions/haha.png"}
              width={0}
              height={0}
              sizes="100vh"
              className="cursor-pointer w-14 h-14 object-cover rounded-full block flex-none"
            />
            <Image
              onClick={() => {
                handelUpdateLike(feed.postId, LoggedInUser.userid, "wow");
              }}
              alt="Amanuel Ferede"
              src={"/reactions/wow.png"}
              width={0}
              height={0}
              sizes="100vh"
              className="cursor-pointer w-14 h-14 object-cover rounded-full block flex-none"
            />
            <Image
              onClick={() => {
                handelUpdateLike(feed.postId, LoggedInUser.userid, "sad");
              }}
              alt="Amanuel Ferede"
              src={"/reactions/sad.png"}
              width={0}
              height={0}
              sizes="100vh"
              className="cursor-pointer w-14 h-14 object-cover rounded-full block flex-none"
            />
            <Image
              onClick={() => {
                handelUpdateLike(feed.postId, LoggedInUser.userid, "angry");
              }}
              alt="Amanuel Ferede"
              src={"/reactions/angry.png"}
              width={0}
              height={0}
              sizes="100vh"
              className="cursor-pointer w-14 h-14 object-cover rounded-full block flex-none"
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
