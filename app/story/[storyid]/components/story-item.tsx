import { QueryResultRow } from "@vercel/postgres";
import Image from "next/image";
export default function StoryItem(props: {
  story: QueryResultRow;
  showStoryPhoto: (story: QueryResultRow) => void;
}) {
  return (
    <div
      className="flex items-center cursor-pointer space-x-3 p-2 rounded-lg hover:bg-gray-100"
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
