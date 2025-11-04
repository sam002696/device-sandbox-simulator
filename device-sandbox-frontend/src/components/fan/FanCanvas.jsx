import React, { useState } from "react";
import FanVisual from "./FanVisual";
import FanControls from "./FanControls";

const FanCanvas = () => {
  const [isOn, setIsOn] = useState(false);
  const [speed, setSpeed] = useState(64);

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full">
      {/* Fan visual */}
      <FanVisual isOn={isOn} speed={speed} />

      {/* Controls container */}
      <div className="absolute bottom-10">
        <FanControls
          isOn={isOn}
          setIsOn={setIsOn}
          speed={speed}
          setSpeed={setSpeed}
        />
      </div>
    </div>
  );
};

export default FanCanvas;
