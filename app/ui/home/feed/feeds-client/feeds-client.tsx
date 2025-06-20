"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import FeedItem from "../feed-item/feed-item";
import { feedFeeds, setFeeds } from "@/app/store/slices/user/post/postSlice";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { fetchFeedCount, fetchFeeds } from "@/app/libs/actions/post";
import { LoggedInUser } from "@/app/config/loggedinuser";
import FeedItemSkeleton from "@/app/ui/skeletons/feed";

export default function FeedsClient() {
  const dispatch = useAppDispatch();
  const feedsFromRedux = useAppSelector((state) => state.userPost.feeds);

  const [page, setPage] = useState<number>(1);
  const _rowCount = feedsFromRedux.rowsCount ? feedsFromRedux.rowsCount : 0;
  const hasMore = page >= Math.ceil(_rowCount / 5);
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
          setPage(newPage);
        }
      });

      if (node) observer.current.observe(node);
    },
    [hasMore, loading, page]
  );

  /**
   * set feed data for the first time
   */
  useEffect(() => {
    const fetchAllFeeds = async () => {
      try {
        const feeds = await fetchFeedCount();
        dispatch(setFeeds(feeds));
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllFeeds();
  }, [dispatch, page]);
  useEffect(() => {
    setLoading(true);
    const fetchAllFeeds = async () => {
      try {
        const feeds = await fetchFeeds(LoggedInUser.userid, page);
        dispatch(feedFeeds(feeds));

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
