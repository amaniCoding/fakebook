import { fetchPosts } from "@/app/libs/data/user/user";
import FeedItem from "./feed-item";
import { LoggedInUser } from "@/app/config/loggedinuser";

export default async function Feeds() {
  const posts = await fetchPosts(LoggedInUser.userid);

  console.log(posts);

  return (
    <>
      {posts.map((post) => {
        return <FeedItem key={post.post.postId} post={post} />;
      })}
    </>
  );
}
