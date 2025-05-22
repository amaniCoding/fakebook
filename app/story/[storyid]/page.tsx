import {
  fetchAStory,
  fetchAllStories,
  fetchCurrentStoryMedias,
  fetchAllStoriesWithPhotos,
} from "@/app/libs/data/user";
import Home from "./components/home";

export default async function Page(props: {
  params: Promise<{ storyid: string }>;
}) {
  const params = await props.params;
  const { storyid } = params;
  const [allStories, currentStory, currentStoryPhotos, allStoriesWithPhotos] =
    await Promise.all([
      fetchAllStories(),
      fetchAStory(storyid),
      fetchCurrentStoryMedias(storyid),
      fetchAllStoriesWithPhotos(),
    ]);

  return (
    <>
      <Home
        allStories={allStories}
        storyid={storyid}
        allStoriesWithPhotos={allStoriesWithPhotos}
        currentStory={currentStory}
        currentStoryPhotos={currentStoryPhotos}
      />
    </>
  );
}
