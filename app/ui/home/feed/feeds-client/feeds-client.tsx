"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import FeedItem from "../feed-item/feed-item";
import { feedFeeds } from "@/app/store/slices/user/post/postSlice";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { fetchFeeds } from "@/app/libs/actions/post";
import { LoggedInUser } from "@/app/config/loggedinuser";
import FeedItemSkeleton from "@/app/ui/skeletons/feed";

export default function FeedsClient() {
  const dispatch = useAppDispatch();
  const feedsFromRedux = useAppSelector((state) => state.userPost.feeds);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const observer = useRef<IntersectionObserver>(null);
  const lastPostElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          const newPage = page + 1;
          setPage(newPage);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, page]
  );

  /**
   * set feed data for the first time
   */

  useEffect(() => {
    setLoading(true);
    const fetchAllFeeds = async () => {
      const feeds = await fetchFeeds(LoggedInUser.userid, page);
      dispatch(feedFeeds(feeds));
      setLoading(false);
    };
    fetchAllFeeds();
    console.log("page", page);
  }, [dispatch, page]);

  return (
    <>
      {feedsFromRedux.map((feed, index) => {
        return (
          <FeedItem
            key={feed.postId}
            feed={feed}
            ref={
              feedsFromRedux.length === index + 1 ? lastPostElementRef : null
            }
          />
        );
      })}
      {loading && <FeedItemSkeleton />}
    </>
  );
}
