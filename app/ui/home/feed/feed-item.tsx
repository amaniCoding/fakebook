import Image from "next/image";
import Link from "next/link";
import { IoIosMore, IoMdMore } from "react-icons/io";
import { FaFacebookMessenger, FaUserFriends } from "react-icons/fa";
import CommentItem from "./comment/comment-item";
import { Photo } from "@/app/types/db/user";
type FeedItemType = {
  postId: string;
  fname: string;
  lname: string;
  profilepic: string;
  post: string;
  photos: Photo[];
};
export default async function FeedItem({
  postId,
  fname,
  lname,
  profilepic,
  post,
  photos,
}: FeedItemType) {
  return (
    <div className="py-2 bg-white rounded-lg mb-4 shadow-md">
      <div className="flex justify-between">
        <div className="flex space-x-3 px-6 pt-2">
          <div className="flex-col space-y-0.5 relative group">
            <Link href={"/profile"}>
              <Image
                alt="Amanuel Ferede"
                src={profilepic}
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
                  className="w-20 h-20 rounded-full  object-cover"
                  alt="Amanuel Ferede"
                  src={profilepic}
                  width={0}
                  height={0}
                  sizes="100vh"
                />

                <div className=" flex-col space-y-2 flex-1 mt-3">
                  <p className="text-lg font-bold">
                    {fname} {lname}
                  </p>
                  <p className="">Lives in AddisAbaba Ethiopia </p>
                  <p>Studid Vivil Engineering at BahirDar University</p>
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
                  {fname} {lname}
                </span>
              </Link>
              <div
                className={
                  "absolute group-hover:block hidden w-96 z-10  -left-32 rounded-lg  p-4  bg-white shadow-lg"
                }
              >
                <div className="flex space-x-3">
                  <Image
                    className="w-20 h-20 rounded-full  object-cover"
                    alt="Amanuel Ferede"
                    src={profilepic}
                    width={0}
                    height={0}
                    sizes="100vh"
                  />

                  <div className=" flex-col space-y-2 flex-1 mt-3">
                    <p className="text-lg font-bold">
                      {fname} {lname}
                    </p>
                    <p className="">Lives in AddisAbaba Ethiopia </p>
                    <p>Studid Vivil Engineering at BahirDar University</p>
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
      <p className="px-5 mb-3 mt-2">
        {post.length > 170 ? `${post.substring(0, 170)}... See more` : post}
      </p>
      <div className="w-full h-[31rem]">
        {photos.length > 5 && (
          <div className="flex w-full h-full space-x-2">
            <div className="flex flex-col space-y-2">
              {photos.slice(0, 3).map((file) => {
                const fileIndex = photos.findIndex((_file) => {
                  return file.photoid === _file.photoid;
                });
                return (
                  <Link
                    className="block w-full h-full"
                    href={`/photo/${postId}/${photos[fileIndex].photoid}`}
                    key={file.photoid}
                  >
                    <div
                      className="w-1/2 h-[10.5rem]"
                      style={{
                        backgroundImage: "url(" + `${file.photo}` + ")",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                      }}
                    ></div>
                  </Link>
                );
              })}
            </div>

            <div className="flex flex-col space-y-2">
              {photos.slice(3, 4).map((file) => {
                const fileIndex = photos.findIndex((_file) => {
                  return file.photoid === _file.photoid;
                });
                return (
                  <Link
                    href={`/photo/${postId}/${photos[fileIndex].photoid}`}
                    key={file.photoid}
                    className="block w-full h-full"
                  >
                    <div
                      className="w-1/2 h-[15.5rem] grow"
                      style={{
                        backgroundImage: "url(" + `${file.photo}` + ")",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                      }}
                    ></div>
                  </Link>
                );
              })}
              <div
                className="w-1/2 h-[15.5rem] relative"
                style={{
                  backgroundImage: "url(" + `${photos[5]}` + ")",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/65 flex items-center justify-center">
                  <p className="text-white">{photos.length - 5} +</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {photos.length === 5 && (
          <div className="flex h-[31rem] space-x-2">
            <div className="flex flex-col space-y-2">
              {photos.slice(0, 3).map((file) => {
                const fileIndex = photos.findIndex((_file) => {
                  return file.photoid === _file.photoid;
                });
                return (
                  <Link
                    href={`/photo/${postId}/${photos[fileIndex].photoid}`}
                    key={file.photoid}
                  >
                    <div
                      className="w-1/2 h-[10.5rem]"
                      style={{
                        backgroundImage: "url(" + `${file.photo}` + ")",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                      }}
                    ></div>
                  </Link>
                );
              })}
            </div>

            <div className="flex flex-col space-y-2">
              {photos.slice(3, 6).map((file) => {
                const fileIndex = photos.findIndex((_file) => {
                  return file.photoid === _file.photoid;
                });
                return (
                  <Link
                    href={`/photo/${postId}/${photos[fileIndex].photoid}`}
                    key={file.photoid}
                  >
                    <div
                      className="w-1/2 h-[15.5rem] grow"
                      style={{
                        backgroundImage: "url(" + `${file.photo}` + ")",
                        backgroundPosition: "center",
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
        {photos.length === 4 && (
          <div className="flex h-full space-x-1 bg-blue-500">
            <div className="flex flex-col space-y-1 w-1/2 h-full bg-green-400">
              {photos.slice(0, 2).map((file) => {
                const fileIndex = photos.findIndex((_file) => {
                  return file.photoid === _file.photoid;
                });
                return (
                  <Link
                    href={`/photo/${postId}/${photos[fileIndex].photoid}`}
                    key={file.photoid}
                    className="w-full h-full bg-red-500"
                  >
                    <div
                      className="w-full h-full"
                      style={{
                        backgroundImage: "url(" + `${file.photo}` + ")",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                      }}
                    ></div>
                  </Link>
                );
              })}
            </div>

            <div className="flex flex-col w-1/2 h-full space-y-2">
              {photos.slice(2, 4).map((file) => {
                const fileIndex = photos.findIndex((_file) => {
                  return file.photoid === _file.photoid;
                });
                return (
                  <Link
                    href={`/photo/${postId}/${photos[fileIndex].photoid}`}
                    key={file.photoid}
                    className="w-full h-full bg-red-500"
                  >
                    <div
                      className="w-full h-full"
                      style={{
                        backgroundImage: "url(" + `${file.photo}` + ")",
                        backgroundPosition: "center",
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
        {photos.length === 3 && (
          <div className="flex w-full h-full space-x-1">
            <div className="flex flex-col space-y-1">
              {photos.slice(0, 2).map((file) => {
                const fileIndex = photos.findIndex((_file) => {
                  return file.photoid === _file.photoid;
                });
                return (
                  <Link
                    className="block w-1/2 h-[15.5rem]"
                    href={`/photo/${postId}/${photos[fileIndex].photoid}`}
                    key={file.photoid}
                  >
                    <div
                      className=""
                      style={{
                        backgroundImage: "url(" + `${file.photo}` + ")",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                      }}
                    ></div>
                  </Link>
                );
              })}
            </div>
            <Link href={`/photo/${postId}/${photos[2].photoid}`}>
              <div
                className="w-1/2 h-[31.5rem]"
                style={{
                  backgroundImage: "url(" + `${photos[2].photo}` + ")",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
            </Link>
          </div>
        )}

        {photos.length === 2 &&
          photos.map((file) => {
            const fileIndex = photos.findIndex((_file) => {
              return file.photoid === _file.photoid;
            });
            return (
              <Link
                className="w-[259.9px] h-[31rem]"
                href={`/photo/${postId}/${photos[fileIndex].photoid}`}
                key={file.photoid}
              >
                <div
                  className="w-full h-full block"
                  style={{
                    backgroundImage: "url(" + `${file.photo}` + ")",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                ></div>
              </Link>
            );
          })}

        {photos.length === 1 && (
          <Link
            href={`/photo/${postId}/${photos[0].photoid}`}
            className="w-full h-[31rem]"
          >
            <div
              className="w-full h-full bg-red-400"
              style={{
                backgroundImage: "url(" + `${photos[0].photo}` + ")",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          </Link>
        )}
      </div>

      <CommentItem />
    </div>
  );
}
