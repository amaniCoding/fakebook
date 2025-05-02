"use client";
import { QueryResultRow } from "@vercel/postgres";
import Image from "next/image";
import { useEffect, useState } from "react";
export default function StorySliderItem(props: {
  story: QueryResultRow;
  fetchStoryPhotos: (storyId: string) => Promise<QueryResultRow[]>;
}) {
  const storyId = props.story.storyid;
  const [storyPhotoLoading, setstoryPhotoLoading] = useState<boolean>(true);
  const [storyPhotos, setStoryPhotos] = useState<QueryResultRow[]>([]);

  const fetchStoryPhotos = async (storyId: string) => {
    const _storyPhotos = await props.fetchStoryPhotos(storyId);
    setStoryPhotos(_storyPhotos);
    setstoryPhotoLoading(false);
  };
  useEffect(() => {
    fetchStoryPhotos(storyId);

    return () => {
      fetchStoryPhotos(storyId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storyId]);

  return (
    <div className="group overflow-hidden">
      <div className="relative">
        {storyPhotoLoading ? (
          <div className="w-full h-60 object-cover group-hover:scale-10 transition-all duration-300 ease-in-out"></div>
        ) : (
          <Image
            alt="Amanuel Ferede"
            src={storyPhotos[0].photo}
            width={0}
            height={0}
            sizes="100vh"
            className="w-full h-60 object-cover group-hover:scale-105 transition-all duration-300 ease-in-out"
          />
        )}

        <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b from-transparent to-black/60"></div>
        <Image
          alt="Amanuel Ferede"
          src={props.story.profilepic}
          width={0}
          height={0}
          sizes="100vh"
          className="w-8 h-8 absolute top-2 left-2 object-cover rounded-full ring-1 ring-offset-2 ring-white"
        />
        <p className="absolute text-sm bottom-2 left-2 text-white brightness-100">
          {props.story.fname} {props.story.lname}
        </p>
      </div>
    </div>
  );
}
