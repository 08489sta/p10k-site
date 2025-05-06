
import React, { Suspense } from "react";
import Spline from "@splinetool/react-spline";

interface SplineSceneProps {
  splineUrl: string;
  onLoad?: (spline: any) => void;
}

const SplineScene: React.FC<SplineSceneProps> = ({ splineUrl, onLoad }) => {
  return (
    <div className="w-full h-full">
      <Suspense fallback={<Loading />}>
        <Spline scene={splineUrl} onLoad={onLoad} />
      </Suspense>
    </div>
  );
};

const Loading = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-white text-opacity-80 flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-t-purple-500 border-white border-opacity-20 rounded-full animate-spin mb-4"></div>
        <p>Loading 3D scene...</p>
      </div>
    </div>
  );
};

export default SplineScene;
