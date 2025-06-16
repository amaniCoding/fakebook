"use client";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import StorySliderItem from "./story-slideritem";
import { useRef } from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import Link from "next/link";
import { BsPlus } from "react-icons/bs";
import { SimpleMedia } from "@/app/types/db/query/story";

export default function StorySlider(props: {
  stories: {
    storyid: string;
    fname: string;
    lname: string;
    profilepic: string;
    medias: SimpleMedia;
  }[];
}) {
  const sliderRef = useRef<Slider>(null);
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
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
        className="w-12 h-12 text-gray-400 flex items-center justify-center absolute top-1/2 right-3 z-10 bg-white outline outline-gray-500 cursor-pointer rounded-full p-2  hover:fill-200  transition duration-300 ease-out "
      />
      <MdNavigateBefore
        onClick={handelPrev}
        className="w-12 h-12 text-gray-400 flex items-center justify-center absolute top-1/2 left-3 z-10 bg-white outline outline-gray-500 cursor-pointer rounded-full p-2 hover:fill-200  transition duration-300 ease-out"
      />

      <Slider {...settings} ref={sliderRef}>
        <div className="group overflow-hidden rounded-xl">
          <Link href={`/create/`}>
            <div className="relative h-60">
              <Image
                alt="Amanuel Ferede"
                src="/feeds/user.jpg"
                width={0}
                height={0}
                sizes="100vh"
                className="w-full h-40 object-cover group-hover:scale-105 transition-all duration-300 ease-in-out"
              />

              <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b from-transparent to-black/60"></div>

              <div className="h-20 text-sm text-center relative  shadow-md bg-white w-full text-black font-bold brightness-100 flex justify-center items-end pb-3">
                <div className="w-10 h-10  bg-white rounded-full scale-[122%] absolute left-1/2 -translate-x-1/2 -top-1/2 translate-y-1/2"></div>
                <BsPlus className="w-10 h-10 bg-blue-600 rounded-full absolute left-1/2 -translate-x-1/2 -top-1/2 translate-y-1/2 text-white" />
                Create A story
              </div>
            </div>
          </Link>
        </div>
        {props.stories.map((story) => {
          return (
            <StorySliderItem
              key={story.storyid}
              storyid={story.storyid}
              fname={story.fname}
              lname={story.lname}
              profilepic={story.profilepic}
              medias={story.medias}
            />
          );
        })}
      </Slider>
    </div>
  );
}
