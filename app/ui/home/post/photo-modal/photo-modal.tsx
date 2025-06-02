"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { FaRegComment, FaXmark } from "react-icons/fa6";
import { GrNext, GrPrevious } from "react-icons/gr";
import { IoMdMore, IoMdThumbsUp } from "react-icons/io";
import { IoHeartCircle } from "react-icons/io5";

import { PiShareFat, PiThumbsUp } from "react-icons/pi";
import { PhotoModalProps } from "./types";
export default function PhotoModal(props: PhotoModalProps) {
  const currentPhotoIndexFromProp = props.photos.findIndex((photo) => {
    return photo.mediaid === props.photo[0].mediaid;
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
      return props.photos[0].media;
    } else if (currentPhotoIndex < 0) {
      return props.photos[props.photos.length - 1].media;
    } else {
      return props.photos[currentPhotoIndex].media;
    }
  };
  return (
    <div className="grid grid-cols-12 gap-3 h-screen fixed top-0 bottom-0 left-0 z-50">
      <div className="lg:col-span-9 col-span-12">
        <div className="w-full h-screen lg:z-20 px-4 bg-black relative">
          <div className="absolute top-2 left-2 flex items-center">
            <Link href={"/"} scroll={false} className=" cursor-pointer">
              <FaXmark className="w-14 h-14 text-white rounded-full p-2" />
            </Link>

            <Link href={"/"} scroll={false} className=" cursor-pointer">
              <Image
                width={0}
                height={0}
                sizes="100vh"
                src={"/feeds/logoc.png"}
                alt="Logo"
                className="w-14 h-14 text-white rounded-full p-2"
              />
            </Link>
          </div>
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
