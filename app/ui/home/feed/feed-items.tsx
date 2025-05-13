import { fetchPosts } from "@/app/libs/data/user";
import FeedItem from "./feed-item";

export default async function Feeds() {
  const posts = await fetchPosts();

  return (
    <>
      {posts.map((post) => {
        return (
          <FeedItem
            postId={post.postId}
            fname={post.fname}
            lname={post.lname}
            profilepic={post.profilepic}
            post={post.post}
            photos={post.photos}
            key={post.postId}
          />
        );
      })}
    </>
  );
}
