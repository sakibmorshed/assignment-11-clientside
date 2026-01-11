const SkeletonLoader = () => {
  return (
    <div className="w-full sm:w-64 max-w-sm mx-auto p-2 bg-gray-200 dark:bg-gray-700 rounded-xl shadow-lg animate-pulse">
      <div className="flex flex-col gap-3 w-full p-2">
        {/* Image Skeleton */}
        <div className="aspect-square w-full bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
        
        {/* Title Skeleton */}
        <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
        
        {/* Chef Name Skeleton */}
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
        
        {/* Rating and Price Skeleton */}
        <div className="flex items-center justify-between mt-1">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-12"></div>
          <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
        </div>
        
        {/* Button Skeleton */}
        <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded-lg mt-2"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
