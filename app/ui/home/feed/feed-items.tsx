import { LoggedInUser } from "@/app/config/loggedinuser";
import FeedsClient from "./feeds-client/feeds-client";
import { fetchPosts } from "@/app/libs/data/post";

export default async function Feeds() {
  const feeds = await fetchPosts(LoggedInUser.userid);

  //console.log(feeds);

  return <FeedsClient feeds={feeds} />;
}
