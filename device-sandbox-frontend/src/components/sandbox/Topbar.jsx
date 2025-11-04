import { Menu } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../ui/Button";
import Modal from "../ui/Modal";

import { clearFan, openModal as openFanModal } from "../../redux/fan/fanSlice";
import {
  clearLight,
  openModal as openLightModal,
} from "../../redux/light/lightSlice";

const Topbar = ({ setSidebarOpen, slice = "fan" }) => {
  const dispatch = useDispatch();
  const { showActions, showModal } = useSelector((state) => state[slice]);

  const handleClear = () => {
    slice === "fan" ? dispatch(clearFan()) : dispatch(clearLight());
  };

  const handleOpenModal = () => {
    slice === "fan" ? dispatch(openFanModal()) : dispatch(openLightModal());
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

      {showModal && <Modal slice={slice} />}
    </header>
  );
};

export default Topbar;
