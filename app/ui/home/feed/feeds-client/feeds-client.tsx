"use client";
import FeedItem from "../feed-item/feed-item";
import { useEffect } from "react";
import { setFeeds } from "@/app/store/slices/user/post/postSlice";
import { useAppSelector } from "@/app/store/hooks";
import { FeedsClientProps } from "./types";

export default function FeedsClient({ feeds }: FeedsClientProps) {
  const feedsState = useAppSelector((state) => state.userPost.feeds);
  useEffect(() => {
    setFeeds(feeds);
  }, [feeds]);
  return (
    <>
      {feedsState.map((feed) => {
        return <FeedItem key={feed.postId} feed={feed} />;
      })}
    </>
  );
}
