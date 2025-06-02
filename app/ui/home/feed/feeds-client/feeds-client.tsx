"use client";
import FeedItem from "../feed-item/feed-item";
import { useEffect } from "react";
import { setFeeds } from "@/app/store/slices/user/post/postSlice";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { FeedsClientProps } from "./types";

export default function FeedsClient({ feeds }: FeedsClientProps) {
  const dispatch = useAppDispatch();
  const feedsState = useAppSelector((state) => state.userPost.feeds);
  useEffect(() => {
    dispatch(setFeeds(feeds));
  }, [dispatch, feeds]);
  return (
    <>
      {feedsState.map((feed) => {
        return <FeedItem key={feed.postId} feed={feed} />;
      })}
    </>
  );
}
