import { Post } from "@/app/types/frontend/post";

export type FeedItemType = {
  feed: Post;
  ref: ((node: HTMLDivElement) => void) | null;
};
