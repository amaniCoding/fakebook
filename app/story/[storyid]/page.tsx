import {
  fetchAllStories,
  fetchAStory,
  fetchCurrentStoryMedias,
} from "@/app/libs/data/story";
import Home from "./components/home/home";

export default async function Page(props: {
  params: Promise<{ storyid: string }>;
}) {
  const params = await props.params;
  const { storyid } = params;
  const [allStories, currentStory, currentStoryPhotos] = await Promise.all([
    fetchAllStories(),
    fetchAStory(storyid),
    fetchCurrentStoryMedias(storyid),
  ]);

  return (
    <>
      <Home
        allStories={allStories}
        storyid={storyid}
        currentStory={currentStory}
        currentStoryPhotos={currentStoryPhotos}
      />
    </>
  );
}
