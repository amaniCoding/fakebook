"use client";
import { IoIosMore, IoMdMore } from "react-icons/io";
import Image from "next/image";
import { PiShareFat, PiThumbsUp } from "react-icons/pi";
import Link from "next/link";
import { FaUserFriends } from "react-icons/fa";
import { FaFacebookMessenger, FaRegComment, FaXmark } from "react-icons/fa6";
import { Posts } from "@/app/libs/data/user/types";
import { useActionState, useEffect, useState } from "react";
import {
  commentAction,
  fetchCommentsAction,
} from "@/app/libs/actions/user/actions";
import {
  CommentStateAction,
  getCommentsStateAction,
} from "@/app/libs/actions/user/types";
import CommentsSkeleton from "@/app/ui/skeletons/comments";

export default function CommentBox({
  post,
  onClose,
}: {
  post: Posts;
  onClose: () => void;
}) {
  const [commentsData, setCommentsData] = useState<getCommentsStateAction>({
    loading: false,
    comments: [],
  });
  const insertCommentState: CommentStateAction = {
    loading: true,
    comment: {
      comment: "",
      date: "",
      user: {
        userid: "",
        fname: "",
        lname: "",
        profilepic: "",
      },
    },
  };

  const commentActionWith = commentAction.bind(
    null,
    post.user,
    post.post.postId
  );

  const [insertCommentsState, InsertComment] = useActionState(
    commentActionWith,
    insertCommentState
  );

  useEffect(() => {
    const fetchCommentsForUseEffect = async () => {
      const commdata = await fetchCommentsAction(post.post.postId);
      setCommentsData(commdata);
    };

    fetchCommentsForUseEffect();
  }, [post.post.postId]);

  console.log(commentsData.comments);

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
        <div className="overflow-y-auto socrollabar h-[430px] relative">
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
            <p>{post.post.post ? post.post.post : null}</p>
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
                          href={`/photo/${post.post.postId}/${post.medias[fileIndex].mediaid}`}
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
                          href={`/photo/${post.post.postId}/${post.medias[fileIndex].mediaid}`}
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
                      href={`/photo/${post.post.postId}/${post.medias[5].mediaid}`}
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
                          href={`/photo/${post.post.postId}/${post.medias[fileIndex].mediaid}`}
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
                          href={`/photo/${post.post.postId}/${post.medias[fileIndex].mediaid}`}
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
                          href={`/photo/${post.post.postId}/${post.medias[fileIndex].mediaid}`}
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
                          href={`/photo/${post.post.postId}/${post.medias[fileIndex].mediaid}`}
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
                          href={`/photo/${post.post.postId}/${post.medias[fileIndex].mediaid}`}
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
                    href={`/photo/${post.post.postId}/${post.medias[2].mediaid}`}
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
                        href={`/photo/${post.post.postId}/${post.medias[fileIndex].mediaid}`}
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
                  href={`/photo/${post.post.postId}/${post.medias[0].mediaid}`}
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

          <div className="flex items-center justify-between px-2 mt-2 py-2 border-t border-b border-gray-300">
            <div className="flex items-center space-x-2 grow justify-center hover:bg-slate-50 px-3 py-1 rounded-md cursor-pointer">
              <PiThumbsUp className="w-6 h-6" />
              <span>Like</span>
            </div>
            <div className="flex items-center space-x-2 grow justify-center hover:bg-slate-50 px-3 py-1 rounded-md cursor-pointer">
              <FaRegComment className="w-6 h-6" />
              <span>Comment</span>
            </div>

            <div className="flex items-center space-x-2 grow justify-center hover:bg-slate-50 px-3 py-1 rounded-md cursor-pointer">
              <PiShareFat className="w-6 h-6" />
              <span>Share</span>
            </div>
          </div>

          <div className="px-6 py-2 ">
            {insertCommentsState.loading ? (
              <CommentsSkeleton />
            ) : (
              <div className="flex flex-row mb-3 space-x-3 pb-2">
                <div className="relative group flex-none">
                  <Link href={"/profile"}>
                    <Image
                      unoptimized
                      alt="Amanuel Ferede"
                      src={insertCommentState.comment.user.profilepic}
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
                        src={insertCommentState.comment.user.profilepic}
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
                    <p className="font-semibold">Amanuel Ferede</p>
                    <p>{insertCommentsState.comment.comment}</p>
                  </div>

                  <div className="flex space-x-4 pl-3">
                    <span className="text-sm">
                      {insertCommentsState.comment.date}
                    </span>
                    <span className="text-sm">Like</span>
                    <span className="text-sm">Reply</span>
                  </div>
                </div>
              </div>
            )}
            {commentsData.loading ? (
              <CommentsSkeleton />
            ) : (
              <>
                {commentsData.comments.map((comment) => {
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
                            src={comment.user.profilePic}
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
                              src={comment.user.profilePic}
                              width={0}
                              height={0}
                              sizes="100vh"
                            />

                            <div className=" flex-col space-y-2 flex-1 mt-3">
                              <p className="text-lg font-bold">
                                Amanuel Ferede
                              </p>
                              <p className="">Lives in AddisAbaba Ethiopia </p>
                              <p>
                                Studid Civil Engineering at BahirDar University
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
            src={"/feeds/4.jpg"}
            width={0}
            height={0}
            sizes="100vh"
            className="w-10 h-10 object-cover rounded-full block flex-none"
          />
          <form action={InsertComment}>
            <input
              type="text"
              className="p-3 block grow focus:outline-none bg-slate-50 rounded-xl"
              placeholder="Write a comment ..."
            ></input>
          </form>
        </div>
      </div>
    </section>
  );
}
