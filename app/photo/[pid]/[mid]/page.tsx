import { fetchPostInfo } from "@/app/libs/data/post";
import PhotoModal from "@/app/ui/home/post/photo-modal/photo-modal";
export default async function Page(props: {
  params: Promise<{ pid: string; mid: string }>;
}) {
  const params = await props.params;
  const postId = params.pid;
  const mediaId = params.mid;
  const postInfo = await fetchPostInfo(postId);
  return (
    <>
      <PhotoModal post={postInfo} mediaId={mediaId} postId={postId} />
    </>
  );
}
