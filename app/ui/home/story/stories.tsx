import { fetchStories } from "@/app/libs/data/user";
import StorySlider from "./story-slider";
export default async function Stories() {
  const stories = await fetchStories();

  return (
    <div className="w-full h-60 mb-4">
      <StorySlider stories={stories} />
    </div>
  );
}
