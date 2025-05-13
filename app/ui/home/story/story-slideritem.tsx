"use client";
import Image from "next/image";
import Link from "next/link";

type StoryItem = {
  storyid: string;
  fname: string;
  lname: string;
  profilepic: string;
  photo: string;
};
export default function StorySliderItem({
  storyid,
  fname,
  lname,
  profilepic,
  photo,
}: StoryItem) {
  return (
    <div className="group overflow-hidden rounded-xl">
      <Link href={`/story/${storyid}`}>
        <div className="relative">
          <Image
            alt="Amanuel Ferede"
            src={photo}
            width={0}
            height={0}
            sizes="100vh"
            className="w-full h-60 object-cover group-hover:scale-105 transition-all duration-300 ease-in-out"
          />

          <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b from-transparent to-black/60"></div>
          <Image
            alt="Amanuel Ferede"
            src={profilepic}
            width={0}
            height={0}
            sizes="100vh"
            className="w-8 h-8 absolute top-2 left-2 object-cover rounded-full ring-1 ring-offset-2 ring-white"
          />
          <p className="absolute text-sm bottom-2 left-2 text-white brightness-100">
            {fname} {lname}
          </p>
        </div>
      </Link>
    </div>
  );
}
