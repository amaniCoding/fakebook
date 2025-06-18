"use client";
import Image from "next/image";
import Link from "next/link";
import { IoIosMore, IoMdMore } from "react-icons/io";
import { FaFacebookMessenger, FaUserFriends } from "react-icons/fa";
import CommentItem from "../comment/comment-item/comment-item";
import { FeedItemType } from "./types";
import { useState } from "react";

export default function FeedItem({ feed, ref }: FeedItemType) {
  const [isMore, setIsMore] = useState<boolean>(false);

  return (
    <div className="py-2 bg-white rounded-lg mb-4 shadow-md" ref={ref}>
      <div className="flex justify-between">
        <div className="flex space-x-3 px-6 pt-2">
          <div className="flex-col space-y-0.5 relative group">
            <Link href={"/profile"}>
              <Image
                unoptimized
                alt="Amanuel Ferede"
                src={feed.user.profilePic}
                width={0}
                height={0}
                sizes="100vh"
                className="w-10 h-10 object-cover rounded-full ring-2 ring-offset-2 ring-blue-400"
              />
            </Link>

            <div
              className={
                "absolute group-hover:block hidden w-96 z-10  -left-32 rounded-lg  p-4  bg-white shadow-lg"
              }
            >
              <div className="flex space-x-3">
                <Image
                  unoptimized
                  className="w-20 h-20 rounded-full  object-cover"
                  alt="Amanuel Ferede"
                  src={feed.user.profilePic}
                  width={0}
                  height={0}
                  sizes="100vh"
                />

                <div className=" flex-col space-y-2 flex-1 mt-3">
                  <p className="text-lg font-bold">
                    {feed.user.fName} {feed.user.lName}
                  </p>
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
          <div>
            <div className="flex-col space-y-0.5 relative group">
              <Link href={"/profile"} className="peer block">
                <span className="font-semibold">
                  {feed.user.fName} {feed.user.lName}
                </span>
              </Link>
              <div
                className={
                  "absolute group-hover:block hidden w-96 z-10  -left-32 rounded-lg  p-4  bg-white shadow-lg"
                }
              >
                <div className="flex space-x-3">
                  <Image
                    unoptimized
                    className="w-20 h-20 rounded-full  object-cover"
                    alt="Amanuel Ferede"
                    src={feed.user.profilePic}
                    width={0}
                    height={0}
                    sizes="100vh"
                  />

                  <div className=" flex-col space-y-2 flex-1 mt-3">
                    <p className="text-lg font-bold">
                      {feed.user.fName} {feed.user.lName}
                    </p>
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
            <span className="text-gray-400 text-sm">2 Hours</span>
          </div>
        </div>
        <IoMdMore className="w-8 h-8" />
      </div>
      <div className="px-5 mb-3 mt-2">
        {!isMore ? (
          <p>
            {feed.post?.substring(0, 170)}
            <span
              className="cursor-pointer"
              onClick={() => {
                setIsMore(true);
              }}
            >
              {" "}
              {feed.post?.length > 170 ? "...more" : ""}
            </span>
          </p>
        ) : (
          <p>{feed.post}</p>
        )}
      </div>
      {feed.medias.length > 0 && (
        <div className="w-full h-[31rem]">
          {feed.medias.length > 5 && (
            <div className="flex w-full h-full space-x-1">
              <div className="w-1/2 h-full flex flex-col space-y-1">
                {feed.medias.slice(0, 3).map((file) => {
                  const fileIndex = feed.medias.findIndex((_file) => {
                    return file.mediaId === _file.mediaId;
                  });
                  return (
                    <Link
                      className="w-full h-[10.5rem] block"
                      href={`/photo/${feed.postId}/${feed.medias[fileIndex].mediaId}`}
                      key={file.mediaId}
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
                {feed.medias.slice(3, 4).map((file) => {
                  const fileIndex = feed.medias.findIndex((_file) => {
                    return file.mediaId === _file.mediaId;
                  });
                  return (
                    <Link
                      href={`/photo/${feed.postId}/${feed.medias[fileIndex].mediaId}`}
                      key={file.mediaId}
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
                  href={`/photo/${feed.postId}/${feed.medias[5].mediaId}`}
                  className="block w-full h-[15.5rem] grow relative"
                >
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: "url(" + `${feed.medias[5].media}` + ")",
                      backgroundPosition: "top center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/45 flex items-center justify-center">
                      <p className="text-white">{feed.medias.length - 5} +</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          )}
          {feed.medias.length === 5 && (
            <div className="flex h-full w-full space-x-1">
              <div className="flex flex-col w-1/2 space-y-1">
                {feed.medias.slice(0, 3).map((file) => {
                  const fileIndex = feed.medias.findIndex((_file) => {
                    return file.mediaId === _file.mediaId;
                  });
                  return (
                    <Link
                      className="w-full h-[10.5rem]"
                      href={`/photo/${feed.postId}/${feed.medias[fileIndex].mediaId}`}
                      key={file.mediaId}
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
              <div className="flex w-1/2 flex-col space-y-1">
                {feed.medias.slice(3, 6).map((file) => {
                  const fileIndex = feed.medias.findIndex((_file) => {
                    return file.mediaId === _file.mediaId;
                  });
                  return (
                    <Link
                      className="w-full h-[15.5rem] grow"
                      href={`/photo/${feed.postId}/${feed.medias[fileIndex].mediaId}`}
                      key={file.mediaId}
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
          {feed.medias.length === 4 && (
            <div className="flex h-full space-x-1">
              <div className="flex flex-col space-y-1 w-1/2 h-full">
                {feed.medias.slice(0, 2).map((file) => {
                  const fileIndex = feed.medias.findIndex((_file) => {
                    return file.mediaId === _file.mediaId;
                  });
                  return (
                    <Link
                      href={`/photo/${feed.postId}/${feed.medias[fileIndex].mediaId}`}
                      key={file.mediaId}
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
                {feed.medias.slice(2, 4).map((file) => {
                  const fileIndex = feed.medias.findIndex((_file) => {
                    return file.mediaId === _file.mediaId;
                  });
                  return (
                    <Link
                      href={`/photo/${feed.postId}/${feed.medias[fileIndex].mediaId}`}
                      key={file.mediaId}
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
          {feed.medias.length === 3 && (
            <div className="flex w-full h-full space-x-1">
              <div className="flex flex-col w-1/2 h-full space-y-1">
                {feed.medias.slice(0, 2).map((file) => {
                  const fileIndex = feed.medias.findIndex((_file) => {
                    return file.mediaId === _file.mediaId;
                  });
                  return (
                    <Link
                      className="block w-full h-[15.5rem]"
                      href={`/photo/${feed.postId}/${feed.medias[fileIndex].mediaId}`}
                      key={file.mediaId}
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
                href={`/photo/${feed.postId}/${feed.medias[2].mediaId}`}
                className="w-1/2 h-full"
              >
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: "url(" + `${feed.medias[2].media}` + ")",
                    backgroundPosition: "top center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                ></div>
              </Link>
            </div>
          )}

          {feed.medias.length === 2 && (
            <div className="flex w-full space-x-1 h-full">
              {feed.medias.map((file) => {
                const fileIndex = feed.medias.findIndex((_file) => {
                  return file.mediaId === _file.mediaId;
                });
                return (
                  <Link
                    className="w-full h-full block"
                    href={`/photo/${feed.postId}/${feed.medias[fileIndex].mediaId}`}
                    key={file.mediaId}
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

          {feed.medias.length === 1 && (
            <div className="flex w-full space-x-1 h-full">
              <Link
                className="w-full h-full block"
                href={`/photo/${feed.postId}/${feed.medias[0].mediaId}`}
                key={feed.medias[0].media}
              >
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: "url(" + `${feed.medias[0].media}` + ")",
                    backgroundPosition: "top center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                ></div>
              </Link>
            </div>
          )}
        </div>
      )}

      <CommentItem feed={feed} refer="" />
    </div>
  );
}
