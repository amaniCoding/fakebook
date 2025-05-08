"use client";
import { BiSolidLike } from "react-icons/bi";
import Image from "next/image";
import { IoMdHeart } from "react-icons/io";
import { BsEmojiSmileFill, BsFillEmojiSurpriseFill } from "react-icons/bs";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/app/store/hooks";
import {
  setCurrentStory,
  setCurrentStoryPhotos,
} from "@/app/store/slices/storySlice";
import { useDispatch } from "react-redux";
import { fetchStoryPhotos } from "@/app/libs/actions/user/actions";
export default function StoryViewer() {
  const dispatch = useDispatch();
  const currentStory = useAppSelector((state) => state.userStory.currentStory);
  const stories = useAppSelector((state) => state.userStory.allStories);
  const currentStoryPhotos = useAppSelector(
    (state) => state.userStory.currentStoryPhotos
  );
  const [currentPhotoIndex, setcurrentPhotoIndex] = useState<number>(0);
  const [currentStoryIndex, setcurrentStoryIndex] = useState<number>(0);

  const _currentStoryIndex = stories.findIndex((story) => {
    return story.storyid === currentStory?.storyid;
  });

  useEffect(() => {
    setcurrentStoryIndex(_currentStoryIndex);
  }, [_currentStoryIndex]);

  useEffect(() => {
    let intervalId;
    const handelNext = async () => {
      if (
        currentPhotoIndex >=
        currentStoryPhotos.currentStoryPhotos.length - 1
      ) {
        // becuase react update state immediately
        if (currentStoryIndex >= stories.length - 1) {
          return;
        } else {
          dispatch(setCurrentStory(stories[_currentStoryIndex + 1]));

          dispatch(
            setCurrentStoryPhotos({
              loading: true,
              currentStoryPhotos: [],
            })
          );
          const currentStoryPhotos = await fetchStoryPhotos(
            stories[_currentStoryIndex + 1].storyid
          );
          dispatch(
            setCurrentStoryPhotos({
              loading: false,
              currentStoryPhotos: currentStoryPhotos,
            })
          );

          setcurrentStoryIndex(currentStoryIndex + 1);
          setcurrentPhotoIndex(0);
        }
      } else {
        setcurrentPhotoIndex(currentPhotoIndex + 1);
      }
    };

    if (currentStoryPhotos.loading) {
      return;
    } else {
      intervalId = setInterval(() => {
        handelNext();
      }, 4000);
    }
    if (currentStoryPhotos.loading) {
      return;
    } else {
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [
    _currentStoryIndex,
    currentPhotoIndex,
    currentStoryIndex,
    currentStoryPhotos.currentStoryPhotos.length,
    currentStoryPhotos.loading,
    dispatch,
    stories,
  ]);

  const handelNext = async () => {
    dispatch(
      setCurrentStoryPhotos({
        loading: true,
        currentStoryPhotos: [],
      })
    );
    if (currentPhotoIndex >= currentStoryPhotos.currentStoryPhotos.length - 1) {
      // becuase react update state immediately
      if (currentStoryIndex >= stories.length - 1) {
        return;
      } else {
        dispatch(setCurrentStory(stories[_currentStoryIndex + 1]));

        dispatch(
          setCurrentStoryPhotos({
            loading: true,
            currentStoryPhotos: [],
          })
        );
        const currentStoryPhotos = await fetchStoryPhotos(
          stories[_currentStoryIndex + 1].storyid
        );
        dispatch(
          setCurrentStoryPhotos({
            loading: false,
            currentStoryPhotos: currentStoryPhotos,
          })
        );

        setcurrentStoryIndex(currentStoryIndex + 1);
        setcurrentPhotoIndex(0);
      }
    } else {
      setcurrentPhotoIndex(currentPhotoIndex + 1);
    }
  };

  const handelPrev = async () => {
    dispatch(
      setCurrentStoryPhotos({
        loading: true,
        currentStoryPhotos: [],
      })
    );

    if (currentPhotoIndex <= 0) {
      // becuase react update state immediately
      if (currentStoryIndex <= 0) {
        return;
      } else {
        dispatch(setCurrentStory(stories[_currentStoryIndex + 1]));

        dispatch(
          setCurrentStoryPhotos({
            loading: true,
            currentStoryPhotos: [],
          })
        );
        const currentStoryPhotos = await fetchStoryPhotos(
          stories[_currentStoryIndex - 1].storyid
        );
        dispatch(
          setCurrentStoryPhotos({
            loading: false,
            currentStoryPhotos: currentStoryPhotos,
          })
        );

        setcurrentStoryIndex(currentStoryIndex - 1);
        setcurrentPhotoIndex(0);
      }
    } else {
      setcurrentPhotoIndex(currentPhotoIndex - 1);
    }
  };

  return (
    <div className="w-[74%] bg-black relative h-screen ml-[26%] pt-2 flex items-center justify-center">
      <MdNavigateNext
        onClick={handelNext}
        className="w-12 h-12 text-gray-400 flex items-center justify-center absolute top-1/2 right-64 z-20 bg-white outline outline-gray-500 cursor-pointer rounded-full p-2  hover:fill-200  transition duration-300 ease-out "
      />
      <MdNavigateBefore
        onClick={handelPrev}
        className="w-12 h-12 text-gray-400 flex items-center justify-center absolute top-1/2 left-64 z-20 bg-white outline outline-gray-500 cursor-pointer rounded-full p-2 hover:fill-200  transition duration-300 ease-out"
      />
      <div className="w-1/3 h-full rounded-xl">
        {currentStoryPhotos.loading ? (
          <div className="w-full h-[85%] bg-gray-700 rounded-xl animate-pulse relative">
            <div className="absolute left-2 top-2 flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full flex-none bg-gray-300 animate-pulse" />
              <p className="w-36 h-4 rounded-xl bg-gray-300 animate-pulse"></p>
            </div>
          </div>
        ) : (
          <div className="w-full h-[85%] bg-black relative">
            <div className="absolute left-2 top-2 flex items-center space-x-2">
              <Image
                alt="Amanuel Ferede"
                src={
                  currentStoryPhotos.currentStoryPhotos[currentPhotoIndex]
                    ?.profilepic
                }
                width={0}
                height={0}
                sizes="100vh"
                className="w-10 h-10 rounded-full flex-none object-cover"
              />
              <p className="text-white">
                {
                  currentStoryPhotos.currentStoryPhotos[currentPhotoIndex]
                    ?.fname
                }{" "}
                {
                  currentStoryPhotos.currentStoryPhotos[currentPhotoIndex]
                    ?.lname
                }
              </p>
            </div>

            <Image
              alt="Amanuel Ferede"
              src={
                currentStoryPhotos.currentStoryPhotos[currentPhotoIndex]?.photo
              }
              width={0}
              height={0}
              sizes="100vh"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        )}

        <div className="flex p-3 items-center justify-center space-x-6">
          <input
            className="p-2 border-2 placeholder:text-white border-white rounded-3xl"
            placeholder="Reply ..."
          ></input>
          <div className="flex items-center space-x-2">
            <BiSolidLike className="w-10 h-10 text-white rounded-full p-1 bg-blue-600" />
            <IoMdHeart className="w-10 h-10 text-white rounded-full p-1 bg-pink-600" />
            <BsEmojiSmileFill className="w-11 h-11 text-white rounded-full p-1 fill-yellow-600" />
            <BsFillEmojiSurpriseFill className="w-11 h-11 text-white rounded-full p-1 fill-yellow-600 " />
          </div>
        </div>
      </div>
    </div>
  );
}
