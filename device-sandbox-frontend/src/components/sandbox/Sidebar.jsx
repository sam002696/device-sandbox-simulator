import React from "react";
import { NavLink } from "react-router";
// import { LightBulbIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { FanIcon, LightbulbIcon  } from "lucide-react";

const Sidebar = () => {
  const navItems = [
    { name: "Light", path: "/light", icon: LightbulbIcon },
    { name: "Fan", path: "/fan", icon: FanIcon },
  ];

  return (
    <aside className="w-56 bg-[#0b111e] border-r border-white/5 flex flex-col p-4">
      <h2 className="text-sm  tracking-wide text-gray-400 mb-3">Devices</h2>
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
        <h2 className="text-sm  tracking-wide text-gray-400 mb-3">
          Saved Presets
        </h2>
        <div className="border border-white/5 text-gray-500 text-sm rounded-lg px-3 py-2">
          Nothing added yet
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
