"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ChangeEvent,
  useState,
  KeyboardEvent,
  useEffect,
  useCallback,
  useRef,
} from "react";

import { FaFacebookMessenger, FaRegComment, FaXmark } from "react-icons/fa6";
import { GrNext, GrPrevious } from "react-icons/gr";
import { IoIosMore, IoMdMore } from "react-icons/io";

import { PiShareFat } from "react-icons/pi";
import { PhotoModalProps } from "./types";
import { FaUserFriends } from "react-icons/fa";

import { LoggedInUser } from "@/app/config/loggedinuser";

import ReactionIcons from "../../feed/reaction-icons/reaction-icons";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";

import CommentsSkeleton from "@/app/ui/skeletons/comments";
import NavBar2 from "../../sections/nav-bar2";
import {
  setAPost,
  setMediaComments,
  updateAPostWithCommentInfo,
  updateAPostWithReactionInfo,
} from "@/app/store/slices/user/post/postSlice";
import {
  mComment,
  mComments,
  mReact,
  mReReact,
} from "@/app/libs/actions/media";
export default function PhotoModal(props: PhotoModalProps) {
  const dispatch = useAppDispatch();
  const postInfo = useAppSelector((state) => state.userPost.aPost);
  useEffect(() => {
    dispatch(setAPost(props.post));
  }, [dispatch, props.post]);

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>(0);
  const currentPhotoIndexFromProp = postInfo?.medias.findIndex((media) => {
    return media.mediaId === props.mediaId;
  });

  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const observer = useRef<IntersectionObserver>(null);

  const lastPostElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          const newPage = page + 1;
          setPage(newPage);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, page]
  );

  const [toShowReactionBox, settoShowReactionBox] = useState<boolean>(false);
  const [timeOutId, setTimeOutId] = useState<NodeJS.Timeout>();

  const [comment, setComment] = useState<string>("");

  useEffect(() => {
    setCurrentPhotoIndex(currentPhotoIndexFromProp!);
  }, [currentPhotoIndexFromProp]);
  console.log("currentPhotoIndex", currentPhotoIndex);

  const renderCommentCount = () => {
    if (!postInfo) {
      return;
    }
    if (parseInt(postInfo.medias[currentPhotoIndex]?.commentInfo.count) > 0) {
      return (
        <div className="flex items-center space-x-0">
          <p>{postInfo.medias[currentPhotoIndex]?.commentInfo.count}</p>
          <FaRegComment className="w-5 h-5 fill-gray-500" />
        </div>
      );
    } else {
      return null;
    }
  };

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

  const renderReactionGroupIcons = () => {
    if (!postInfo) {
      return;
    }
    if (
      postInfo.medias[currentPhotoIndex]?.reactionInfo.reactionGroup.length > 0
    ) {
      return postInfo.medias[currentPhotoIndex]?.reactionInfo.reactionGroup.map(
        (gr, index) => {
          return <ReactionIcons key={index} reactiontype={gr.reactionType} />;
        }
      );
    }
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
    if (!postInfo || !comment) {
      return;
    }
    if (e.key === "Enter") {
      try {
        const insertedComment = await mComment(
          LoggedInUser,
          props.postId,
          postInfo.medias[currentPhotoIndex]?.mediaId,
          comment
        );
        if (insertedComment) {
          dispatch(
            updateAPostWithCommentInfo({
              mediaId: postInfo.medias[currentPhotoIndex]?.mediaId,
              postId: props.postId,
              comment: insertedComment,
            })
          );

          setComment("");
        }
      } catch (error) {
        console.error(`error ${error}`);
      }
    }
  };

  const renderComments = () => {
    if (!postInfo) {
      return;
    }
    if (postInfo.commentInfo.comments.loading) {
      return <CommentsSkeleton />;
    }
    return postInfo.commentInfo.comments.comments.map((comment, index) => {
      return (
        <div
          className="flex flex-row mb-3 space-x-3 pb-2"
          key={comment.commentId}
          ref={
            postInfo.commentInfo.comments.comments.length === index + 1
              ? lastPostElementRef
              : null
          }
        >
          <div className=" group flex-none">
            <Link href={"/profile"}>
              {comment?.user?.profilePic ? (
                <Image
                  unoptimized
                  alt="Amanuel Ferede"
                  src={comment?.user?.profilePic}
                  width={0}
                  height={0}
                  sizes="100vh"
                  className="w-9 h-9 object-cover rounded-full ring-2 ring-offset-2 ring-blue-400"
                />
              ) : null}
            </Link>
            <div
              className={
                "absolute group-hover:block hidden w-96 z-[500] right-4 rounded-lg  p-4  bg-white shadow-lg"
              }
            >
              <div className="flex space-x-3">
                {comment?.user?.profilePic ? (
                  <Image
                    unoptimized
                    alt="Amanuel Ferede"
                    src={comment?.user?.profilePic}
                    width={0}
                    height={0}
                    sizes="100vh"
                    className="w-9 h-9 object-cover rounded-full ring-2 ring-offset-2 ring-blue-400"
                  />
                ) : null}

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
                {comment?.user?.fName} {comment?.user?.lName}
              </p>
              <p>{comment?.comment}</p>
            </div>

            <div className="flex space-x-4 pl-3">
              <span className="text-sm"></span>
              <span className="text-sm">Like</span>
              <span className="text-sm">Reply</span>
            </div>
          </div>
        </div>
      );
    });
  };

  const showNextPhoto = () => {
    if (!postInfo) {
      return;
    }
    if (currentPhotoIndex >= postInfo.medias.length - 1) {
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
    if (!postInfo) {
      return;
    }
    if (currentPhotoIndex <= 0) {
      setCurrentPhotoIndex(postInfo.medias.length - 1);
    } else {
      const newIndex = currentPhotoIndex - 1;
      setCurrentPhotoIndex(newIndex);
    }
  };

  const showExactPhoto = () => {
    if (!postInfo) {
      return;
    }

    if (currentPhotoIndex > postInfo.medias.length - 1) {
      return postInfo.medias[0]?.media;
    } else if (currentPhotoIndex < 0) {
      return postInfo.medias[postInfo.medias.length - 1]?.media;
    } else {
      return postInfo.medias[currentPhotoIndex]?.media;
    }
  };

  const renderReactionState = () => {
    if (!postInfo) {
      return;
    }
    if (
      parseInt(postInfo.medias[currentPhotoIndex]?.reactionInfo.reactions) === 1
    ) {
      return (
        <p>
          {
            postInfo.medias[currentPhotoIndex]?.reactionInfo.firstReactorInfo
              .reactor
          }
        </p>
      );
    }

    if (
      parseInt(postInfo.medias[currentPhotoIndex]?.reactionInfo.reactions) >
        1 &&
      postInfo.medias[currentPhotoIndex]?.reactionInfo.isReacted
    ) {
      return (
        <p>
          You and{" "}
          {parseInt(
            postInfo.medias[currentPhotoIndex]?.reactionInfo.reactions
          ) - 1}{" "}
          Other
          {parseInt(
            postInfo.medias[currentPhotoIndex]?.reactionInfo.reactions
          ) -
            1 >=
          1
            ? "s"
            : ""}
        </p>
      );
    }
  };
  const handelReaction = async (
    postId: string,
    userId: string,
    reactionType: string
  ) => {
    if (!postInfo) {
      return;
    }
    try {
      clearTimeout(timeOutId);
      settoShowReactionBox(false);

      const updatedPostMediaReactions = await mReact(
        postId,
        userId,
        postInfo.medias[currentPhotoIndex].mediaId,
        reactionType
      );

      console.log(updatedPostMediaReactions);

      if (updatedPostMediaReactions) {
        dispatch(
          updateAPostWithReactionInfo({
            mediaId: postInfo.medias[currentPhotoIndex]?.mediaId,
            postId: props.postId,
            reactionInfo: updatedPostMediaReactions,
          })
        );
      }
    } catch (error) {
      clearTimeout(timeOutId);
      settoShowReactionBox(false);
      console.error(`error ${error}`);
    }
  };
  const renderReactionStatus = () => {
    if (!postInfo) {
      return;
    }
    if (
      postInfo.medias[currentPhotoIndex]?.reactionInfo.isReacted &&
      postInfo.medias[currentPhotoIndex]?.reactionInfo.reactionType === "like"
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
      postInfo.medias[currentPhotoIndex]?.reactionInfo.isReacted &&
      postInfo.medias[currentPhotoIndex]?.reactionInfo.reactionType === "love"
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
      postInfo.medias[currentPhotoIndex]?.reactionInfo.isReacted &&
      postInfo.medias[currentPhotoIndex]?.reactionInfo.reactionType === "lagh"
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
      postInfo.medias[currentPhotoIndex]?.reactionInfo.isReacted &&
      postInfo.medias[currentPhotoIndex]?.reactionInfo.reactionType === "care"
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
      postInfo.medias[currentPhotoIndex]?.reactionInfo.isReacted &&
      postInfo.medias[currentPhotoIndex]?.reactionInfo.reactionType === "angry"
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
      postInfo.medias[currentPhotoIndex]?.reactionInfo.isReacted &&
      postInfo.medias[currentPhotoIndex]?.reactionInfo.reactionType === "sad"
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
      postInfo.medias[currentPhotoIndex]?.reactionInfo.isReacted &&
      postInfo.medias[currentPhotoIndex]?.reactionInfo.reactionType === "wow"
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
      !postInfo.medias[currentPhotoIndex]?.reactionInfo.isReacted &&
      (postInfo.medias[currentPhotoIndex]?.reactionInfo.reactionType ===
        undefined ||
        postInfo.medias[currentPhotoIndex]?.reactionInfo.reactionType === "")
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
    if (!postInfo) {
      return;
    }
    try {
      settoShowReactionBox(false);

      const updatedMediaReactionInfo = await mReReact(
        postId,
        userId,
        postInfo.medias[currentPhotoIndex]?.mediaId,
        reactionType
      );

      if (updatedMediaReactionInfo) {
        dispatch(
          updateAPostWithReactionInfo({
            mediaId: postInfo.medias[currentPhotoIndex]?.mediaId,
            postId: props.postId,
            reactionInfo: updatedMediaReactionInfo,
          })
        );
      }
    } catch (error) {
      console.error(`error while updating reactions ${error}`);
      settoShowReactionBox(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchMediaComments = async () => {
      if (!postInfo) {
        return;
      }
      const mediaComments = await mComments(
        props.postId,
        postInfo.medias[currentPhotoIndex].mediaId,
        page
      );
      if (mediaComments) {
        dispatch(
          setMediaComments({
            postId: props.postId,
            mediaId: props.mediaId,
            comments: mediaComments,
          })
        );
        setLoading(false);
      }
    };
    fetchMediaComments();
  }, [
    currentPhotoIndex,
    dispatch,
    page,
    postInfo,
    props.mediaId,
    props.postId,
  ]);

  useEffect(() => {
    console.log(postInfo);
  }, [postInfo]);

  return (
    <>
      <div className="fixed top-0 left-0 bottom-0 right-0 z-50">
        <div className=" grid grid-cols-12 gap-3 ">
          <div className="lg:col-span-9 col-span-12 h-screen bg-black relative">
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
            {postInfo && postInfo.medias.length > 1 && (
              <GrPrevious
                onClick={showPreviousPhoto}
                className="absolute cursor-pointer top-1/2 p-3 translate-y-1/2 left-8 w-12 h-12 rounded-full bg-white hover:bg-white/70"
              />
            )}

            {postInfo && postInfo.medias.length > 1 && (
              <GrNext
                onClick={showNextPhoto}
                className="absolute cursor-pointer top-1/2 p-3 translate-y-1/2 right-8 w-12 h-12 rounded-full bg-white hover:bg-white/70"
              />
            )}

            {postInfo && (
              <Image
                unoptimized
                alt="Amanuel Ferede"
                src={showExactPhoto()!}
                width={0}
                height={0}
                sizes="100vh"
                className="w-full h-full object-scale-down"
              />
            )}
          </div>
          <div className="lg:col-span-3 bg-white col-span-12">
            <div className="h-[90vh] overflow-y-auto pb-72">
              <NavBar2 />
              <div className="flex items-center justify-between py-3 mb-3 pr-3 border-b border-gray-200">
                <p className="text-sm">This is photo is from a post</p>
                <p className="text-sm">View Post</p>
              </div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center space-x-2">
                  {postInfo?.user.profilePic ? (
                    <Image
                      alt="Amanuel Ferede"
                      src={postInfo?.user.profilePic}
                      width={0}
                      height={0}
                      sizes="100vh"
                      className="w-10 h-10 rounded-full object-fill"
                    />
                  ) : null}
                  <div className="flex flex-col">
                    <p>
                      {postInfo && postInfo.user.fName}{" "}
                      {postInfo && postInfo.user.lName}
                    </p>
                    <p>March 27 at 3:34 pm</p>
                  </div>
                </div>
                <IoMdMore className="w-7 h-7" />
              </div>
              <div className="flex items-center space-x justify-between px-2">
                <div className="flex items-center space-x-0 ">
                  <div className="flex space-x-0">
                    {renderReactionGroupIcons()}
                  </div>
                  <p>{renderReactionState()}</p>
                </div>

                <p>{renderCommentCount()}</p>
              </div>
              <div className=" flex mb-4 items-center justify-between border-t border-t-gray-300 relative">
                {renderReactionStatus()}
                {toShowReactionBox && (
                  <div
                    className="absolute -left-1 bottom-12 z-[499] flex items-center py-2 px-2 bg-white shadow-lg space-x-1 rounded-2xl"
                    onMouseOver={handelOverMouseOutBox}
                    onMouseLeave={handelonMouseLeaveReactionBox}
                  >
                    <Image
                      onClick={() => {
                        handelUpdateLike(
                          props.postId,
                          LoggedInUser.userid,
                          "like"
                        );
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
                        handelUpdateLike(
                          props.postId,
                          LoggedInUser.userid,
                          "love"
                        );
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
                        handelUpdateLike(
                          props.postId,
                          LoggedInUser.userid,
                          "care"
                        );
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
                        handelUpdateLike(
                          props.postId,
                          LoggedInUser.userid,
                          "lagh"
                        );
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
                        handelUpdateLike(
                          props.postId,
                          LoggedInUser.userid,
                          "wow"
                        );
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
                        handelUpdateLike(
                          props.postId,
                          LoggedInUser.userid,
                          "sad"
                        );
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
                        handelUpdateLike(
                          props.postId,
                          LoggedInUser.userid,
                          "angry"
                        );
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

              <div className="px-3 h-full">{renderComments()}</div>
            </div>

            <div className=" sticky z-[100] rounded-b-xl flex bg-white space-x-2 bottom-0 left-0 right-0 p-2 w-full">
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
      </div>
    </>
  );
}
