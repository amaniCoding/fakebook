"use client";
import Image from "next/image";
import { QueryResultRow } from "@vercel/postgres";
import StoryHeader from "./header";
import Stories from "./stories";
import StoryViewer from "./story-viewer";
import { useEffect } from "react";
import { FaXmark } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import {
  setCurrentStory,
  setCurrentStoryPhotos,
  setStories,
  setStoryPhotos,
} from "@/app/store/slices/storySlice";
import { useAppSelector } from "@/app/store/hooks";
import Link from "next/link";

export default function Home(props: {
  stories: QueryResultRow[];
  storyPhotos: QueryResultRow[];
  storyid: string;
  currentStory: QueryResultRow[];
  currentStoryPhotos: QueryResultRow[];
}) {
  const dispatch = useDispatch();

  const _currentStory = props.stories.find((story) => {
    return story.storyid === props.storyid;
  });

  useEffect(() => {
    dispatch(setStoryPhotos(props.storyPhotos));
    dispatch(setCurrentStory(_currentStory));
    dispatch(setStories(props.stories));
    dispatch(
      setCurrentStoryPhotos({ type: "first", photos: props.currentStoryPhotos })
    );
  }, [
    _currentStory,
    dispatch,
    props.currentStory,
    props.currentStoryPhotos,
    props.stories,
    props.storyPhotos,
  ]);

  const currentStoryPhotos = useAppSelector(
    (state) => state.userStory.currentStoryPhotos
  );

  const currentStory = useAppSelector((state) => state.userStory.currentStory);

  const showStoryPhoto = (story: QueryResultRow) => {
    dispatch(setCurrentStory(story));
    dispatch(setCurrentStoryPhotos({ type: "update", photos: [] }));
  };

  return (
    <div className="story">
      <div className="w-[26%] bg-white fixed top-0 left-0 bottom-0 p-1">
        <div className="flex items-center space-x-2 p-3 border-b border-b-gray-200">
          <Link href="/">
            <FaXmark className="w-11 h-11 p-3 bg-gray-200 rounded-full" />
          </Link>
          <Image
            alt="Amanuel Ferede"
            src="/feeds/logoc.png"
            width={0}
            height={0}
            sizes="100vh"
            className="w-11 h-11 object-cover rounded-full"
          />
        </div>
        <div className="h-[90vh] overflow-auto p-3">
          <StoryHeader />
          <Stories stories={props.stories} showStoryPhoto={showStoryPhoto} />
        </div>
      </div>
      <StoryViewer
        currentStoryPhotos={currentStoryPhotos}
        currentStory={currentStory}
        storyid={props.storyid}
      />
    </div>
  );
}
