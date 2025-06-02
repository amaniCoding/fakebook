import { useAppSelector } from "@/app/store/hooks";
import Image from "next/image";
import { StoryItemProps } from "./types";
export default function StoryItem(props: StoryItemProps) {
  const currentStory = useAppSelector((state) => state.userStory.currentStory);
  return (
    <div
      className={`flex items-center cursor-pointer space-x-3 p-2 rounded-lg hover:bg-gray-100 ${
        currentStory?.storyid === props.story.storyid
          ? "bg-gray-100"
          : "bg-transparent"
      }`}
      onClick={() => {
        props.showStoryPhoto(props.story);
      }}
    >
      <Image
        alt="Amanuel Ferede"
        src={props.story.profilepic}
        width={0}
        height={0}
        sizes="100vh"
        className="w-14 h-14 object-cover rounded-full ring-2 ring-offset-2 ring-blue-400"
      />

      <div className="flex flex-col space-y-0.5">
        <p>
          {props.story.fname} {props.story.lname}
        </p>
        <p>15hr</p>
      </div>
    </div>
  );
}
