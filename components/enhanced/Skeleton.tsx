export function PropertyCardSkeleton() {
  return (
    <div className="h-full rounded-2xl overflow-hidden bg-white dark:bg-neutral-900 border border-gray-200 dark:border-gray-800 shadow-lg">
      {/* Image Skeleton */}
      <div className="h-56 md:h-64 bg-gray-200 dark:bg-gray-800 animate-pulse" />

      {/* Content Skeleton */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <div className="space-y-2">
          <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/3 animate-pulse" />
        </div>

        {/* Price */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-3">
          <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
          <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
        </div>

        {/* Button */}
        <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
      </div>
    </div>
  );
}

export function SkeletonLoader() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="h-20 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
      ))}
    </div>
  );
}
