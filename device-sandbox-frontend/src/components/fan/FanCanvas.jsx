import FanVisual from "./FanVisual";
import FanControls from "./FanControls";

const FanCanvas = () => {
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full">
      {/* Fan visual */}
      <FanVisual />

      {/* Controls container */}
      <div className="absolute bottom-10">
        <FanControls />
      </div>
    </div>
  );
};

export default FanCanvas;
