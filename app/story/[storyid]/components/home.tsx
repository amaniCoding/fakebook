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
  setStories,
  setStoryPhotos,
} from "@/app/store/slices/storySlice";
import { useAppSelector } from "@/app/store/hooks";

export default function Home(props: {
  stories: QueryResultRow[];
  storyPhotos: QueryResultRow[];
  storyid: string;
  currentStory: QueryResultRow[];
  currentStoryPhotos: QueryResultRow[];
}) {
  const dispatch = useDispatch();

  const currentStoryIdex = props.stories.findIndex((story) => {
    return story.storyid === props.storyid;
  });

  useEffect(() => {
    dispatch(setStoryPhotos(props.storyPhotos));
    dispatch(setStories(props.stories));
    dispatch(setCurrentStory(currentStoryIdex));
  }, [
    currentStoryIdex,
    dispatch,
    props.currentStory,
    props.currentStoryPhotos,
    props.stories,
    props.storyPhotos,
  ]);

  const currentStoryPhotos = useAppSelector(
    (state) => state.stores.currentStoryPhotos
  );

  const currentStory = useAppSelector((state) => state.stores.currentStory);

  const showStoryPhoto = (story: QueryResultRow) => {
    const currentPhotoIndex = props.stories.findIndex((_story) => {
      return _story.storyid === story.storyid;
    });
    dispatch(setCurrentStory(currentPhotoIndex));
  };

  return (
    <div className="story">
      <div className="w-[26%] bg-white fixed top-0 left-0 bottom-0 p-1">
        <div className="flex items-center space-x-2 p-3 border-b border-b-gray-200">
          <FaXmark className="w-11 h-11 p-3 bg-gray-200 rounded-full" />
          <Image
            alt="Amanuel Ferede"
            src="/feeds/clogo.jpg"
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
