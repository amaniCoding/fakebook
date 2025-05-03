import {
  fetchAllStoriesWithPhotos,
  fetchStories,
  fetchStoryPhotos,
} from "@/app/libs/data/user";
import NavBar from "@/app/ui/home/sections/nav-bar";
import Home from "./components/home";

export default async function Page(props: {
  params: Promise<{ storyid: string }>;
}) {
  const params = await props.params;
  const { storyid } = params;
  const allStories = await fetchStories();
  const allStoriesWithPhotos = await fetchAllStoriesWithPhotos();
  const storyPhotos = await fetchStoryPhotos(storyid);

  return (
    <>
      <NavBar />
      <Home
        stories={allStories}
        storyPhotos={storyPhotos}
        allStoriesWithPhotos={allStoriesWithPhotos}
        storyid={storyid}
      />
    </>
  );
}
