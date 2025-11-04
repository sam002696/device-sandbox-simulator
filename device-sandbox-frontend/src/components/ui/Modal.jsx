import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import {
  closeModal as closeFanModal,
  savePreset as saveFanPreset,
  showToast as showFanToast,
} from "../../redux/fan/fanSlice";

import {
  closeModal as closeLightModal,
  savePreset as saveLightPreset,
  showToast as showLightToast,
} from "../../redux/light/lightSlice";

const Modal = ({ slice = "fan" }) => {
  const dispatch = useDispatch();
  const deviceState = useSelector((state) => state[slice]);
  const [name, setName] = useState("");

  const handleSave = () => {
    if (name.trim() === "") return;

    if (slice === "fan") {
      dispatch(
        saveFanPreset(name, {
          power: deviceState.isOn,
          speed: deviceState.speed,
        })
      );
      dispatch(showFanToast("Preset saved"));
      dispatch(closeFanModal());
    } else {
      dispatch(
        saveLightPreset(name, {
          power: deviceState.isOn,
          brightness: deviceState.brightness,
          color: deviceState.color,
        })
      );
      dispatch(showLightToast("Preset saved"));
      dispatch(closeLightModal());
    }

    setName("");
  };

  const handleClose =
    slice === "fan"
      ? () => dispatch(closeFanModal())
      : () => dispatch(closeLightModal());

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-[#101828] border border-[#364153] rounded-lg p-6 w-[400px]">
        <h2 className="text-lg text-gray-100 mb-2">Give me a name</h2>
        <p className="text-gray-400 text-sm mb-4">
          By adding this effect as a preset you can reuse it anytime.
        </p>

        <input
          type="text"
          placeholder="Name it"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 rounded-md bg-[#1E2939] text-gray-200 outline-none mb-4"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-sm rounded-md bg-gray-600 hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm rounded-md bg-blue-600 hover:bg-blue-700"
          >
            Save Preset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
