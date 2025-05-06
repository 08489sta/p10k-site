import React from "react";

const AInythingOverlay = () => {
  return (
    <div className="fixed bottom-4 right-4 text-white text-sm">
      Powered by{" "}
      <a
        href="https://www.ainything.net/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#D6BCFA] font-bold hover:underline"
      >
        AInything
      </a>
    </div>
  );
};

export default AInythingOverlay;
