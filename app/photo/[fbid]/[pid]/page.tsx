import { fetchAPhoto, fetchPhotos } from "@/app/libs/data/user";
import NavBar from "@/app/ui/home/sections/nav-bar";
import PhotoModal from "@/app/ui/home/post/photo-modal";
export default async function Page(props: {
  params: Promise<{ fbid: string; pid: string }>;
}) {
  const params = await props.params;
  const fbid = params.fbid;
  const pid = params.pid;
  const photo = await fetchAPhoto(fbid, pid);
  console.log(photo);
  const photos = await fetchPhotos(fbid);
  return (
    <>
      <NavBar />
      <PhotoModal photo={photo} photos={photos} />
    </>
  );
}
