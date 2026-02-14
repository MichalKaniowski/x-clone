export const NotificationTemplate = () => {
  return (
    <div className="flex gap-3 bg-card shadow-sm p-5 rounded-2xl animate-pulse">
      <div className="bg-muted my-1 rounded-full w-7 h-7"></div>
      <div className="flex-1 space-y-3">
        <div className="bg-muted rounded-full w-9 h-9"></div>
        <div className="space-y-2">
          <div className="bg-muted rounded w-32 h-5"></div>
          <div className="bg-muted rounded w-full h-5"></div>
        </div>
        <div className="bg-muted rounded w-3/4 h-5"></div>
      </div>
    </div>
  );
};

export const NotificationSkeletonLoader = ({
  count = 5,
}: {
  count?: number;
}) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <NotificationTemplate key={`skeleton-${index}`} />
      ))}
    </>
  );
};
