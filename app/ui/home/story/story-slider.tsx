"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { QueryResultRow } from "@vercel/postgres";
import StorySliderItem from "./story-slideritem";
import { fetchStoryPhotos } from "@/app/libs/actions/user/actions";
export default function StorySlider(props: { stories: QueryResultRow[] }) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
  };
  return (
    <Slider {...settings}>
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
  );
}
