"use client";
import { ReactorItemProps } from "./types";
import Image from "next/image";
export default function ReactorItem({ reactor }: ReactorItemProps) {
  const renderUserReactionAccordingly = (reactionType: string) => {
    if (reactionType === "like") {
      return (
        <Image
          alt="Amanuel Ferede"
          src={"/reactions/like.png"}
          width={0}
          height={0}
          sizes="100vh"
        />
      );
    }
    if (reactionType === "love") {
      return (
        <Image
          alt="Amanuel Ferede"
          src={"/reactions/love.png"}
          width={0}
          height={0}
          sizes="100vh"
        />
      );
    }

    if (reactionType === "care") {
      return (
        <Image
          alt="Amanuel Ferede"
          src={"/reactions/care.png"}
          width={0}
          height={0}
          sizes="100vh"
        />
      );
    }
    if (reactionType === "lagh") {
      return (
        <Image
          alt="Amanuel Ferede"
          src={"/reactions/haha.png"}
          width={0}
          height={0}
          sizes="100vh"
        />
      );
    }
    if (reactionType === "wow") {
      return (
        <Image
          alt="Amanuel Ferede"
          src={"/reactions/wow.png"}
          width={0}
          height={0}
          sizes="100vh"
        />
      );
    }
    if (reactionType === "sad") {
      return (
        <Image
          alt="Amanuel Ferede"
          src={"/reactions/sad.png"}
          width={0}
          height={0}
          sizes="100vh"
        />
      );
    }

    if (reactionType === "angry") {
      return (
        <Image
          alt="Amanuel Ferede"
          src={"/reactions/angry.png"}
          width={0}
          height={0}
          sizes="100vh"
        />
      );
    }
    return null;
  };
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <div className="relative">
          <Image
            alt="Amanuel Ferede"
            src={"/reactions/like.png"}
            width={0}
            height={0}
            sizes="100vh"
            className="w-14 h-14 rounded-full"
          />
          <div className="w-8 h-8 rounded-full absolute bottom-0 right-0">
            {renderUserReactionAccordingly(reactor.reactionType)}
          </div>
        </div>
        <p>
          {reactor.user.fName} {reactor.user.lName}
        </p>
      </div>
      <button className="px-2 py-2.5">Add Friend</button>
    </div>
  );
}
