export const PostTemplate = () => {
  return (
    <div className="p-4 border rounded-xl animate-pulse">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-muted rounded-full w-9 h-9"></div>
        <div className="flex-1 space-y-2">
          <div className="bg-muted rounded w-24 h-4"></div>
          <div className="bg-muted rounded w-16 h-3"></div>
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="bg-muted rounded w-full h-4"></div>
        <div className="bg-muted rounded w-3/4 h-4"></div>
        <div className="bg-muted rounded w-1/2 h-4"></div>
      </div>
      <div className="bg-muted mb-4 h-px"></div>
      <div className="flex justify-between">
        <div className="flex gap-3">
          <div className="bg-muted rounded w-16 h-8"></div>
          <div className="bg-muted rounded w-16 h-8"></div>
        </div>
        <div className="bg-muted rounded w-8 h-8"></div>
      </div>
    </div>
  );
};

export const PostSkeletonLoader = ({ count = 3 }: { count?: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <PostTemplate key={`skeleton-${index}`} />
      ))}
    </>
  );
};
