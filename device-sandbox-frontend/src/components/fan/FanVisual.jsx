import { useMemo } from "react";
import fanImg from "../../assets/fan.png"; // your central fan image

const FanVisual = ({ isOn, speed }) => {
  const spinSpeed = useMemo(() => {
    // Map 0–100% → CSS animation duration (slower = higher duration)
    const minDuration = 0.5; // seconds (fast)
    const maxDuration = 5;   // seconds (slow)
    const duration = maxDuration - (speed / 100) * (maxDuration - minDuration);
    return `${duration}s`;
  }, [speed]);

  return (
    <div className="flex items-center justify-center h-[400px] w-[400px]">
      <img
        src={fanImg}
        alt="Fan"
        className={`w-[200px] h-[200px] transition-all duration-500 ease-in-out
          ${isOn ? "animate-spin" : ""}`}
        style={{
          animationDuration: isOn ? spinSpeed : "0s",
          opacity: isOn ? 1 : 0.6,
        }}
      />
    </div>
  );
};

export default FanVisual;
