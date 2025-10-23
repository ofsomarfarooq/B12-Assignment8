import React from "react";
import { PuffLoader} from "react-spinners";


const Loader = () => {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-gradient-to-b from-white to-gray-100/80 backdrop-blur-sm z-50 animate-fade-in">
      <div className="flex flex-col justify-center items-center gap-6">
        <div className="scale-110">
          <PuffLoader color="#632EE3" speedMultiplier={0.9} />
        </div>
        
        <div className="text-center space-y-1">
          <h2 className="text-2xl md:text-3xl font-bold text-[#632EE3]">
            Loading...
          </h2>
          <p className="text-gray-500 text-sm md:text-base tracking-wide animate-pulse">
            Please wait a moment...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loader;