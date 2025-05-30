export default function CommentsSkeleton() {
  return (
    <div className="flex items-center w-full">
      <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse delay-300"></div>
      <div className="flex flex-col space-y-1">
        <div className="w-3/4 h-6 bg-gray-300 animate-pulse delay-200"></div>
        <div className="w-1/2 h-6 bg-gray-300 animate-pulse delay-200"></div>
      </div>
    </div>
  );
}
