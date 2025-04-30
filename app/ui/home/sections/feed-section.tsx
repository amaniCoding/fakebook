import { Suspense } from "react";
import AddPost from "../feed/add-post";
import FeedItemSkeleton from "../../skeletons/feed_item";
import Feeds from "../feed/feed-items";

export default function FeedSection() {
  return (
    <div className="md:w-[40%] md:ml-[30%] w-full">
      <AddPost />
      <Suspense fallback={<FeedItemSkeleton />}>
        <Feeds />
      </Suspense>
    </div>
  );
}
