"use client";
import { FaXmark } from "react-icons/fa6";

import { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch } from "@/app/store/hooks";
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
  postInfo,
  currentPhotoIndex,
}: ReactionBoxTypes) {
  const dispatch = useAppDispatch();
  const [_activeReactionType, setActiveReactionType] =
    useState(activeReactionType);

  const reactionInfo = postInfo?.medias[
    currentPhotoIndex
  ].groupReactionInfo.find((reactionInfo) => {
    return (
      reactionInfo[_activeReactionType]?.reactionType === _activeReactionType
    );
  });

  const page = reactionInfo && reactionInfo[_activeReactionType].page;

  const rowCount = reactionInfo && reactionInfo[_activeReactionType].rowCount;

  const loading = reactionInfo && reactionInfo[_activeReactionType].loading;

  const reactors = reactionInfo && reactionInfo[_activeReactionType].reactors;
  const hasMore = page! > Math.ceil(rowCount! / 7);

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
              reactionType: _activeReactionType,
              page: newPage,
            })
          );
        }
      });

      if (node) observer.current.observe(node);
    },
    [_activeReactionType, dispatch, hasMore, loading, mediaId, page]
  );

  useEffect(() => {
    const getReactorsForReaction = async () => {
      dispatch(
        updatePostMediaReactionLoading({
          mediaId: postId,
          reactionType: _activeReactionType,
          loading: true,
        })
      );
      try {
        const reactors = await getMediaReactors(
          postId,
          mediaId!,
          _activeReactionType,
          page!
        );
        if (!hasMore) {
          dispatch(
            updatePostMediaReactionReactors({
              mediaId: mediaId,
              reactionType: _activeReactionType,
              reactors: reactors,
            })
          );
        }
        dispatch(
          updatePostMediaReactionLoading({
            mediaId: mediaId,
            reactionType: _activeReactionType,
            loading: false,
          })
        );
      } catch (error) {
        console.error(error);
        dispatch(
          updatePostMediaReactionLoading({
            mediaId: mediaId,
            reactionType: _activeReactionType,
            loading: false,
          })
        );
      }
    };
    getReactorsForReaction();
  }, [_activeReactionType, dispatch, hasMore, mediaId, page, postId]);

  useEffect(() => {
    console.log("PAGE", page);
    console.log("HAS MORE", hasMore);
    console.log("ROW COUNT", rowCount);
    console.log("FEED__REACTIONINFO_", postInfo?.groupReactionInfo);
  }, [hasMore, page, postInfo?.groupReactionInfo, rowCount]);
  return (
    <section className="bg-gray-100/75 fixed top-0 bottom-0 left-0 right-0 z-[300] overflow-hidden">
      <div className="max-w-[550px] mx-auto rounded-xl bg-white my-10">
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

        <div className="px-3 w-full h-[430px] overflow-y-auto">
          {reactors!.map((reactor, index) => {
            return (
              <ReactorItem
                key={index}
                reactor={reactor}
                ref={
                  reactors!.length === index + 1 ? lastReactorElementRef : null
                }
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
