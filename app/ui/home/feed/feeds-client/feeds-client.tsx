"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import FeedItem from "../feed-item/feed-item";
import {
  feedFeeds,
  updatePostsPage,
} from "@/app/store/slices/user/post/postSlice";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { fetchFeeds } from "@/app/libs/actions/post";
import { LoggedInUser } from "@/app/config/loggedinuser";
import FeedItemSkeleton from "@/app/ui/skeletons/feed";

export default function FeedsClient() {
  const dispatch = useAppDispatch();
  const feedsFromRedux = useAppSelector((state) => state.userPost.feeds);
  const newPage = feedsFromRedux.page ? feedsFromRedux.page : 1;
  const [page, setPage] = useState<number>(newPage);
  const hasMore = page >= Math.ceil(feedsFromRedux.posts.length / 5);
  useEffect(() => {
    console.log("hasmore", hasMore);
    console.log("page", page);
  }, [hasMore, page]);

  const [loading, setLoading] = useState<boolean>(true);
  const observer = useRef<IntersectionObserver>(null);
  const lastPostElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading || hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          const newPage = page + 1;
          dispatch(
            updatePostsPage({
              page: newPage,
            })
          );
          setPage(newPage);
        }
      });

      if (node) observer.current.observe(node);
    },
    [dispatch, hasMore, loading, page]
  );

  /**
   * set feed data for the first time
   */

  useEffect(() => {
    setLoading(true);
    const fetchAllFeeds = async () => {
      try {
        const feeds = await fetchFeeds(LoggedInUser.userid, page);
        dispatch(feedFeeds(feeds.posts));
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchAllFeeds();
  }, [dispatch, page]);

  return (
    <>
      {feedsFromRedux.posts.map((feed, index) => {
        return (
          <FeedItem
            key={feed.postId}
            feed={feed}
            ref={
              feedsFromRedux.posts.length === index + 1
                ? lastPostElementRef
                : null
            }
          />
        );
      })}
      {loading && feedsFromRedux.posts.length > 0 && <FeedItemSkeleton />}
    </>
  );
}
