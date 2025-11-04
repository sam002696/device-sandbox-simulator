import LightOff from "../../assets/light-off.png";
import LightOn from "../../assets/light-on.png";
import { useSelector } from "react-redux";

const LightVisual = () => {
  const { isOn, brightness, color } = useSelector((state) => state.light);

  // Brightness controls both glow radius & opacity
  const glow = brightness / 100;
  const blurSize = 40 + glow * 80; // softer glow at higher brightness
  const glowOpacity = 0.15 + glow * 0.5;

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
        className="relative z-10 transition-all duration-500 mb-15"
        style={{
          filter: isOn ? `brightness(${1 + glow * 0.6})` : "brightness(0.5)",
        }}
      />
    </div>
  );
};

export default LightVisual;
