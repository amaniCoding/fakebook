export default function FeedItemSkeleton() {
  return (
    <div className="relative w-full overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent p-3 bg-white">
      <div className="flex space-x-4 mb-3">
        <div className="w-10 h-10 rounded-full bg-gray-200"></div>
        <div className="flex flex-col space-y-4">
          <div className="w-24 h-5 rounded-md bg-gray-200"></div>
          <div className="w-14 h-5 rounded-md bg-gray-200"></div>
        </div>
      </div>
      <div className="w-full h-10 rounded-md bg-gray-200 mb-5"></div>
      <div className="w-full py-24 rounded-md bg-gray-200"></div>
      <div className="w-full py-5 bg-white"></div>
      <div className="flex items-center justify-between">
        <div className="w-14 h-5 rounded-md bg-gray-200"></div>
        <div className="w-14 h-5 rounded-md bg-gray-200"></div>
      </div>
    </div>
  );
}
