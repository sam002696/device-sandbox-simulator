import React from "react";

const LightSwitch = ({ isOn, toggle }) => {
  return (
    <button
      onClick={toggle}
      className={`relative w-12 h-6 rounded-full transition-colors duration-300 
        ${isOn ? "bg-blue-500" : "bg-[#364153]"}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-300 
          ${isOn ? "translate-x-6" : "translate-x-0"}`}
      />
    </button>
  );
};

export default LightSwitch;
