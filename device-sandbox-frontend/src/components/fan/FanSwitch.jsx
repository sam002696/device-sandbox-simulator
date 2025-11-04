const FanSwitch = ({ isOn, toggle }) => {
  return (
    <button
      onClick={toggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
        ${isOn ? "bg-blue-600" : "bg-gray-500"}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
          ${isOn ? "translate-x-6" : "translate-x-1"}`}
      />
    </button>
  );
};

export default FanSwitch;
