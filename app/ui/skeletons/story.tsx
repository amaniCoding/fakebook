export default function StoryItemSkeleton() {
  return (
    <div className="w-full h-60 space-x-3 flex mb-4 bg-gray-100">
      <div className="w-40 h-full rounded-xl relative bg-white">
        <div className="w-8 h-8 rounded-full bg-gray-100 animate-pulse absolute top-2 left-2"></div>
        <div className="absolute w-24 bottom-2 left-2 h-2 bg-gray-100 animate-pulse"></div>
      </div>
      <div className="w-40 h-full rounded-xl relative bg-white">
        <div className="w-8 h-8 rounded-full bg-gray-100 animate-pulse absolute top-2 left-2"></div>
        <div className="absolute w-24 bottom-2 left-2 h-2 bg-gray-100 animate-pulse"></div>
      </div>
      <div className="w-40 h-full rounded-xl relative bg-white">
        <div className="w-8 h-8 rounded-full bg-gray-100 animate-pulse absolute top-2 left-2"></div>
        <div className="absolute w-24 bottom-2 left-2 h-2 bg-gray-100 animate-pulse"></div>
      </div>
      <div className="w-40 h-full rounded-xl relative bg-white">
        <div className="w-8 h-8 rounded-full bg-gray-100 animate-pulse absolute top-2 left-2"></div>
        <div className="absolute w-24 bottom-2 left-2 h-2 bg-gray-100 animate-pulse"></div>
      </div>
    </div>
  );
}
