export default function StoryHeaderSkeloton() {
  return (
    <>
      <p className="text-xl font-bold mb-3">Stories</p>
      <div className="flex items-center space-x-3">
        <p className="w-20 bg-gray-200 rounded-xl h-4 animate-pulse"></p>
        <p className="w-20 bg-gray-200 rounded-xl h-4 animate-pulse"></p>
      </div>
      <p className="font-bold mb-3 rounded-xl w-20 mt-3 h-4 bg-gray-200 animate-pulse"></p>
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-12 h-12 rounded-full p-3 bg-gray-100 animate-pulse" />
        <div className="flex flex-col space-y-3">
          <p className="w-24 h-4 rounded-xl bg-gray-200 animate-pulse"></p>
          <p className="w-28 h-4 bg-gray-200 rounded-xl animate-pulse"></p>
        </div>
      </div>
    </>
  );
}
