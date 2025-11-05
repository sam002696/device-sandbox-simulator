import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router";
import { FanIcon, LightbulbIcon } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { applyPreset, setActiveTab } from "../../redux/fan/fanSlice";
import {
  applyPreset as applyLightPreset,
  setActiveTab as setLightTab,
} from "../../redux/light/lightSlice";
import { getPresets } from "../../redux/shared/presetThunks";

const Sidebar = ({ isFan, slice }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { presets, activePresetId } = useSelector((state) => state[slice]);

  // Fetch presets from backend on mount
  useEffect(() => {
    dispatch(getPresets(isFan ? "fan" : "light")());
  }, [dispatch, isFan]);

  const navItems = [
    { name: "Light", path: "/light", icon: LightbulbIcon },
    { name: "Fan", path: "/fan", icon: FanIcon },
  ];

  const handlePresetClick = (preset) => {
    if (isFan) {
      dispatch(applyPreset(preset));
      dispatch(setActiveTab("savedPreset"));
      navigate("/fan");
    } else {
      dispatch(applyLightPreset(preset));
      dispatch(setLightTab("savedPreset"));
      navigate("/light");
    }
  };


  // console.log('presets', presets)

  return (
    <aside className="w-56 bg-[#0b111e] border-r border-white/5 flex flex-col p-4">
      <h2 className="text-sm tracking-wide text-gray-400 mb-3">Devices</h2>

      <div className="space-y-4">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-xl border border-white/5 transition ${
                isActive
                  ? "bg-[#646F7F] text-white"
                  : "text-gray-400 hover:text-white bg-[#1E2939]"
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </NavLink>
        ))}
      </div>

      <div className="mt-6">
        <h2 className="text-sm tracking-wide text-gray-400 mb-3">
          Saved Presets
        </h2>

        {presets?.length === 0 ? (
          <div className="border border-white/5 text-gray-500 text-sm rounded-lg px-3 py-2">
            Nothing added yet
          </div>
        ) : (
          <ul className="space-y-2">
            {presets?.map((preset) => (
              <li
                key={preset?.id}
                onClick={() => handlePresetClick(preset)}
                className={`cursor-pointer border border-white/5 px-3 py-2 rounded-lg text-sm transition ${
                  preset.id === activePresetId
                    ? "bg-[#364153] text-white"
                    : "text-gray-300 hover:bg-[#1E2939] hover:text-white"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span>{preset?.name}</span>
                  {preset?.id === activePresetId && (
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
