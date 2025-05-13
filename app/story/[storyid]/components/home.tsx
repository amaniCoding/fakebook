"use client";
import Image from "next/image";
import StoryHeader from "./header";
import Stories from "./stories";
import StoryViewer from "./story-viewer";
import { useEffect } from "react";
import { FaXmark } from "react-icons/fa6";
import {
  setCurrentStory,
  setCurrentStoryPhotos,
  setStories,
} from "@/app/store/slices/storySlice";
import Link from "next/link";
import { Story, StoryPhoto } from "@/app/types/db/user/story";
import { fetchStoryPhotos } from "@/app/libs/actions/user/actions";
import { useAppDispatch } from "@/app/store/hooks";

export default function Home(props: {
  allStories: Story[];
  storyid: string;
  currentStory: Story[];
  currentStoryPhotos: StoryPhoto[];
  allStoriesWithPhotos: StoryPhoto[];
}) {
  const dispatch = useAppDispatch();

  const _currentStory = props.allStories.find((story) => {
    return story.storyid === props.storyid;
  });

  useEffect(() => {
    dispatch(setCurrentStory(_currentStory));
    dispatch(setStories(props.allStories));
    dispatch(
      setCurrentStoryPhotos({
        loading: false,
        currentStoryPhotos: props.currentStoryPhotos,
      })
    );
  }, [_currentStory, dispatch, props.allStories, props.currentStoryPhotos]);

  const showStoryPhoto = async (story: Story) => {
    dispatch(
      setCurrentStoryPhotos({
        loading: true,
        currentStoryPhotos: [],
      })
    );
    dispatch(setCurrentStory(story));
    const currentStoryPhotos = await fetchStoryPhotos(story.storyid);
    dispatch(
      setCurrentStoryPhotos({
        loading: false,
        currentStoryPhotos,
      })
    );
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
          <Stories
            allStories={props.allStories}
            showStoryPhoto={showStoryPhoto}
          />
        </div>
      </div>
      <StoryViewer />
    </div>
  );
}
