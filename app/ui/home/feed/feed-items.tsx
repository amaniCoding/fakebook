import { fetchPosts } from "@/app/libs/data/user";
import FeedItem from "./feed-item";

export default async function Feeds() {
  const posts = await fetchPosts();

  return (
    <>
      {posts.map((post) => {
        return <FeedItem post={post} key={post.postid} />;
      })}
    </>
  );
}
