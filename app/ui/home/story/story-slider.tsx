"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { QueryResultRow } from "@vercel/postgres";
import { fetchStoryPhotos } from "@/app/libs/actions/user/actions";
import StorySliderItem from "./story-slideritem";
import { useRef } from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

export default function StorySlider(props: { stories: QueryResultRow[] }) {
  const sliderRef = useRef<Slider>(null);
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    centerMode: true,
  };

  const handelNext = () => {
    sliderRef?.current?.slickNext();
  };

  const handelPrev = () => {
    sliderRef?.current?.slickPrev();
  };
  return (
    <div className="slider-container relative">
      <MdNavigateNext
        onClick={handelNext}
        className="w-12 h-12 text-gray-400 flex items-center justify-center absolute top-1/2 right-3 z-20 bg-white outline outline-gray-500 cursor-pointer rounded-full p-2  hover:fill-200  transition duration-300 ease-out "
      />
      <MdNavigateBefore
        onClick={handelPrev}
        className="w-12 h-12 text-gray-400 flex items-center justify-center absolute top-1/2 left-3 z-20 bg-white outline outline-gray-500 cursor-pointer rounded-full p-2 hover:fill-200  transition duration-300 ease-out"
      />

      <Slider {...settings} ref={sliderRef}>
        {props.stories.map((story) => {
          return (
            <StorySliderItem
              key={story.storyid}
              story={story}
              fetchStoryPhotos={fetchStoryPhotos}
            />
          );
        })}
      </Slider>
    </div>
  );
}
