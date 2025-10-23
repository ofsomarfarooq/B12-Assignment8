import React from "react";

const AppCardLoading = () => {
  return (
    <div role="status" aria-live="polite" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col p-4 rounded-xl bg-white shadow-xl"
        >
          <div className="overflow-hidden p-2">
            <div className="bg-gray-200 rounded-xl w-full aspect-[3/2] animate-pulse" />
          </div>

          <div className="mt-4 space-y-3">
            <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
          </div>

          <div className="flex items-center justify-between mt-auto pt-4">
            <div className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
            <div className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppCardLoading;