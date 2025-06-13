"use client";
import { useEffect } from "react";
import FeedItem from "../feed-item/feed-item";
import { FeedsClientProps } from "./types";
import { setFeeds } from "@/app/store/slices/user/post/postSlice";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";

export default function FeedsClient({ feeds }: FeedsClientProps) {
  const dispatch = useAppDispatch();
  const feedsFromRedux = useAppSelector((state) => state.userPost.feeds);
  useEffect(() => {
    dispatch(setFeeds(feeds));
  }, [dispatch, feeds]);
  return (
    <>
      {feedsFromRedux.map((feed) => {
        return <FeedItem key={feed.postId} feed={feed} />;
      })}
    </>
  );
}
