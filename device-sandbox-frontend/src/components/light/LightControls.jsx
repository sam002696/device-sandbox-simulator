import { useDispatch, useSelector } from "react-redux";
import {
  togglePower,
  setBrightness,
  setColor,
} from "../../redux/light/lightSlice";
import DeviceSwitch from "../ui/DeviceSwitch";


const LightControls = () => {
  const dispatch = useDispatch();
  const { isOn, brightness, color } = useSelector((state) => state.light);

  const colorOptions = [
    "#FFD580", // warm
    "#FFF8DC", // soft white
    "#CDE8FF", // cool white
    "#C4D4F2", // daylight
    "#EEC6D0", // pinkish
  ];

  return (
    <div className="bg-[#101828] border border-[#364153] rounded-xl p-5 w-[340px]">
      {/* Power toggle */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-300">Power</span>
        <DeviceSwitch isOn={isOn} toggle={() => dispatch(togglePower())} />
      </div>

      {/* Color Temperature */}
      <div className="mb-4">
        <span className="text-sm text-gray-300 block mb-2">Color Temperature</span>
        <div className="flex gap-2">
          {colorOptions.map((c) => (
            <button
              key={c}
              onClick={() => dispatch(setColor(c))}
              disabled={!isOn}
              className={`w-8 h-8 rounded-md border-2 transition ${
                c === color ? "border-blue-400" : "border-transparent"
              }`}
              style={{
                backgroundColor: c,
                opacity: isOn ? 1 : 0.4,
              }}
            />
          ))}
        </div>
      </div>

      {/* Brightness */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-300">Brightness</span>
        <span className="text-sm text-gray-400">{brightness}%</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={brightness}
        onChange={(e) => dispatch(setBrightness(Number(e.target.value)))}
        disabled={!isOn}
        className="w-full mt-2 accent-blue-500"
      />
    </div>
  );
};

export default LightControls;
