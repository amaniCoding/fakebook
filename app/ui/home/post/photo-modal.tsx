"use client";

import { QueryResultRow } from "@vercel/postgres";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { FaRegComment, FaXmark } from "react-icons/fa6";
import { GrNext, GrPrevious } from "react-icons/gr";
import { IoMdMore, IoMdThumbsUp } from "react-icons/io";
import { IoHeartCircle } from "react-icons/io5";

import { PiShareFat, PiThumbsUp } from "react-icons/pi";
export default function PhotoModal(props: {
  photo: QueryResultRow;
  photos: QueryResultRow[];
}) {
  const currentPhotoIndexFromProp = props.photos.findIndex((photo) => {
    return photo.photoid === props.photo[0].photoid;
  });
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(
    currentPhotoIndexFromProp
  );
  console.log(currentPhotoIndex);
  const showNextPhoto = () => {
    if (currentPhotoIndex > props.photos.length - 1) {
      setCurrentPhotoIndex(0);
    } else {
      const newIndex = currentPhotoIndex + 1;
      setCurrentPhotoIndex(newIndex);
    }
  };

  const showPreviousPhoto = () => {
    if (currentPhotoIndex < 0) {
      setCurrentPhotoIndex(props.photos.length - 1);
    } else {
      const newIndex = currentPhotoIndex - 1;
      setCurrentPhotoIndex(newIndex);
    }
  };

  const showExactPhoto = () => {
    if (currentPhotoIndex > props.photos.length - 1) {
      return props.photos[0].photo;
    } else if (currentPhotoIndex < 0) {
      return props.photos[props.photos.length - 1].photo;
    } else {
      return props.photos[currentPhotoIndex].photo;
    }
  };
  return (
    <div className="grid grid-cols-12 gap-3 h-screen">
      <div className="lg:col-span-9 col-span-12 relative">
        <div className="w-full h-screen lg:sticky lg:left-0 lg:right-0 lg:bottom-3 lg:top-0 lg:z-20 px-4 bg-black">
          <Link
            href={"/"}
            scroll={false}
            className=" cursor-pointer absolute left-6 top-3"
          >
            <FaXmark className="w-9 h-9 fill-white" />
          </Link>
          {props.photos.length > 1 && (
            <GrPrevious
              onClick={showPreviousPhoto}
              className="absolute cursor-pointer top-1/2 p-3 translate-y-1/2 left-8 w-12 h-12 rounded-full bg-white hover:bg-white/70"
            />
          )}

          {props.photos.length > 1 && (
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
      <div className="lg:col-span-3 col-span-12 mt-16 overflow-y-scroll socrollabar">
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
              <p>Amanuel</p>
              <p>March 27 at 3:34 pm</p>
            </div>
          </div>
          <IoMdMore className="w-7 h-7" />
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex -space-x-1">
            <IoMdThumbsUp className="w-6 h-6 fill-blue-500" />
            <IoHeartCircle className="w-6 h-6 fill-pink-500" />
          </div>
          <p>5</p>
        </div>
        <div className="flex mb-4 items-center justify-between mt-2 px-2 border-t border-t-gray-300 p-1">
          <div className="flex items-center space-x-3 hover:bg-slate-50 px-4 py-1.5 grow justify-center rounded-md cursor-pointer">
            <PiThumbsUp className="w-6 h-6" />
          </div>
          <div className="flex items-center space-x-3 hover:bg-slate-50 px-4 py-1.5 grow justify-center rounded-md cursor-pointer">
            <FaRegComment className="w-6 h-6" />
          </div>

          <div className="flex items-center space-x-3 hover:bg-slate-50 px-4 py-1.5 grow justify-center rounded-md cursor-pointer">
            <PiShareFat className="w-6 h-6" />
          </div>
        </div>

        <div className="px-3">
          {Array.from(Array(10).keys()).map((_, i) => {
            return (
              <div className="flex mb-3 space-x-3" key={i}>
                <Image
                  alt="Amanuel Ferede"
                  src={`/feeds/${i + 1}.jpg`}
                  width={0}
                  height={0}
                  sizes="100vh"
                  className="w-10 h-10 flex-none  rounded-full object-cover"
                />

                <p className="grow p-3 bg-gray-100 rounded-xl">
                  What is the method of using this plant? It has been almost
                  three months and I have a problem with sciatica and it is very
                  painful.
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
