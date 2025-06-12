import { fetchPostInfo } from "@/app/libs/data/user/user";
import PhotoModal from "@/app/ui/home/post/photo-modal/photo-modal";
import NavBar2 from "@/app/ui/home/sections/nav-bar2";
export default async function Page(props: {
  params: Promise<{ pid: string; mid: string }>;
}) {
  const params = await props.params;
  const postId = params.pid;
  const mediaId = params.mid;
  const postInfo = await fetchPostInfo(postId);
  return (
    <>
      <NavBar2 />
      <PhotoModal postInfo={postInfo} mediaId={mediaId} postId={postId} />
    </>
  );
}
