"use client";
import { ReactionIconsProps } from "./types";
import Image from "next/image";

export default function ReactionIcons({
  reactiontype,
  isActive,
  onClick,
}: ReactionIconsProps) {
  if (reactiontype === "like") {
    return (
      <div className={`relative hover:bg-gray-100 rounded-lg px-3`}>
        <div
          className={`absolute left-0 bottom-0 w-16 border-b-2 ${
            isActive ? "border-b-blue-600" : "border-b-transparent"
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
          className="w-10 h-10 object-cover rounded-full block border-b flex-none"
        />
      </div>
    );
  }
  if (reactiontype === "love") {
    return (
      <div className={`relative hover:bg-gray-100 rounded-lg px-3`}>
        <div
          className={`absolute left-0 bottom-0 w-16 border-b-2 ${
            isActive ? "border-b-blue-600" : "border-b-transparent"
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
          className="w-10 h-10 object-cover rounded-full block border-b flex-none"
        />
      </div>
    );
  }

  if (reactiontype === "care") {
    return (
      <div className={`relative hover:bg-gray-100 rounded-lg px-3`}>
        <div
          className={`absolute left-0 bottom-0 w-16 border-b-2 ${
            isActive ? "border-b-blue-600" : "border-b-transparent"
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
          className="w-10 h-10 object-cover rounded-full block border-b flex-none"
        />
      </div>
    );
  }
  if (reactiontype === "haha") {
    return (
      <div className={`relative hover:bg-gray-100 rounded-lg px-3`}>
        <div
          className={`absolute left-0 bottom-0 w-16 border-b-2 ${
            isActive ? "border-b-blue-600" : "border-b-transparent"
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
          className="w-10 h-10 object-cover rounded-full block border-b flex-none"
        />
      </div>
    );
  }
  if (reactiontype === "wow") {
    return (
      <div className={`relative hover:bg-gray-100 rounded-lg px-3`}>
        <div
          className={`absolute left-0 bottom-0 w-16 border-b-2 ${
            isActive ? "border-b-blue-600" : "border-b-transparent"
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
          className="w-10 h-10 object-cover rounded-full block border-b flex-none"
        />
      </div>
    );
  }
  if (reactiontype === "sad") {
    return (
      <div className={`relative hover:bg-gray-100 rounded-lg px-3`}>
        <div
          className={`absolute left-0 bottom-0 w-16 border-b-2 ${
            isActive ? "border-b-blue-600" : "border-b-transparent"
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
          className="w-10 h-10 object-cover rounded-full block border-b flex-none"
        />
      </div>
    );
  }

  if (reactiontype === "angry") {
    return (
      <div className={`relative hover:bg-gray-100 rounded-lg px-3`}>
        <div
          className={`absolute left-0 bottom-0 w-16 border-b-2 ${
            isActive ? "border-b-blue-600" : "border-b-transparent"
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
          className="w-10 h-10 object-cover rounded-full block border-b flex-none"
        />
      </div>
    );
  }
  return null;
}
