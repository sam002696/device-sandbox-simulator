import React from "react";

export default function WelcomeScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-gray-400">
      <div className="text-lg mb-4">👋 Welcome!</div>
      <p className="text-sm text-gray-500">
        Select a device from the sidebar to start controlling it.
      </p>
    </div>
  );
}
