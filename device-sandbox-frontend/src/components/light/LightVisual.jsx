import LightOff from "../../assets/light-off.png";
import LightOn from "../../assets/light-on.png";
import { useSelector } from "react-redux";

const LightVisual = () => {
  const { isOn, brightness, color } = useSelector((state) => state.light);

  // Brightness controls both glow radius & opacity
  const glow = brightness / 100;
  const blurSize = 30 + Math.pow(glow, 0.8) * 100; // softer curve
  const glowOpacity = 0.1 + Math.pow(glow, 1.2) * 0.6; // faster brightening

  return (
    <div className="relative flex items-center justify-center transition-all duration-500">
      {/* glowing aura */}
      {isOn && (
        <div
          className="absolute rounded-full transition-all duration-500"
          style={{
            width: `${200 + glow * 100}px`,
            height: `${200 + glow * 100}px`,
            background: color,
            opacity: glowOpacity,
            filter: `blur(${blurSize}px)`,
          }}
        ></div>
      )}

      {/* actual light bulb image */}
      <img
        src={isOn ? LightOn : LightOff}
        alt="Light Bulb"
        className="relative z-10 transition-all duration-500 mb-20"
        style={{
          filter: isOn ? `brightness(${1 + glow * 0.6})` : "brightness(0.5)",
        }}
      />
    </div>
  );
};

export default LightVisual;
