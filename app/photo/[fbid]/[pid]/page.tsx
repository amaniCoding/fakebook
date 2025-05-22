import { fetchAPhoto, fetchPhotos } from "@/app/libs/data/user";
import PhotoModal from "@/app/ui/home/post/photo-modal";
import NavBar2 from "@/app/ui/home/sections/nav-bar2";
export default async function Page(props: {
  params: Promise<{ fbid: string; pid: string }>;
}) {
  const params = await props.params;
  const fbid = params.fbid;
  const pid = params.pid;

  const [photo, photos] = await Promise.all([
    fetchAPhoto(fbid, pid),
    fetchPhotos(fbid),
  ]);
  return (
    <>
      <NavBar2 />
      <PhotoModal photo={photo} photos={photos} />
    </>
  );
}
