"use client";
import { IoIosMore, IoMdMore } from "react-icons/io";
import Image from "next/image";
import { PiShareFat } from "react-icons/pi";
import Link from "next/link";
import { FaUserFriends } from "react-icons/fa";
import { FaFacebookMessenger, FaRegComment, FaXmark } from "react-icons/fa6";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import {
  commentAction,
  fetchCommentsAction,
  LikeAction,
  UpdateReaction,
} from "@/app/libs/actions/user/actions";
import { getCommentsStateAction } from "@/app/libs/actions/user/types";
import CommentsSkeleton from "@/app/ui/skeletons/comments";
import { LoggedInUser } from "@/app/config/loggedinuser";
import { CommentBoxProps } from "./types";
import { useAppDispatch } from "@/app/store/hooks";
import { updateFeedWithComment } from "@/app/store/slices/user/post/postSlice";

export default function CommentBox({ post, onClose }: CommentBoxProps) {
  const dispatch = useAppDispatch();
  const [toShowReactionBox, settoShowReactionBox] = useState<boolean>(false);
  const [timeOutId, setTimeOutId] = useState<NodeJS.Timeout>();
  const [commentsData, setCommentsData] = useState<getCommentsStateAction>({
    loading: true,
    comments: [],
  });
  const commentBoxRef = useRef<HTMLDivElement>(null);

  const [comment, setComment] = useState<string>("");

  const handelMouseOverLike = () => {
    const timeoutid = setTimeout(() => {
      settoShowReactionBox(true);
    }, 1000);
    setTimeOutId(timeoutid);
  };

  useEffect(() => {
    commentBoxRef.current?.scrollTo({
      behavior: "smooth",
      top: 350,
    });
  }, []);

  const handelUpdateLike = async (
    postId: string,
    userId: string,
    reactionType: string
  ) => {
    try {
      settoShowReactionBox(false);
      await UpdateReaction(postId, userId, reactionType);
    } catch (error) {
      console.error(`error while updating reactions ${error}`);
      settoShowReactionBox(false);
    }
  };

  const handelMouseOutLike = () => {
    settoShowReactionBox(false);
  };
  const handelReaction = async (
    postId: string,
    userId: string,
    reactionType: string
  ) => {
    try {
      clearTimeout(timeOutId);
      settoShowReactionBox(false);
      await LikeAction(postId, userId, reactionType);
    } catch (error) {
      clearTimeout(timeOutId);
      settoShowReactionBox(false);
      console.error(`error ${error}`);
    }
  };

  const renderReactionStatus = () => {
    if (
      post.reactionInfo.isReacted &&
      post.reactionInfo.reactionType === "like"
    ) {
      return (
        <div
          className="flex items-center space-x-2 grow justify-center hover:bg-slate-50 px-3 py-1 rounded-md cursor-pointer"
          onClick={() => {
            handelReaction(post.postId, LoggedInUser.userid, "like");
          }}
          onMouseEnter={handelMouseOverLike}
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
      post.reactionInfo.isReacted &&
      post.reactionInfo.reactionType === "love"
    ) {
      return (
        <div
          className="flex items-center space-x-2 grow justify-center hover:bg-slate-50 px-3 py-1 rounded-md cursor-pointer"
          onClick={() => {
            handelReaction(post.postId, LoggedInUser.userid, "love");
          }}
          onMouseEnter={handelMouseOverLike}
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
      post.reactionInfo.isReacted &&
      post.reactionInfo.reactionType === "lagh"
    ) {
      return (
        <div
          className="flex items-center space-x-2 grow justify-center hover:bg-slate-50 px-3 py-1 rounded-md cursor-pointer"
          onClick={() => {
            handelReaction(post.postId, LoggedInUser.userid, "lagh");
          }}
          onMouseEnter={handelMouseOverLike}
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
      post.reactionInfo.isReacted &&
      post.reactionInfo.reactionType === "care"
    ) {
      return (
        <div
          className="flex items-center space-x-2 grow justify-center hover:bg-slate-50 px-3 py-1 rounded-md cursor-pointer"
          onClick={() => {
            handelReaction(post.postId, LoggedInUser.userid, "care");
          }}
          onMouseEnter={handelMouseOverLike}
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
      post.reactionInfo.isReacted &&
      post.reactionInfo.reactionType === "angry"
    ) {
      return (
        <div
          className="flex items-center space-x-2 grow justify-center hover:bg-slate-50 px-3 py-1 rounded-md cursor-pointer"
          onClick={() => {
            handelReaction(post.postId, LoggedInUser.userid, "angry");
          }}
          onMouseEnter={handelMouseOverLike}
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
      post.reactionInfo.isReacted &&
      post.reactionInfo.reactionType === "sad"
    ) {
      return (
        <div
          className="flex items-center space-x-2 grow justify-center hover:bg-slate-50 px-3 py-1 rounded-md cursor-pointer"
          onClick={() => {
            handelReaction(post.postId, LoggedInUser.userid, "sad");
          }}
          onMouseEnter={handelMouseOverLike}
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
      post.reactionInfo.isReacted &&
      post.reactionInfo.reactionType === "wow"
    ) {
      return (
        <div
          className="flex items-center space-x-2 grow justify-center hover:bg-slate-50 px-3 py-1 rounded-md cursor-pointer"
          onClick={() => {
            handelReaction(post.postId, LoggedInUser.userid, "wow");
          }}
          onMouseEnter={handelMouseOverLike}
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
      !post.reactionInfo.isReacted &&
      post.reactionInfo.reactionType === undefined
    ) {
      return (
        <div
          className="flex items-center space-x-2 grow justify-center hover:bg-slate-50 px-3 py-1 rounded-md cursor-pointer"
          onClick={() => {
            handelReaction(post.postId, LoggedInUser.userid, "like");
          }}
          onMouseEnter={handelMouseOverLike}
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

  const onChangeComment = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const insertCommentAction = async (
    e: KeyboardEvent<HTMLInputElement>,
    comment: string
  ) => {
    if (e.key === "Enter") {
      try {
        const insertedComment = await commentAction(
          LoggedInUser,
          post.postId,
          comment
        );
        if (insertedComment) {
          const newComments = [insertedComment, ...commentsData.comments];
          setCommentsData({
            loading: false,
            comments: newComments,
          });

          dispatch(
            updateFeedWithComment({
              postId: post.postId,
              commentData: insertedComment,
            })
          );

          setComment("");
          commentBoxRef.current?.scrollTo({
            behavior: "smooth",
            top: 350,
          });
        }
      } catch (error) {
        console.error(`error ${error}`);
      }
    }
  };

  useEffect(() => {
    const fetchCommentsForUseEffect = async () => {
      try {
        const commdata = await fetchCommentsAction(post.postId);
        setCommentsData({
          loading: false,
          comments: commdata.comments,
        });
      } catch (error) {
        console.error(`error ${error}`);
      }
    };

    fetchCommentsForUseEffect();
  }, [post.postId]);

  return (
    <section className="bg-gray-100/75 fixed top-0 bottom-0 left-0 right-0 z-[300] overflow-hidden">
      <div className="max-w-[700px] mx-auto rounded-xl bg-white my-10">
        <div className="flex rounded-t-xl items-center justify-between mb-2 border-b-2 border-b-slate-200 p-2 sticky w-full left-0 right-0 bg-white top-0">
          <p></p>
          <p>
            {post.user.fname} {""} {post.user.lname}&apos;s Post
          </p>
          <FaXmark
            className="w-10 h-10 rounded-full hover:bg-slate-300 p-2 cursor-pointer"
            onClick={() => {
              onClose();
            }}
          />
        </div>
        <div
          className="overflow-y-auto socrollabar h-[430px] relative"
          ref={commentBoxRef}
        >
          <div className="flex justify-between">
            <div className="flex space-x-3 p-2">
              <Image
                unoptimized
                alt="Amanuel Ferede"
                src={post.user.profilepic}
                width={0}
                height={0}
                sizes="100vh"
                className="w-10 h-10 object-cover rounded-full ring-2 ring-offset-2 ring-blue-400"
              />
              <div className="flex flex-col space-y-0.5">
                <span>
                  {" "}
                  {post.user.fname} {""} {post.user.lname}
                </span>
                <span className="text-gray-400 text-sm">2 Hours</span>
              </div>
            </div>
            <IoMdMore className="w-8 h-8" />
          </div>
          <div className="p-2">
            <p>{post.post ? post.post : null}</p>
          </div>

          {post.medias.length > 0 && (
            <div className="w-full h-[31rem]">
              {post.medias.length > 5 && (
                <div className="flex w-full h-full space-x-1">
                  <div className="w-1/2 h-full flex flex-col space-y-1">
                    {post.medias.slice(0, 3).map((file) => {
                      const fileIndex = post.medias.findIndex((_file) => {
                        return file.mediaid === _file.mediaid;
                      });
                      return (
                        <Link
                          className="w-full h-[10.5rem] block"
                          href={`/photo/${post.postId}/${post.medias[fileIndex].mediaid}`}
                          key={file.mediaid}
                        >
                          <div
                            className="w-full h-full"
                            style={{
                              backgroundImage: "url(" + `${file.media}` + ")",
                              backgroundPosition: "top center",
                              backgroundSize: "cover",
                              backgroundRepeat: "no-repeat",
                            }}
                          ></div>
                        </Link>
                      );
                    })}
                  </div>

                  <div className="w-1/2 h-full flex flex-col space-y-1">
                    {post.medias.slice(3, 4).map((file) => {
                      const fileIndex = post.medias.findIndex((_file) => {
                        return file.mediaid === _file.mediaid;
                      });
                      return (
                        <Link
                          href={`/photo/${post.postId}/${post.medias[fileIndex].mediaid}`}
                          key={file.mediaid}
                          className="block w-full h-[15.5rem]"
                        >
                          <div
                            className="w-full h-full"
                            style={{
                              backgroundImage: "url(" + `${file.media}` + ")",
                              backgroundPosition: "top center",
                              backgroundSize: "cover",
                              backgroundRepeat: "no-repeat",
                            }}
                          ></div>
                        </Link>
                      );
                    })}
                    <Link
                      href={`/photo/${post.postId}/${post.medias[5].mediaid}`}
                      className="block w-full h-[15.5rem] grow relative"
                    >
                      <div
                        className="w-full h-full"
                        style={{
                          backgroundImage:
                            "url(" + `${post.medias[5].media}` + ")",
                          backgroundPosition: "top center",
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                        }}
                      >
                        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/45 flex items-center justify-center">
                          <p className="text-white">
                            {post.medias.length - 5} +
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
              {post.medias.length === 5 && (
                <div className="flex w-full space-x-1">
                  <div className="flex flex-col w-1/2 space-y-1">
                    {post.medias.slice(0, 3).map((file) => {
                      const fileIndex = post.medias.findIndex((_file) => {
                        return file.mediaid === _file.mediaid;
                      });
                      return (
                        <Link
                          className="w-full h-[10.5rem]"
                          href={`/photo/${post.postId}/${post.medias[fileIndex].mediaid}`}
                          key={file.mediaid}
                        >
                          <div
                            style={{
                              backgroundImage: "url(" + `${file.media}` + ")",
                              backgroundPosition: "top center",
                              backgroundSize: "cover",
                              backgroundRepeat: "no-repeat",
                            }}
                          ></div>
                        </Link>
                      );
                    })}
                  </div>

                  <div className="flex w-1/2 flex-col space-y-1">
                    {post.medias.slice(3, 6).map((file) => {
                      const fileIndex = post.medias.findIndex((_file) => {
                        return file.mediaid === _file.mediaid;
                      });
                      return (
                        <Link
                          className="w-full h-[15.5rem] grow"
                          href={`/photo/${post.postId}/${post.medias[fileIndex].mediaid}`}
                          key={file.mediaid}
                        >
                          <div
                            className=""
                            style={{
                              backgroundImage: "url(" + `${file.media}` + ")",
                              backgroundPosition: "top center",
                              backgroundSize: "cover",
                              backgroundRepeat: "no-repeat",
                            }}
                          ></div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
              {post.medias.length === 4 && (
                <div className="flex h-full space-x-1">
                  <div className="flex flex-col space-y-1 w-1/2 h-full">
                    {post.medias.slice(0, 2).map((file) => {
                      const fileIndex = post.medias.findIndex((_file) => {
                        return file.mediaid === _file.mediaid;
                      });
                      return (
                        <Link
                          href={`/photo/${post.postId}/${post.medias[fileIndex].mediaid}`}
                          key={file.mediaid}
                          className="w-full h-full"
                        >
                          <div
                            className="w-full h-full"
                            style={{
                              backgroundImage: "url(" + `${file.media}` + ")",
                              backgroundPosition: "top center",
                              backgroundSize: "cover",
                              backgroundRepeat: "no-repeat",
                            }}
                          ></div>
                        </Link>
                      );
                    })}
                  </div>

                  <div className="flex flex-col w-1/2 h-full space-y-1">
                    {post.medias.slice(2, 4).map((file) => {
                      const fileIndex = post.medias.findIndex((_file) => {
                        return file.mediaid === _file.mediaid;
                      });
                      return (
                        <Link
                          href={`/photo/${post.postId}/${post.medias[fileIndex].mediaid}`}
                          key={file.mediaid}
                          className="w-full h-full"
                        >
                          <div
                            className="w-full h-full"
                            style={{
                              backgroundImage: "url(" + `${file.media}` + ")",
                              backgroundPosition: "top center",
                              backgroundSize: "cover",
                              backgroundRepeat: "no-repeat",
                            }}
                          ></div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
              {post.medias.length === 3 && (
                <div className="flex w-full h-full space-x-1">
                  <div className="flex flex-col w-1/2 h-full space-y-1">
                    {post.medias.slice(0, 2).map((file) => {
                      const fileIndex = post.medias.findIndex((_file) => {
                        return file.mediaid === _file.mediaid;
                      });
                      return (
                        <Link
                          className="block w-full h-[15.5rem]"
                          href={`/photo/${post.postId}/${post.medias[fileIndex].mediaid}`}
                          key={file.mediaid}
                        >
                          <div
                            className="w-full h-full"
                            style={{
                              backgroundImage: "url(" + `${file.media}` + ")",
                              backgroundPosition: "top center",
                              backgroundSize: "cover",
                              backgroundRepeat: "no-repeat",
                            }}
                          ></div>
                        </Link>
                      );
                    })}
                  </div>
                  <Link
                    href={`/photo/${post.postId}/${post.medias[2].mediaid}`}
                    className="w-1/2 h-full"
                  >
                    <div
                      className="w-full h-full"
                      style={{
                        backgroundImage:
                          "url(" + `${post.medias[2].media}` + ")",
                        backgroundPosition: "top center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                      }}
                    ></div>
                  </Link>
                </div>
              )}

              {post.medias.length === 2 && (
                <div className="flex w-full space-x-1 h-full">
                  {post.medias.map((file) => {
                    const fileIndex = post.medias.findIndex((_file) => {
                      return file.mediaid === _file.mediaid;
                    });
                    return (
                      <Link
                        className="w-full h-full block"
                        href={`/photo/${post.postId}/${post.medias[fileIndex].mediaid}`}
                        key={file.mediaid}
                      >
                        <div
                          className="w-full h-full"
                          style={{
                            backgroundImage: "url(" + `${file.media}` + ")",
                            backgroundPosition: "top center",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                          }}
                        ></div>
                      </Link>
                    );
                  })}
                </div>
              )}

              {post.medias.length === 1 && (
                <Link
                  href={`/photo/${post.postId}/${post.medias[0].mediaid}`}
                  className="w-full h-[31rem]"
                >
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: "url(" + `${post.medias[0].media}` + ")",
                      backgroundPosition: "top center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                </Link>
              )}
            </div>
          )}

          <div className="flex items-center justify-between px-2 mt-2 py-2 border-t border-b border-gray-300 relative">
            {renderReactionStatus()}
            {toShowReactionBox && (
              <div
                className="absolute left-0 bottom-12 z-[100] flex items-center py-2 px-2 bg-white shadow-lg space-x-1 rounded-2xl"
                onMouseLeave={handelMouseOutLike}
              >
                <Image
                  onClick={() => {
                    handelUpdateLike(post.postId, LoggedInUser.userid, "like");
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
                    handelUpdateLike(post.postId, LoggedInUser.userid, "love");
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
                    handelUpdateLike(post.postId, LoggedInUser.userid, "care");
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
                    handelUpdateLike(post.postId, LoggedInUser.userid, "lagh");
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
                    handelUpdateLike(post.postId, LoggedInUser.userid, "wow");
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
                    handelUpdateLike(post.postId, LoggedInUser.userid, "sad");
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
                    handelUpdateLike(post.postId, LoggedInUser.userid, "angry");
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
            <div className="flex items-center space-x-2 grow justify-center hover:bg-slate-50 px-3 py-1 rounded-md cursor-pointer">
              <FaRegComment className="w-6 h-6" />
              <span>
                {post.commentInfo.commentsCount}{" "}
                {`comment ${
                  parseInt(post.commentInfo.commentsCount) > 1 ? "s" : ""
                }`}
              </span>
            </div>

            <div className="flex items-center space-x-2 grow justify-center hover:bg-slate-50 px-3 py-1 rounded-md cursor-pointer">
              <PiShareFat className="w-6 h-6" />
              <span>Share</span>
            </div>
          </div>

          <div className="px-6 py-2 ">
            {commentsData.loading ? (
              <CommentsSkeleton />
            ) : (
              <>
                {commentsData.comments &&
                  commentsData.comments.map((comment) => {
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
                              src={comment.user.profilepic}
                              width={0}
                              height={0}
                              sizes="100vh"
                              className="w-9 h-9 object-cover rounded-full ring-2 ring-offset-2 ring-blue-400"
                            />
                          </Link>
                          <div
                            className={
                              "absolute group-hover:block hidden w-96 z-[500]  -left-32 rounded-lg  p-4  bg-white shadow-lg"
                            }
                          >
                            <div className="flex space-x-3">
                              <Image
                                unoptimized
                                className="w-20 h-20 rounded-full  object-cover"
                                alt="Amanuel Ferede"
                                src={comment.user.profilepic}
                                width={0}
                                height={0}
                                sizes="100vh"
                              />

                              <div className=" flex-col space-y-2 flex-1 mt-3">
                                <p className="text-lg font-bold">
                                  Amanuel Ferede
                                </p>
                                <p className="">
                                  Lives in AddisAbaba Ethiopia{" "}
                                </p>
                                <p>
                                  Studid Civil Engineering at BahirDar
                                  University
                                </p>
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
                            <p className="font-semibold">Amanuel Ferede</p>
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
              </>
            )}
          </div>
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
    </section>
  );
}
