"use client";
import Image from "next/image";
import { ReactionIconsProps } from "./types";

export default function ReactionIcons({
  onClick,
  reactiontype,
  onHover,
  index,
  activeIndex,
}: ReactionIconsProps) {
  if (reactiontype === "like") {
    return (
      <div
        className="relative cursor-pointer"
        onMouseEnter={() => {
          onHover(index);
        }}
      >
        <div
          className={`absolute bottom-0 w-6 h-[1px] bg-black ${
            index == activeIndex ? "block" : "hidden"
          }`}
        ></div>
        <Image
          alt="Amanuel Ferede"
          src={"/reactions/like.png"}
          width={0}
          height={0}
          onClick={() => {
            onClick("like");
          }}
          sizes="100vh"
          className="w-6 h-6 object-cover rounded-full block flex-none"
        />
      </div>
    );
  }
  if (reactiontype === "love") {
    return (
      <div
        className="relative cursor-pointer"
        onMouseEnter={() => {
          onHover(index);
        }}
      >
        <div
          className={`absolute bottom-0 w-6 h-[1px] bg-black ${
            index == activeIndex ? "block" : "hidden"
          }`}
        ></div>
        <Image
          alt="Amanuel Ferede"
          src={"/reactions/love.png"}
          width={0}
          height={0}
          onClick={() => {
            onClick("love");
          }}
          sizes="100vh"
          className="w-6 h-6 object-cover rounded-full block flex-none"
        />
      </div>
    );
  }

  if (reactiontype === "care") {
    return (
      <div
        className="relative cursor-pointer"
        onMouseEnter={() => {
          onHover(index);
        }}
      >
        <div
          className={`absolute bottom-0 w-6 h-[1px] bg-black ${
            index == activeIndex ? "block" : "hidden"
          }`}
        ></div>
        <Image
          alt="Amanuel Ferede"
          src={"/reactions/care.png"}
          width={0}
          height={0}
          onClick={() => {
            onClick("care");
          }}
          sizes="100vh"
          className="w-6 h-6 object-cover rounded-full block flex-none"
        />
      </div>
    );
  }
  if (reactiontype === "haha") {
    return (
      <div
        className="relative cursor-pointer"
        onMouseEnter={() => {
          onHover(index);
        }}
      >
        <div
          className={`absolute bottom-0 w-6 h-[1px] bg-black ${
            index == activeIndex ? "block" : "hidden"
          }`}
        ></div>
        <Image
          alt="Amanuel Ferede"
          src={"/reactions/haha.png"}
          width={0}
          height={0}
          onClick={() => {
            onClick("haha");
          }}
          sizes="100vh"
          className="w-6 h-6 object-cover rounded-full block flex-none"
        />
      </div>
    );
  }
  if (reactiontype === "wow") {
    return (
      <div
        className="relative cursor-pointer"
        onMouseEnter={() => {
          onHover(index);
        }}
      >
        <div
          className={`absolute bottom-0 w-6 h-[1px] bg-black ${
            index == activeIndex ? "block" : "hidden"
          }`}
        ></div>
        <Image
          alt="Amanuel Ferede"
          src={"/reactions/wow.png"}
          width={0}
          height={0}
          onClick={() => {
            onClick("wow");
          }}
          sizes="100vh"
          className="w-6 h-6 object-cover rounded-full block flex-none"
        />
      </div>
    );
  }
  if (reactiontype === "sad") {
    return (
      <div
        className="relative cursor-pointer"
        onMouseEnter={() => {
          onHover(index);
        }}
      >
        <div
          className={`absolute bottom-0 w-6 h-[1px] bg-black ${
            index == activeIndex ? "block" : "hidden"
          }`}
        ></div>
        <Image
          alt="Amanuel Ferede"
          src={"/reactions/sad.png"}
          width={0}
          height={0}
          onClick={() => {
            onClick("sad");
          }}
          sizes="100vh"
          className="w-6 h-6 object-cover rounded-full block flex-none"
        />
      </div>
    );
  }

  if (reactiontype === "angry") {
    return (
      <div
        className="relative cursor-pointer"
        onMouseEnter={() => {
          onHover(index);
        }}
      >
        <div
          className={`absolute bottom-0 w-6 h-[1px] bg-black ${
            index == activeIndex ? "block" : "hidden"
          }`}
        ></div>
        <Image
          alt="Amanuel Ferede"
          src={"/reactions/angry.png"}
          width={0}
          height={0}
          onClick={() => {
            onClick("angry");
          }}
          sizes="100vh"
          className="w-6 h-6 object-cover rounded-full block flex-none"
        />
      </div>
    );
  }
  return null;
}
