import React, { useState } from "react";
import Sidebar from "../components/sandbox/Sidebar";
import Topbar from "../components/sandbox/Topbar";
import { Outlet, useLocation } from "react-router";

const Sandbox = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

   const isFan = location.pathname.includes("fan");
  const isLight = location.pathname.includes("light");
  const slice = isFan ? "fan" : isLight ? "light" : ""; 

  return (
    <div className="flex h-screen bg-[#03060c] text-gray-200">
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        slice={slice}
      />

      {/* Main Layout */}
      <div className="flex flex-col flex-1">
        <Topbar setSidebarOpen={setSidebarOpen} slice={slice} />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto m-5 bg-[#0A101D] rounded-xl border border-white/5">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Sandbox;
