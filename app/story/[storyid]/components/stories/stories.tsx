import StoryItem from "../story-item/story-item";
import { StoriesProps } from "./types";
export default function Stories(props: StoriesProps) {
  return (
    <div className="flex flex-col space-y-1">
      {props.allStories.map((story) => {
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
