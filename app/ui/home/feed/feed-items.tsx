import { fetchPosts } from "@/app/libs/data/user/user";
import { LoggedInUser } from "@/app/config/loggedinuser";
import FeedsClient from "./feeds-client/feeds-client";

export default async function Feeds() {
  const feeds = await fetchPosts(LoggedInUser.userid);

  //console.log(feeds);

  return <FeedsClient feeds={feeds} />;
}
