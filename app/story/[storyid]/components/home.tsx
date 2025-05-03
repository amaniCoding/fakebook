"use client";
import { QueryResultRow } from "@vercel/postgres";
import StoryHeader from "./header";
import Stories from "./stories";
import StoryViewer from "./story-viewer";
import { useEffect, useState } from "react";

export default function Home(props: {
  stories: QueryResultRow[];
  storyPhotos: QueryResultRow[];
  allStoriesWithPhotos: QueryResultRow[];
  storyid: string;
}) {
  const [availabePhotos, setavailabePhotos] = useState<QueryResultRow[]>([]);

  useEffect(() => {
    const _availabePhotos: QueryResultRow[] = [];
    props.allStoriesWithPhotos.map((story) => {
      if (story.storyid === props.storyid) {
        _availabePhotos.push(story);
      }
    });
    setavailabePhotos(_availabePhotos);
  }, [props.allStoriesWithPhotos, props.storyid]);

  const showStoryPhoto = (id: string) => {
    const _availabePhotos: QueryResultRow[] = [];
    props.allStoriesWithPhotos.map((story) => {
      if (story.storyid === id) {
        _availabePhotos.push(story);
      }
    });
    setavailabePhotos(_availabePhotos);
  };

  return (
    <div className="story">
      <div className="w-[26%] bg-white fixed top-0 left-0 bottom-0 pt-16">
        <div className="h-[90vh] overflow-auto p-3">
          <StoryHeader />
          <Stories stories={props.stories} showStoryPhoto={showStoryPhoto} />
        </div>
      </div>
      <StoryViewer
        availabePhotos={availabePhotos}
        allStoriesWithPhotos={props.allStoriesWithPhotos}
      />
    </div>
  );
}
