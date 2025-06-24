"use client";
import { FaXmark } from "react-icons/fa6";
import { ReactionBoxTypes } from "./types";
import ReactionIcons from "./reactionicons";
import { useCallback, useEffect, useRef, useState } from "react";
import { getReactors } from "@/app/libs/actions/post";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  updatePostReactionLoading,
  updatePostReactionPage,
  updatePostReactionReactors,
} from "@/app/store/slices/user/post/postSlice";
import ReactorItem from "./reactoritem/reactoritem";
import CommentsSkeleton from "@/app/ui/skeletons/comments";
export default function ViewReactions({
  onClose,
  activeReactionType,
  groupedReactions,
  postId,
}: ReactionBoxTypes) {
  const dispatch = useAppDispatch();
  const [_activeReactionType, setActiveReactionType] =
    useState(activeReactionType);
  const feeds = useAppSelector((state) => state.userPost.feeds);
  const feed = feeds.posts.find((feed) => {
    return feed.postId === postId;
  });

  const reactionInfo = feed?.groupReactionInfo.find((reactionInfo) => {
    return (
      reactionInfo[_activeReactionType]?.reactionType === _activeReactionType
    );
  });

  const page =
    reactionInfo && reactionInfo[_activeReactionType]?.page
      ? reactionInfo[_activeReactionType].page
      : 1;

  const rowCount =
    reactionInfo && reactionInfo[_activeReactionType]?.rowCount
      ? reactionInfo[_activeReactionType].rowCount
      : 0;

  const loading =
    reactionInfo && reactionInfo[_activeReactionType]?.loading
      ? reactionInfo[_activeReactionType].loading
      : true;

  const reactors =
    reactionInfo && reactionInfo[_activeReactionType]?.reactors
      ? reactionInfo[_activeReactionType].reactors
      : [];

  const hasMore = page > Math.ceil(rowCount / 7);

  const handelReactionClick = (reactionType: string) => {
    setActiveReactionType(reactionType);
  };
  const observer = useRef<IntersectionObserver>(null);

  const lastReactorElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading || hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          const newPage = page + 1;
          console.log("PAGE__", newPage);
          dispatch(
            updatePostReactionPage({
              postId: postId,
              reactionType: _activeReactionType,
              page: newPage,
            })
          );
        }
      });

      if (node) observer.current.observe(node);
    },
    [_activeReactionType, dispatch, hasMore, loading, page, postId]
  );

  useEffect(() => {
    console.log("PAGE", page);
    console.log("HAS MORE", hasMore);
    console.log("ROW COUNT", rowCount);
  }, [hasMore, page, rowCount]);

  useEffect(() => {
    dispatch(
      updatePostReactionLoading({
        postId: postId,
        reactionType: _activeReactionType,
        loading: true,
      })
    );
    const getReactorsForReaction = async () => {
      try {
        const reactors = await getReactors(postId, _activeReactionType, page);
        if (!hasMore) {
          dispatch(
            updatePostReactionReactors({
              postId: postId,
              reactionType: _activeReactionType,
              reactors: reactors,
            })
          );
        }
        dispatch(
          updatePostReactionLoading({
            postId: postId,
            reactionType: _activeReactionType,
            loading: false,
          })
        );
      } catch (error) {
        console.error(error);
        dispatch(
          updatePostReactionLoading({
            postId: postId,
            reactionType: _activeReactionType,
            loading: false,
          })
        );
      }
    };
    getReactorsForReaction();
  }, [
    _activeReactionType,
    activeReactionType,
    dispatch,
    hasMore,
    page,
    postId,
  ]);
  return (
    <section className="bg-gray-100/75 fixed top-0 bottom-0 left-0 right-0 z-[300] overflow-hidden">
      <div className="max-w-[700px] mx-auto rounded-xl bg-white my-10">
        <div className="sticky flex items-center border-b border-b-gray-200 shadow-sm justify-between py-2 px-5 top-0 left-0 right-0">
          <div className="flex items-center">
            {groupedReactions.map((reaction, index) => {
              return (
                <ReactionIcons
                  onClick={handelReactionClick}
                  isActive={_activeReactionType === reaction.reactionType}
                  key={index}
                  reactiontype={reaction.reactionType}
                />
              );
            })}
          </div>
          <FaXmark
            className="w-10 h-10 rounded-full hover:bg-slate-300 p-2 cursor-pointer"
            onClick={() => {
              onClose();
            }}
          />
        </div>

        <div className="px-3 w-full h-[430px] overflow-y-auto">
          {reactors.map((reactor, index) => {
            return (
              <ReactorItem
                key={index}
                reactor={reactor}
                ref={
                  reactors.length === index + 1 ? lastReactorElementRef : null
                }
              />
            );
          })}
          {loading && <CommentsSkeleton />}
        </div>
      </div>
    </section>
  );
}
