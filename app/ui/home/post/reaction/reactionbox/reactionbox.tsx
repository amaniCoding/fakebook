"use client";
import { FaXmark } from "react-icons/fa6";

import { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  updatePostMediaReactionLoading,
  updatePostMediaReactionPage,
  updatePostMediaReactionReactors,
} from "@/app/store/slices/user/post/postSlice";
import ReactorItem from "../reactoritem/reactoritem";
import { ReactionBoxTypes } from "../reactionicons/types";
import ReactionIcons from "./reactionicons";
import { getMediaReactors } from "@/app/libs/actions/post";
export default function ViewReactions({
  onClose,
  activeReactionType,
  groupedReactions,
  postId,
  mediaId,
}: ReactionBoxTypes) {
  const dispatch = useAppDispatch();
  const feeds = useAppSelector((state) => state.userPost.feeds);
  const feed = feeds.posts.find((feed) => {
    return feed.postId === postId;
  });

  const reactionInfo = feed?.groupReactionInfo.find((reactionInfo) => {
    return (
      reactionInfo[activeReactionType]?.reactionType === activeReactionType
    );
  });

  const page = reactionInfo && reactionInfo[activeReactionType].page;

  const rowCount = reactionInfo && reactionInfo[activeReactionType].rowCount;

  const loading = reactionInfo && reactionInfo[activeReactionType].loading;

  const reactors =
    reactionInfo && reactionInfo[activeReactionType].reactors
      ? reactionInfo[activeReactionType].reactors
      : [];

  const hasMore = page! > Math.ceil(rowCount! / 7);

  const [_activeReactionType, setActiveReactionType] =
    useState(activeReactionType);

  const handelReactionClick = async (reactionType: string) => {
    setActiveReactionType(reactionType);
  };
  const observer = useRef<IntersectionObserver>(null);

  const lastReactorElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading || hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          const newPage = page! + 1;
          dispatch(
            updatePostMediaReactionPage({
              mediaId: mediaId,
              reactionType: activeReactionType,
              page: newPage,
            })
          );
        }
      });

      if (node) observer.current.observe(node);
    },
    [activeReactionType, dispatch, hasMore, loading, mediaId, page]
  );

  useEffect(() => {
    const getReactorsForReaction = async () => {
      dispatch(
        updatePostMediaReactionLoading({
          mediaId: postId,
          reactionType: activeReactionType,
          loading: true,
        })
      );
      try {
        const reactors = await getMediaReactors(
          postId,
          mediaId!,
          activeReactionType,
          page!
        );
        dispatch(
          updatePostMediaReactionReactors({
            mediaId: mediaId,
            reactionType: activeReactionType,
            reactors: reactors,
          })
        );
        dispatch(
          updatePostMediaReactionLoading({
            mediaId: mediaId,
            reactionType: activeReactionType,
            loading: false,
          })
        );
      } catch (error) {
        console.error(error);
        dispatch(
          updatePostMediaReactionLoading({
            mediaId: mediaId,
            reactionType: activeReactionType,
            loading: false,
          })
        );
      }
    };
    getReactorsForReaction();
  }, [activeReactionType, dispatch, mediaId, page, postId]);
  return (
    <section className="bg-gray-100/75 fixed top-0 bottom-0 left-0 right-0 z-[300] overflow-hidden">
      <div className="max-w-[700px] mx-auto rounded-xl bg-white my-10">
        <div className="sticky flex items-center justify-between py-1 top-0 left-0 right-0">
          <div className="flex items-center">
            {groupedReactions &&
              groupedReactions.map((reaction, index) => {
                return (
                  <ReactionIcons
                    onClick={() => {
                      handelReactionClick(reaction.reactionType);
                    }}
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

        <div className="w-full">
          {reactors.map((reactor, index) => {
            return (
              <ReactorItem
                key={reactor.user.userId}
                reactor={reactor}
                ref={
                  reactors.length === index + 1 ? lastReactorElementRef : null
                }
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
