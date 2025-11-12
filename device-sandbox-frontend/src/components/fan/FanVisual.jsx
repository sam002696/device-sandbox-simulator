import { useMemo } from "react";
import { useSelector } from "react-redux";
import fanImg from "../../assets/fan.png";

const FanVisual = () => {
  const { isOn, speed } = useSelector((state) => state.fan);

  // Calculating spin speed based on fan speed
  // here useMemo is used to optimize performance by memoizing the calculated spin speed
  const spinSpeed = useMemo(() => {
    const minDuration = 0.5;
    const maxDuration = 5;
    const normalized = Math.pow(speed / 100, 0.7); 
    const duration = maxDuration - normalized * (maxDuration - minDuration);
    return `${duration}s`;
  }, [speed]);

  // Determining if the fan should spin
  const shouldSpin = isOn && speed > 0;

  return (
    <div className="flex items-center justify-center h-[400px] w-[400px]">
      <img
        src={fanImg}
        alt="Fan"
        className={`transition-all duration-500 ease-in-out mb-20 ${
          shouldSpin ? "animate-spin" : ""
        }`}
        // Dynamically setting animation duration and opacity
        style={{
          animationDuration: shouldSpin ? spinSpeed : "0s",
          opacity: shouldSpin ? 1 : 0.6,
        }}
      />
    </div>
  );
};

export default FanVisual;
