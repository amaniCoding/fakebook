"use client";
import { ReactionIconsProps } from "./types";
import Image from "next/image";

export default function ReactionIcons({ reactiontype }: ReactionIconsProps) {
  if (reactiontype === "like") {
    return (
      <Image
        alt="Amanuel Ferede"
        src={"/reactions/like.png"}
        width={0}
        height={0}
        sizes="100vh"
        className="w-6 h-6 object-cover rounded-full block flex-none"
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
        sizes="100vh"
        className="w-6 h-6 object-cover rounded-full block flex-none"
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
        sizes="100vh"
        className="w-6 h-6 object-cover rounded-full block flex-none"
      />
    );
  }
  if (reactiontype === "lagh") {
    return (
      <Image
        alt="Amanuel Ferede"
        src={"/reactions/haha.png"}
        width={0}
        height={0}
        sizes="100vh"
        className="w-6 h-6 object-cover rounded-full block flex-none"
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
        sizes="100vh"
        className="w-6 h-6 object-cover rounded-full block flex-none"
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
        sizes="100vh"
        className="w-6 h-6 object-cover rounded-full block flex-none"
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
        sizes="100vh"
        className="w-6 h-6 object-cover rounded-full block flex-none"
      />
    );
  }
  return null;
}
