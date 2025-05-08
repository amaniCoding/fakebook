import { BiPlus } from "react-icons/bi";

export default function StoryHeader() {
  return (
    <>
      <p className="text-xl font-bold mb-3">Stories</p>
      <div className="flex items-center space-x-3">
        <p>Active</p>
        <p>Settings</p>
      </div>
      <p className="font-bold mb-3 mt-3">Your Story</p>
      <div className="flex items-center space-x-3 mb-3">
        <BiPlus className="w-12 h-12 rounded-full p-3 bg-gray-100" />
        <div className="flex flex-col">
          <p>Create a story</p>
          <p>Share a photo or write something</p>
        </div>
      </div>
    </>
  );
}
