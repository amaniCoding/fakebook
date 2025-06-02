import { Suspense } from "react";
import AddPost from "../feed/add-post/add-post";
import FeedItemSkeleton from "../../skeletons/feed";
import Feeds from "../feed/feed-items";
import StoryItemSkeleton from "../../skeletons/story";
import Stories from "../story/stories";

export default function FeedSection() {
  return (
    <div className="xl:w-[40%] lg:w-[95%] xl:ml-[30%] lg:ml-[30%] w-full">
      <AddPost />
      <Suspense fallback={<StoryItemSkeleton />}>
        <Stories />
      </Suspense>
      <Suspense fallback={<FeedItemSkeleton />}>
        <Feeds />
      </Suspense>
    </div>
  );
}
