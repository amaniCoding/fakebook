import { fetchStories } from "@/app/libs/data/user";
import Story from "./components/story";
import NavBar from "@/app/ui/home/sections/nav-bar";

export default async function Page(props: {
  params: Promise<{ storyid: string }>;
}) {
  const params = await props.params;
  const { storyid } = params;
  const allStories = await fetchStories();
  return (
    <>
      <NavBar />
      <Story stories={allStories} storyid={storyid} />
    </>
  );
}
