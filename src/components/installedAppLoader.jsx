import React from "react";

const InstalledAppLoader = () => {
  return (
    <div role="status" aria-live="polite" className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-lg shadow-md p-5 mb-5"
        >
          <div className="flex flex-col gap-5 md:flex-row justify-between items-center">
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
              <div className="w-20 h-20 rounded-lg overflow-hidden">
                <div className="w-full h-full bg-gray-200 animate-pulse" />
              </div>
              <div className="flex flex-col gap-3 w-full sm:w-auto mt-2 sm:mt-0">
                <div className="h-5 w-56 bg-gray-200 rounded animate-pulse" />
                <div className="flex items-center gap-5">
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-10 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            </div>
            <div className="w-full md:w-auto mt-3 md:mt-0">
              <div className="h-12 w-full md:w-32 bg-gray-200 rounded-md animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InstalledAppLoader;