"use client";
import Image from "next/image";
import { ReactionIconsProps } from "./types";

export default function ReactionIcons({
  reactiontype,
  isActive,
  onClick,
}: ReactionIconsProps) {
  if (reactiontype === "like") {
    return (
      <Image
        alt="Amanuel Ferede"
        src={"/reactions/like.png"}
        width={0}
        height={0}
        onClick={() => {
          onClick("like");
        }}
        sizes="100vh"
        className={`w-6 h-6 object-cover rounded-full block border-b flex-none ${
          isActive ? "border-b-blue-600" : "border-b-transparent"
        }`}
      />
    );
  }
  if (reactiontype === "love") {
    return (
      <Image
        alt="Amanuel Ferede"
        src={"/reactions/love.png"}
        width={0}
        height={0}
        onClick={() => {
          onClick("love");
        }}
        sizes="100vh"
        className={`w-6 h-6 object-cover rounded-full block border-b flex-none ${
          isActive ? "border-b-blue-600" : "border-b-transparent"
        }`}
      />
    );
  }

  if (reactiontype === "care") {
    return (
      <Image
        alt="Amanuel Ferede"
        src={"/reactions/care.png"}
        width={0}
        height={0}
        onClick={() => {
          onClick("care");
        }}
        sizes="100vh"
        className={`w-6 h-6 object-cover rounded-full block border-b flex-none ${
          isActive ? "border-b-blue-600" : "border-b-transparent"
        }`}
      />
    );
  }
  if (reactiontype === "haha") {
    return (
      <Image
        alt="Amanuel Ferede"
        src={"/reactions/haha.png"}
        width={0}
        height={0}
        onClick={() => {
          onClick("haha");
        }}
        sizes="100vh"
        className={`w-6 h-6 object-cover rounded-full block border-b flex-none ${
          isActive ? "border-b-blue-600" : "border-b-transparent"
        }`}
      />
    );
  }
  if (reactiontype === "wow") {
    return (
      <Image
        alt="Amanuel Ferede"
        src={"/reactions/wow.png"}
        width={0}
        height={0}
        onClick={() => {
          onClick("wow");
        }}
        sizes="100vh"
        className={`w-6 h-6 object-cover rounded-full block border-b flex-none ${
          isActive ? "border-b-blue-600" : "border-b-transparent"
        }`}
      />
    );
  }
  if (reactiontype === "sad") {
    return (
      <Image
        alt="Amanuel Ferede"
        src={"/reactions/sad.png"}
        width={0}
        height={0}
        onClick={() => {
          onClick("sad");
        }}
        sizes="100vh"
        className={`w-6 h-6 object-cover rounded-full block border-b flex-none ${
          isActive ? "border-b-blue-600" : "border-b-transparent"
        }`}
      />
    );
  }

  if (reactiontype === "angry") {
    return (
      <Image
        alt="Amanuel Ferede"
        src={"/reactions/angry.png"}
        width={0}
        height={0}
        onClick={() => {
          onClick("angry");
        }}
        sizes="100vh"
        className={`w-6 h-6 object-cover rounded-full block border-b flex-none ${
          isActive ? "border-b-blue-600" : "border-b-transparent"
        }`}
      />
    );
  }
  return null;
}
