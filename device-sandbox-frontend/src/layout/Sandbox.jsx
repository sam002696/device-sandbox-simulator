import React, { useState } from "react";
import Sidebar from "../components/sandbox/Sidebar";
import Topbar from "../components/sandbox/Topbar";
import { Outlet, useLocation } from "react-router";
import WorkspaceDropZone from "../components/dnd/WorkspaceDropZone";
import CustomDragLayer from "../components/dnd/CustomDragLayer";

const Sandbox = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Determining current device slice based on URL
  const isFan = location.pathname.includes("fan");
  // determining if the current view is the home view
  const isLight = location.pathname.includes("light");
  // setting slice based on current view
  const slice = isFan ? "fan" : isLight ? "light" : "";

  return (
    <>
      <div className="flex h-screen bg-[#03060c] text-gray-200">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          slice={slice}
        />

        <div className="flex flex-col flex-1">
          {/* Top bar */}
          <Topbar setSidebarOpen={setSidebarOpen} slice={slice} />

          <main className="flex-1 m-5 rounded-xl border border-white/5 bg-[#0A101D] overflow-hidden">
            {/* Workspace drop zone */}
            <WorkspaceDropZone>
              <Outlet />
            </WorkspaceDropZone>
          </main>
        </div>
      </div>

      <CustomDragLayer />
    </>
  );
};

export default Sandbox;
