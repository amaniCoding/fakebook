export default function CommentsSkeleton() {
  return (
    <div className="flex items-center space-x-2 my-2">
      <div className="w-11 h-11 rounded-full bg-gray-200 animate-pulse delay-300"></div>
      <div className="flex flex-col space-y-2 w-9/12">
        <div className="w-3/4 h-8 rounded-xl bg-gray-300 animate-pulse delay-200"></div>
        <div className="flex items-center space-x-4">
          <div className="w-1/2 h-6 rounded-xl bg-gray-300 animate-pulse delay-300"></div>
          <div className="w-1/2 h-6 rounded-xl bg-gray-300 animate-pulse delay-300"></div>
        </div>
      </div>
    </div>
  );
}
