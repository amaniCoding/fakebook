"use client";
import FeedItem from "../feed-item/feed-item";
import { FeedsClientProps } from "./types";

export default function FeedsClient({ feeds }: FeedsClientProps) {
  return (
    <>
      {feeds.map((feed) => {
        return <FeedItem key={feed.postId} feed={feed} />;
      })}
    </>
  );
}
