/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useState, KeyboardEvent, useEffect } from "react";

import { FaFacebookMessenger, FaRegComment, FaXmark } from "react-icons/fa6";
import { GrNext, GrPrevious } from "react-icons/gr";
import { IoIosMore, IoMdMore } from "react-icons/io";

import { PiShareFat } from "react-icons/pi";
import { PhotoModalProps } from "./types";
import { FaUserFriends } from "react-icons/fa";
import {
  getCommentsStateAction,
  insertCommentStateAction,
} from "@/app/libs/actions/user/types";
import { LoggedInUser } from "@/app/config/loggedinuser";
import {
  likeMediaAction,
  MediaCommentAction,
  UpdateMediaReactionAction,
} from "@/app/libs/actions/user/actions";
import ReactionIcons from "../../feed/reaction-icons/reaction-icons";
export default function PhotoModal(props: PhotoModalProps) {
  const [toShowReactionBox, settoShowReactionBox] = useState<boolean>(false);
  const [timeOutId, setTimeOutId] = useState<NodeJS.Timeout>();

  const [comment, setComment] = useState<string>("");
  const [commentsData, setCommentsData] = useState<getCommentsStateAction>({
    loading: true,
    comments: [],
  });
  const [insertCommentState, setInsertCommentState] =
    useState<insertCommentStateAction>({
      loading: false,
      comment: {
        comment: "",
        commentid: "",
        date: "",
        user: {
          fname: "",
          lname: "",
          profilepic: "",
          userid: "",
        },
      },
    });
  const currentPhotoIndexFromProp = props.postInfo.medias.findIndex((media) => {
    return media.mediaid === props.mediaId;
  });
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(
    currentPhotoIndexFromProp
  );
  console.log(currentPhotoIndex);
  const handelMouseOverLike = () => {
    const timeoutid = setTimeout(() => {
      settoShowReactionBox(true);
    }, 1000);
    setTimeOutId(timeoutid);
  };

  const handelOverMouseOutBox = () => {
    clearTimeout(timeOutId);
    settoShowReactionBox(true);
  };

  const handelonMouseLeaveReactionBox = () => {
    const timeoutid = setTimeout(() => {
      settoShowReactionBox(false);
    }, 1000);
    setTimeOutId(timeoutid);
  };

  const handelMouseOutLike = () => {
    const timeoutid = setTimeout(() => {
      settoShowReactionBox(false);
    }, 1000);
    setTimeOutId(timeoutid);
  };

  const insertCommentAction = async (
    e: KeyboardEvent<HTMLInputElement>,
    comment: string
  ) => {
    if (e.key === "Enter") {
      try {
        setInsertCommentState({
          loading: true,
          comment: {
            comment: "",
            commentid: "",
            date: "",
            user: {
              fname: "",
              lname: "",
              profilepic: "",
              userid: "",
            },
          },
        });
        await MediaCommentAction(
          LoggedInUser,
          props.postId,
          props.postInfo.medias[currentPhotoIndex].mediaid,
          comment
        );
        setComment(" ");
      } catch (error) {
        console.error(`error ${error}`);
      }
    }
  };

  const showNextPhoto = () => {
    if (currentPhotoIndex > props.postInfo.medias.length - 1) {
      setCurrentPhotoIndex(0);
    } else {
      const newIndex = currentPhotoIndex + 1;
      setCurrentPhotoIndex(newIndex);
    }
  };
  const onChangeComment = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const showPreviousPhoto = () => {
    if (currentPhotoIndex < 0) {
      setCurrentPhotoIndex(props.postInfo.medias.length - 1);
    } else {
      const newIndex = currentPhotoIndex - 1;
      setCurrentPhotoIndex(newIndex);
    }
  };

  const showExactPhoto = () => {
    if (currentPhotoIndex > props.postInfo.medias.length - 1) {
      return props.postInfo.medias[0].media;
    } else if (currentPhotoIndex < 0) {
      return props.postInfo.medias[props.postInfo.medias.length - 1].media;
    } else {
      return props.postInfo.medias[currentPhotoIndex].media;
    }
  };

  const renderReactionState = () => {
    if (
      parseInt(props.postInfo.medias[currentPhotoIndex].reactionCount) === 1
    ) {
      return <p>{props.postInfo.medias[currentPhotoIndex].firstReactor}</p>;
    }

    if (
      parseInt(props.postInfo.medias[currentPhotoIndex].reactionCount) > 1 &&
      props.postInfo.medias[currentPhotoIndex].loggedInUserReactionInfo
        .isReacted
    ) {
      return (
        <p>
          You and{" "}
          {parseInt(props.postInfo.medias[currentPhotoIndex].reactionCount)}{" "}
          Other
          {parseInt(props.postInfo.medias[currentPhotoIndex].reactionCount) > 2
            ? "s"
            : ""}
        </p>
      );
    }
    return null;
  };
  const handelReaction = async (
    postId: string,
    userId: string,
    reactionType: string
  ) => {
    try {
      clearTimeout(timeOutId);
      settoShowReactionBox(false);
      await likeMediaAction(
        postId,
        userId,
        props.postInfo.medias[currentPhotoIndex].mediaid,
        reactionType
      );
    } catch (error) {
      clearTimeout(timeOutId);
      settoShowReactionBox(false);
      console.error(`error ${error}`);
    }
  };
  const renderReactionStatus = () => {
    if (
      props.postInfo.medias[currentPhotoIndex].loggedInUserReactionInfo
        .isReacted &&
      props.postInfo.medias[currentPhotoIndex].loggedInUserReactionInfo
        .reactionType === "like"
    ) {
      return (
        <div
          className="flex items-center space-x-2 grow justify-center hover:bg-slate-50 px-3 py-1 rounded-md cursor-pointer"
          onClick={() => {
            handelReaction(props.postId, LoggedInUser.userid, "like");
          }}
          onMouseEnter={handelMouseOverLike}
          onMouseLeave={handelMouseOutLike}
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
      props.postInfo.medias[currentPhotoIndex].loggedInUserReactionInfo
        .isReacted &&
      props.postInfo.medias[currentPhotoIndex].loggedInUserReactionInfo
        .reactionType === "love"
    ) {
      return (
        <div
          className="flex items-center space-x-2 grow justify-center hover:bg-slate-50 px-3 py-1 rounded-md cursor-pointer"
          onClick={() => {
            handelReaction(props.postId, LoggedInUser.userid, "love");
          }}
          onMouseEnter={handelMouseOverLike}
          onMouseLeave={handelMouseOutLike}
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
      props.postInfo.medias[currentPhotoIndex].loggedInUserReactionInfo
        .isReacted &&
      props.postInfo.medias[currentPhotoIndex].loggedInUserReactionInfo
        .reactionType === "lagh"
    ) {
      return (
        <div
          className="flex items-center space-x-2 grow justify-center hover:bg-slate-50 px-3 py-1 rounded-md cursor-pointer"
          onClick={() => {
            handelReaction(props.postId, LoggedInUser.userid, "lagh");
          }}
          onMouseEnter={handelMouseOverLike}
          onMouseLeave={handelMouseOutLike}
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
      props.postInfo.medias[currentPhotoIndex].loggedInUserReactionInfo
        .isReacted &&
      props.postInfo.medias[currentPhotoIndex].loggedInUserReactionInfo
        .reactionType === "care"
    ) {
      return (
        <div
          className="flex items-center space-x-2 grow justify-center hover:bg-slate-50 px-3 py-1 rounded-md cursor-pointer"
          onClick={() => {
            handelReaction(props.postId, LoggedInUser.userid, "care");
          }}
          onMouseEnter={handelMouseOverLike}
          onMouseLeave={handelMouseOutLike}
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
      props.postInfo.medias[currentPhotoIndex].loggedInUserReactionInfo
        .isReacted &&
      props.postInfo.medias[currentPhotoIndex].loggedInUserReactionInfo
        .reactionType === "angry"
    ) {
      return (
        <div
          className="flex items-center space-x-2 grow justify-center hover:bg-slate-50 px-3 py-1 rounded-md cursor-pointer"
          onClick={() => {
            handelReaction(props.postId, LoggedInUser.userid, "angry");
          }}
          onMouseEnter={handelMouseOverLike}
          onMouseLeave={handelMouseOutLike}
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
      props.postInfo.medias[currentPhotoIndex].loggedInUserReactionInfo
        .isReacted &&
      props.postInfo.medias[currentPhotoIndex].loggedInUserReactionInfo
        .reactionType === "sad"
    ) {
      return (
        <div
          className="flex items-center space-x-2 grow justify-center hover:bg-slate-50 px-3 py-1 rounded-md cursor-pointer"
          onClick={() => {
            handelReaction(props.postId, LoggedInUser.userid, "sad");
          }}
          onMouseEnter={handelMouseOverLike}
          onMouseLeave={handelMouseOutLike}
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
      props.postInfo.medias[currentPhotoIndex].loggedInUserReactionInfo
        .isReacted &&
      props.postInfo.medias[currentPhotoIndex].loggedInUserReactionInfo
        .reactionType === "wow"
    ) {
      return (
        <div
          className="flex items-center space-x-2 grow justify-center hover:bg-slate-50 px-3 py-1 rounded-md cursor-pointer"
          onClick={() => {
            handelReaction(props.postId, LoggedInUser.userid, "wow");
          }}
          onMouseEnter={handelMouseOverLike}
          onMouseLeave={handelMouseOutLike}
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
    if (
      !props.postInfo.medias[currentPhotoIndex].loggedInUserReactionInfo
        .isReacted &&
      props.postInfo.medias[currentPhotoIndex].loggedInUserReactionInfo
        .reactionType === ""
    ) {
      return (
        <div
          className="flex items-center space-x-2 grow justify-center hover:bg-slate-50 px-3 py-1 rounded-md cursor-pointer"
          onClick={() => {
            handelReaction(props.postId, LoggedInUser.userid, "like");
          }}
          onMouseEnter={handelMouseOverLike}
          onMouseLeave={handelMouseOutLike}
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

  const handelUpdateLike = async (
    postId: string,
    userId: string,
    reactionType: string
  ) => {
    try {
      settoShowReactionBox(false);
      await UpdateMediaReactionAction(
        postId,
        userId,
        props.postInfo.medias[currentPhotoIndex].mediaid,
        reactionType
      );
    } catch (error) {
      console.error(`error while updating reactions ${error}`);
      settoShowReactionBox(false);
    }
  };

  useEffect(() => {
    console.log(props.postInfo);
  }, [props.postInfo]);

  return (
    <div className="grid grid-cols-12 gap-3 h-screen fixed top-0 bottom-0 left-0 right-0 z-50">
      <div className="lg:col-span-9 col-span-12">
        <div className="w-full h-screen lg:z-20 px-4 bg-black relative">
          <div className="absolute top-2 left-2 flex items-center">
            <Link href={"/"} scroll={false} className=" cursor-pointer">
              <FaXmark className="w-10 h-10 text-white rounded-full p-2" />
            </Link>

            <Link href={"/"} scroll={false} className=" cursor-pointer">
              <Image
                width={0}
                height={0}
                sizes="100vh"
                src={"/feeds/logoc.png"}
                alt="Logo"
                className="w-10 h-10 text-white rounded-full p-2"
              />
            </Link>
          </div>
          {props.postInfo.medias.length > 1 && (
            <GrPrevious
              onClick={showPreviousPhoto}
              className="absolute cursor-pointer top-1/2 p-3 translate-y-1/2 left-8 w-12 h-12 rounded-full bg-white hover:bg-white/70"
            />
          )}

          {props.postInfo.medias.length > 1 && (
            <GrNext
              onClick={showNextPhoto}
              className="absolute cursor-pointer top-1/2 p-3 translate-y-1/2 right-8 w-12 h-12 rounded-full bg-white hover:bg-white/70"
            />
          )}

          <Image
            unoptimized
            alt="Amanuel Ferede"
            src={showExactPhoto()}
            width={0}
            height={0}
            sizes="100vh"
            className="w-full h-full object-scale-down"
          />
        </div>
      </div>
      <div className="lg:col-span-3 h-full mt-16 pb-16 col-span-12 overflow-y-scroll">
        <div className="flex items-center justify-between py-3 mb-3 pr-3 border-b border-gray-200">
          <p className="text-sm">This is photo is from a post</p>
          <p className="text-sm">View Post</p>
        </div>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center space-x-2">
            <Image
              alt="Amanuel Ferede"
              src={"/feeds/3.jpg"}
              width={0}
              height={0}
              sizes="100vh"
              className="w-10 h-10 rounded-full object-fill"
            />
            <div className="flex flex-col">
              <p>
                {props.postInfo.user.fname} {props.postInfo.user.fname}
              </p>
              <p>March 27 at 3:34 pm</p>
            </div>
          </div>
          <IoMdMore className="w-7 h-7" />
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-0">
            <div className="flex space-x-0">
              {props.postInfo.medias[currentPhotoIndex].reactionGroup.length > 0
                ? props.postInfo.medias[currentPhotoIndex]?.reactionGroup.map(
                    (gr, index) => {
                      return (
                        <ReactionIcons
                          key={index}
                          reactiontype={gr.reactiontype}
                        />
                      );
                    }
                  )
                : null}
            </div>
            <p>{renderReactionState()}</p>
          </div>

          <p>{props.postInfo.medias[currentPhotoIndex].mediaComments}</p>
        </div>
        <div className="relative flex mb-4 items-center justify-between border-t border-t-gray-300">
          {renderReactionStatus()}
          {toShowReactionBox && (
            <div
              className="absolute left-0 bottom-12 z-[100] flex items-center py-2 px-2 bg-white shadow-lg space-x-1 rounded-2xl"
              onMouseOver={handelOverMouseOutBox}
              onMouseLeave={handelonMouseLeaveReactionBox}
            >
              <Image
                onClick={() => {
                  handelUpdateLike(props.postId, LoggedInUser.userid, "like");
                }}
                alt="Amanuel Ferede"
                src={"/reactions/like.png"}
                width={0}
                height={0}
                sizes="100vh"
                className="cursor-pointer w-10 h-10 object-cover rounded-full block flex-none"
              />
              <Image
                onClick={() => {
                  handelUpdateLike(props.postId, LoggedInUser.userid, "love");
                }}
                alt="Amanuel Ferede"
                src={"/reactions/love.png"}
                width={0}
                height={0}
                sizes="100vh"
                className="cursor-pointer w-10 h-10 object-cover rounded-full block flex-none"
              />
              <Image
                onClick={() => {
                  handelUpdateLike(props.postId, LoggedInUser.userid, "care");
                }}
                alt="Amanuel Ferede"
                src={"/reactions/care.png"}
                width={0}
                height={0}
                sizes="100vh"
                className="cursor-pointer w-10 h-10 object-cover rounded-full block flex-none"
              />
              <Image
                onClick={() => {
                  handelUpdateLike(props.postId, LoggedInUser.userid, "lagh");
                }}
                alt="Amanuel Ferede"
                src={"/reactions/haha.png"}
                width={0}
                height={0}
                sizes="100vh"
                className="cursor-pointer w-10 h-10 object-cover rounded-full block flex-none"
              />
              <Image
                onClick={() => {
                  handelUpdateLike(props.postId, LoggedInUser.userid, "wow");
                }}
                alt="Amanuel Ferede"
                src={"/reactions/wow.png"}
                width={0}
                height={0}
                sizes="100vh"
                className="cursor-pointer w-10 h-10 object-cover rounded-full block flex-none"
              />
              <Image
                onClick={() => {
                  handelUpdateLike(props.postId, LoggedInUser.userid, "sad");
                }}
                alt="Amanuel Ferede"
                src={"/reactions/sad.png"}
                width={0}
                height={0}
                sizes="100vh"
                className="cursor-pointer w-10 h-10 object-cover rounded-full block flex-none"
              />
              <Image
                onClick={() => {
                  handelUpdateLike(props.postId, LoggedInUser.userid, "angry");
                }}
                alt="Amanuel Ferede"
                src={"/reactions/angry.png"}
                width={0}
                height={0}
                sizes="100vh"
                className="cursor-pointer w-10 h-10 object-cover rounded-full block flex-none"
              />
            </div>
          )}
          <div className="flex items-center space-x-3 hover:bg-slate-50 px-4 py-1.5 grow justify-center rounded-md cursor-pointer">
            <FaRegComment className="w-6 h-6" />
          </div>

          <div className="flex items-center space-x-3 hover:bg-slate-50 px-4 py-1.5 grow justify-center rounded-md cursor-pointer">
            <PiShareFat className="w-6 h-6" />
          </div>
        </div>

        <div className="px-3 h-full">
          {props.postInfo.medias[currentPhotoIndex].comments.map((comment) => {
            return (
              <div
                className="flex flex-row mb-3 space-x-3 pb-2"
                key={comment.commentid}
              >
                <div className="relative group flex-none">
                  <Link href={"/profile"}>
                    <Image
                      unoptimized
                      alt="Amanuel Ferede"
                      src={comment.profilepic}
                      width={0}
                      height={0}
                      sizes="100vh"
                      className="w-9 h-9 object-cover rounded-full ring-2 ring-offset-2 ring-blue-400"
                    />
                  </Link>
                  <div
                    className={
                      "absolute group-hover:block hidden w-96 z-50  -left-32 rounded-lg  p-4  bg-white shadow-lg"
                    }
                  >
                    <div className="flex space-x-3">
                      <Image
                        unoptimized
                        className="w-20 h-20 rounded-full  object-cover"
                        alt="Amanuel Ferede"
                        src={comment.profilepic}
                        width={0}
                        height={0}
                        sizes="100vh"
                      />

                      <div className=" flex-col space-y-2 flex-1 mt-3">
                        <p className="text-lg font-bold">Amanuel Ferede</p>
                        <p className="">Lives in AddisAbaba Ethiopia </p>
                        <p>Studid Civil Engineering at BahirDar University</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 mt-3">
                      <button className="px-3 grow py-1.5 bg-gray-400 text-white flex space-x-2 items-center justify-center rounded-md">
                        <FaUserFriends className="w-4 h-4" />
                        <span>Friends</span>
                      </button>
                      <button className="px-3 grow py-1.5 bg-blue-600 text-white flex space-x-2 items-center justify-center rounded-md">
                        <FaFacebookMessenger className="fill-white w-4 h-4" />
                        <span>Message</span>
                      </button>
                      <button className="p-3 bg-gray-400 text-white flex space-x-2 items-center rounded-md">
                        <IoIosMore className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="p-3 bg-gray-100 rounded-xl ">
                    <p className="font-semibold">
                      {comment.fname} {comment.lname}
                    </p>
                    <p>{comment.comment}</p>
                  </div>

                  <div className="flex space-x-4 pl-3">
                    <span className="text-sm"></span>
                    <span className="text-sm">Like</span>
                    <span className="text-sm">Reply</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="sticky rounded-b-xl flex bg-white space-x-2 bottom-0 left-0 right-0 p-2 w-full">
          <Image
            alt="Amanuel Ferede"
            src={LoggedInUser.profilepic}
            width={0}
            height={0}
            sizes="100vh"
            className="w-10 h-10 object-cover rounded-full block flex-none"
          />

          <input
            onChange={onChangeComment}
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
              insertCommentAction(e, comment);
            }}
            value={comment}
            type="text"
            className="p-3 block grow focus:outline-none bg-slate-50 rounded-xl"
            placeholder="Write a comment ..."
          ></input>
        </div>
      </div>
    </div>
  );
}
