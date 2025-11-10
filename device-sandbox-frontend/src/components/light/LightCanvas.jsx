import LightVisual from "./LightVisual";
import LightControls from "./LightControls";

const LightCanvas = () => {
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full">
      {/* Light visual representation */}
      <div className="-translate-y-12">
        <LightVisual />
      </div>
      <div className="absolute bottom-10">
        {/* Light controls */}
        <LightControls />
      </div>
    </div>
  );
};

export default LightCanvas;
