import { useDispatch, useSelector } from "react-redux";
import { togglePower, setSpeed } from "../../redux/fan/fanSlice";
import FanSwitch from "./FanSwitch";

const FanControls = () => {
  const dispatch = useDispatch();
  const { isOn, speed } = useSelector((state) => state.fan);

  return (
    <div className="bg-[#101828] border border-[#364153] rounded-xl p-5 w-[320px]">
      {/* Power toggle */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-300">Power</span>
        <FanSwitch isOn={isOn} toggle={() => dispatch(togglePower())} />
      </div>

      {/* Speed slider */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-300">Speed</span>
        <span className="text-sm text-gray-400">{speed}%</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={speed}
        onChange={(e) => dispatch(setSpeed(Number(e.target.value)))}
        className="w-full mt-2 accent-blue-500"
      />
    </div>
  );
};

export default FanControls;
