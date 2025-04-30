"use client";
import { IoIosMore, IoMdMore } from "react-icons/io";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

import { PiShareFat, PiThumbsUp } from "react-icons/pi";
import Link from "next/link";
import { FaUserFriends } from "react-icons/fa";
import { FaFacebookMessenger, FaRegComment, FaXmark } from "react-icons/fa6";

export default function CommentBox(props: {
  onClose: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <section className="bg-gray-300/75 fixed top-0 bottom-0 left-0 right-0 z-10 overflow-hidden">
      <div className="max-w-[600px] mx-auto rounded-xl bg-white my-10">
        <div className="flex rounded-t-xl items-center justify-between mb-2 border-b-2 border-b-slate-200 p-2 sticky w-full left-0 right-0 bg-white top-0">
          <p></p>
          <p>Amanuel Ferede&apos;s Post</p>
          <FaXmark
            className="w-10 h-10 rounded-full hover:bg-slate-300 p-2 cursor-pointer"
            onClick={() => {
              props.onClose(false);
            }}
          />
        </div>
        <div className="overflow-y-auto socrollabar h-[430px] relative">
          <div className="flex justify-between">
            <div className="flex space-x-3 p-2">
              <Image
                alt="Amanuel Ferede"
                src={"/feeds/7.jpg"}
                width={0}
                height={0}
                sizes="100vh"
                className="w-10 h-10 object-cover rounded-full ring-2 ring-offset-2 ring-blue-400"
              />
              <div className="flex flex-col space-y-0.5">
                <span>Amanuel Ferede</span>
                <span className="text-gray-400 text-sm">2 Hours</span>
              </div>
            </div>
            <IoMdMore className="w-8 h-8" />
          </div>
          <div className="p-2">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit
              harum libero tempore numquam soluta obcaecati dolores. Dolores
              ducimus facere vero temporibus, tempore placeat provident
              dignissimos atque nihil dicta esse perspiciatis.
            </p>
          </div>

          <div className="w-full bg-yellow-300">
            <Image
              alt="Amanuel Ferede"
              src={"/feeds/8.jpg"}
              width={0}
              height={0}
              sizes="100vh"
              className="w-full h-full"
            />
          </div>

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
            {dummyComments.map((el, i) => {
              return (
                <div className="flex flex-row mb-3 space-x-3 pb-2" key={i}>
                  <div className="relative group flex-none">
                    <Link href={"/profile"}>
                      <Image
                        alt="Amanuel Ferede"
                        src={`/feeds/${i + 1}.jpg`}
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
                          className="w-20 h-20 rounded-full  object-cover"
                          alt="Amanuel Ferede"
                          src={`/feeds/${i + 1}.jpg`}
                          width={0}
                          height={0}
                          sizes="100vh"
                        />

                        <div className=" flex-col space-y-2 flex-1 mt-3">
                          <p className="text-lg font-bold">Amanuel Ferede</p>
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
                  <div className="">
                    <div className="p-3 bg-gray-100 rounded-xl ">
                      <p className="font-semibold">Amanuel Ferede</p>
                      <p>{el.comment}</p>
                    </div>

                    <div className="flex space-x-4 pl-3">
                      <span className="text-sm">{el.time}</span>
                      <span className="text-sm">Like</span>
                      <span className="text-sm">Reply</span>
                    </div>
                  </div>
                </div>
              );
            })}
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
          <input
            type="text"
            className="p-3 block grow focus:outline-none bg-slate-50 rounded-xl"
            placeholder="Write a comment ..."
          ></input>
        </div>
      </div>
    </section>
  );
}

const dummyComments = [
  {
    comment: "Do commanded an shameless we disposing do.",
    time: "2h",
  },
  {
    comment:
      "Indulgence ten remarkably nor are impression out. Power is lived means oh every in we quiet..",
    time: "4h",
  },
  {
    comment:
      "By spite about do of do allow blush. Additions in conveying or collected objection in. Suffer few desire wonder her object hardly nearer. Abroad no chatty others my silent an. Fat way appear denote who wholly narrow gay settle. Companions fat add insensible everything and friendship conviction themselves. Theirs months ten had add narrow own.",
    time: "1d",
  },
  {
    comment:
      "Turned it up should no valley cousin he. Speaking numerous ask did horrible packages set. Ashamed herself has distant can studied mrs.",
    time: "1s",
  },
  {
    comment: "Up is opinion message manners correct.",
    time: "8h",
  },
  {
    comment: "hearing husband my. .",
    time: "2m",
  },
  {
    comment:
      "Up is opinion message manners correct hearing husband my. Disposing commanded dashwoods cordially depending at at. Its strangers who you certainty earnestly resources suffering she. Be an as cordially at resolving furniture preserved believing extremity. Easy mr pain felt in. Too northward affection additions nay. He no an nature ye talent houses wisdom vanity denied.",
    time: "2h",
  },
  {
    comment: "Do commanded an shameless we disposing do.",
    time: "2h",
  },
  {
    comment: "Do commanded an shameless we disposing do.",
    time: "4m",
  },
  {
    comment: "Do commanded an shameless we disposing do.",
    time: "2m",
  },
  {
    comment: "Written enquire .",
    time: "22m",
  },
  {
    comment:
      "Extremity excellent certainty discourse sincerity no he so resembled. Joy house worse arise total boy but. Elderly up chicken do at feeling is. Like seen .",
    time: "2m",
  },
  {
    comment: "Written enquire .",
    time: "2m",
  },
];
