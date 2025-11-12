import { Menu } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../ui/Button";
import Modal from "../ui/Modal";

import { clearFan, openModal as openFanModal } from "../../redux/fan/fanSlice";
import {
  clearLight,
  openModal as openLightModal,
} from "../../redux/light/lightSlice";

const Topbar = ({ setSidebarOpen, slice = "" }) => {
  const dispatch = useDispatch();

  // Selecting device state based on the provided slice
  const deviceState = useSelector((state) =>
    slice ? state[slice] : { showActions: false, showModal: false }
  );
  // Destructuring state properties
  const { showActions, showModal } = deviceState;

  // Handler to clear device settings
  const handleClear = () => {
    if (slice === "fan") dispatch(clearFan());
    else if (slice === "light") dispatch(clearLight());
  };

  // Handler to open the modal for saving presets
  const handleOpenModal = () => {
    if (slice === "fan") dispatch(openFanModal());
    else if (slice === "light") dispatch(openLightModal());
  };

  return (
    <header className="mt-8 flex items-center justify-between px-4 relative">
      <button
        onClick={() => setSidebarOpen((prev) => !prev)}
        className="lg:hidden text-gray-300 hover:text-white"
      >
        <Menu className="w-6 h-6" />
      </button>

      <h1 className="text-lg font-semibold tracking-wide text-gray-100">
        Testing Canvas
      </h1>

      {/* Action buttons */}
      {showActions && (
        <div className="flex items-center gap-3 absolute right-4 top-0">
          <Button label="Clear" variant="secondary" onClick={handleClear} />
          <Button
            label="Save Preset"
            variant="primary"
            onClick={handleOpenModal}
          />
        </div>
      )}

      {/* Modal for saving presets */}
      {showModal && <Modal slice={slice} />}
    </header>
  );
};

export default Topbar;
