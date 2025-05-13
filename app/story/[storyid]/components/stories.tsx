import { Story } from "@/app/types/db/user/story";
import StoryItem from "./story-item";
export default function Stories(props: {
  allStories: Story[];
  showStoryPhoto: (story: Story) => void;
}) {
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
