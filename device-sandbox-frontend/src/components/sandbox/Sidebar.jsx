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
import { DraggableNavItem, DraggablePresetItem } from "../dnd/Draggables";

const Sidebar = ({ slice }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isHome = !slice;
  const { presets, activePresetId } = useSelector((state) =>
    isHome ? state.global : state[slice]
  );

  useEffect(() => {
    dispatch(getPresets(slice || "")());
  }, [dispatch, slice]);

  const navItems = [
    { name: "Light", path: "/light", icon: LightbulbIcon, deviceType: "light" },
    { name: "Fan", path: "/fan", icon: FanIcon, deviceType: "fan" },
  ];

  const handlePresetClick = (preset) => {
    if (preset.type === "fan") {
      dispatch(applyPreset(preset));
      dispatch(setActiveTab("savedPreset"));
      navigate("/fan");
    } else if (preset.type === "light") {
      dispatch(applyLightPreset(preset));
      dispatch(setLightTab("savedPreset"));
      navigate("/light");
    }
  };

  return (
    <aside className="w-56 bg-[#0b111e] border-r border-white/5 flex flex-col p-4 overflow-y-scroll scrollbar-hidden">
      <h2 className="text-sm tracking-wide text-gray-400 mb-3">Devices</h2>

      <div className="space-y-4">
        {navItems.map((item) => (
          <DraggableNavItem key={item.name} item={item}>
            <NavLink
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
          </DraggableNavItem>
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
            {presets?.map((preset) => {
              const key = preset.id ?? preset.tempId;
              const isActive = (preset.id ?? preset.tempId) === activePresetId;
              return (
                <DraggablePresetItem key={key} preset={preset}>
                  <li
                    onClick={() => handlePresetClick(preset)}
                    className={`cursor-pointer border border-white/5 px-3 py-2 rounded-lg text-sm transition ${
                      isActive
                        ? "bg-[#364153] text-white"
                        : "text-gray-300 hover:bg-[#1E2939] hover:text-white"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{preset?.name}</span>
                      {isActive && (
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      )}
                    </div>
                  </li>
                </DraggablePresetItem>
              );
            })}
          </ul>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
