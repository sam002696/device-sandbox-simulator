import LightVisual from "./LightVisual";
import LightControls from "./LightControls";

const LightCanvas = () => {
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full">
      {/* Light visual representation */}
      <LightVisual />
      <div className="absolute bottom-10">
        {/* Light controls */}
        <LightControls />
      </div>
    </div>
  );
};

export default LightCanvas;
