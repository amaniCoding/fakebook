import StoryItem from "./story-item";
import { QueryResultRow } from "@vercel/postgres";

export default function Stories(props: {
  stories: QueryResultRow[];
  showStoryPhoto: (story: QueryResultRow) => void;
}) {
  return (
    <div className="flex flex-col">
      {props.stories.map((story) => {
        return (
          <StoryItem
            key={story.storyid}
            story={story}
            showStoryPhoto={props.showStoryPhoto}
          />
        );
      })}
    </div>
  );
}
