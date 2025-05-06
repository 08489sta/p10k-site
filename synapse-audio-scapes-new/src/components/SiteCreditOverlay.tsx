import React from "react";

const SiteCreditOverlay = () => {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-[#221F26] bg-opacity-80 px-4 py-2 rounded-md shadow-lg backdrop-blur-sm">
      <p className="text-white text-sm font-medium">
        site by{" "}
        <a 
          href="https://ainything.net" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[#D6BCFA] font-bold hover:text-[#B794F4] transition-colors"
        >
          AInything
        </a>
      </p>
    </div>
  );
};

export default SiteCreditOverlay;
