export default function FeedItemSkeleton() {
  return (
    <>
      <div className="flex flex-col w-full h-60 p-3 bg-white mb-4 rounded-lg">
        <div className="flex space-x-4 mb-3 flex-none h-20">
          <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
          <div className="flex flex-col space-y-4">
            <div className="w-24 h-4 rounded-md bg-gray-200 animate-pulse"></div>
            <div className="w-14 h-4 rounded-md bg-gray-200 animate-pulse"></div>
          </div>
        </div>
        <div className="h-20"></div>
        <div className="flex items-center justify-between grow h-10">
          <div className="w-14 h-4 rounded-md bg-gray-200 animate-pulse"></div>
          <div className="w-14 h-4 rounded-md bg-gray-200 animate-pulse delay-200"></div>
          <div className="w-14 h-4 rounded-md bg-gray-200 animate-pulse delay-200"></div>
        </div>
      </div>

      <div className="flex flex-col w-full h-60 p-3 bg-white mb-4 rounded-lg">
        <div className="flex space-x-4 mb-3 flex-none h-20">
          <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
          <div className="flex flex-col space-y-4">
            <div className="w-24 h-4 rounded-md bg-gray-200 animate-pulse delay-150"></div>
            <div className="w-14 h-4 rounded-md bg-gray-200 animate-pulse delay-150"></div>
          </div>
        </div>
        <div className="h-20"></div>
        <div className="flex items-center justify-between grow h-10">
          <div className="w-14 h-4 rounded-md bg-gray-200 animate-pulse delay-200"></div>
          <div className="w-14 h-4 rounded-md bg-gray-200 animate-pulse delay-200"></div>
          <div className="w-14 h-4 rounded-md bg-gray-200 animate-pulse delay-200"></div>
        </div>
      </div>
    </>
  );
}
