import { fetchPosts } from "@/app/libs/data/user/user";
import FeedItem from "./feed-item";

export default async function Feeds() {
  const posts = await fetchPosts();

  console.log(posts);

  return (
    <>
      {posts.map((post) => {
        return <FeedItem key={post.post.postId} post={post} />;
      })}
    </>
  );
}
