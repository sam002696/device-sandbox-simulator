import LightVisual from "./LightVisual";
import LightControls from "./LightControls";

const LightCanvas = () => {
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full">
      <LightVisual />
      <div className="absolute bottom-10">
        <LightControls />
      </div>
    </div>
  );
};

export default LightCanvas;
