import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

// Async thunks
import { savePresetOptimistic } from "../../redux/shared/presetThunks";

// Actions
import { closeModal as closeFanModal } from "../../redux/fan/fanSlice";
import { closeModal as closeLightModal } from "../../redux/light/lightSlice";
import Button from "./Button";
import Input from "./Input";

const Modal = ({ slice = "fan" }) => {
  const dispatch = useDispatch();
  const deviceState = useSelector((state) => state[slice]);
  const [name, setName] = useState("");

  const handleSave = () => {
    if (name.trim() === "") return;

    // Prepare settings based on device type
    const settings =
      slice === "fan"
        ? { power: deviceState.isOn, speed: deviceState.speed }
        : {
            power: deviceState.isOn,
            brightness: deviceState.brightness,
            color: deviceState.color,
          };

    // Temporary ID for optimistic updates
    const tempId = crypto.randomUUID();

    // Dispatch async thunk (optimistic)
    dispatch(
      savePresetOptimistic(slice)({
        tempId,
        name,
        settings,
      })
    );

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

        <Input
          placeholder="Name it"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <Button label="Cancel" variant="secondary" onClick={handleClose} />
          <Button
            label="Save Preset"
            variant="primary"
            onClick={handleSave}
            disabled={!name.trim()}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
