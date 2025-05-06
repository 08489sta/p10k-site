
import React from "react";

const BubbleLettering: React.FC = () => {
  return (
    <div className="absolute top-8 left-0 right-0 z-10 flex justify-center pointer-events-none">
      <div className="text-center">
        <h1 
          className="font-bold text-5xl md:text-6xl lg:text-7xl tracking-wider"
          style={{
            color: "#9F9EA1", 
            textShadow: `
              0 1px 0 #5e5e5e,
              0 2px 0 #5c5c5c,
              0 3px 0 #5a5a5a,
              0 4px 0 #585858,
              0 5px 0 #565656,
              0 6px 0 #545454,
              0 7px 0 #525252,
              0 8px 7px rgba(0, 0, 0, 0.4),
              0 9px 10px rgba(0, 0, 0, 0.2)
            `,
            transform: "perspective(500px) rotateX(10deg)",
          }}
        >
          PRODIGY10K
        </h1>
      </div>
    </div>
  );
};

export default BubbleLettering;
