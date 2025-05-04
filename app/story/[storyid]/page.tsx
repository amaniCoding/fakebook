import {
  fetchAllStoriesWithPhotos,
  fetchAStory,
  fetchStories,
  fetchStoryPhotos,
} from "@/app/libs/data/user";
import Home from "./components/home";

export default async function Page(props: {
  params: Promise<{ storyid: string }>;
}) {
  const params = await props.params;
  const { storyid } = params;
  const stories = await fetchStories();
  const storyPhotos = await fetchAllStoriesWithPhotos();
  const currentStory = await fetchAStory(storyid);
  const currentStoryPhotos = await fetchStoryPhotos(storyid);

  return (
    <>
      <Home
        stories={stories}
        storyPhotos={storyPhotos}
        storyid={storyid}
        currentStory={currentStory}
        currentStoryPhotos={currentStoryPhotos}
      />
    </>
  );
}
