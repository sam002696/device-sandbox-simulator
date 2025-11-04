import { Menu } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { clearFan, openModal } from "../../redux/fan/fanSlice";
import Button from "../ui/Button";
import Modal from "../ui/Modal";

const Topbar = ({ setSidebarOpen }) => {
  const dispatch = useDispatch();
  const { showActions, showModal } = useSelector((state) => state.fan);

  return (
    <header className="mt-8 flex items-center justify-between px-4 relative">
      {/* Mobile toggle */}
      <button
        onClick={() => setSidebarOpen((prev) => !prev)}
        className="lg:hidden text-gray-300 hover:text-white"
      >
        <Menu className="w-6 h-6" />
      </button>

      <h1 className="text-lg font-semibold tracking-wide text-gray-100">
        Testing Canvas
      </h1>

      {/* Right-side buttons */}
      {showActions && (
        <div className="flex items-center gap-3 absolute right-4 top-0">
          <Button
            label="Clear"
            variant="secondary"
            onClick={() => dispatch(clearFan())}
          />
          <Button
            label="Save Preset"
            variant="primary"
            onClick={() => dispatch(openModal())}
          />
        </div>
      )}

      {/* Modal */}
      {showModal && <Modal />}
    </header>
  );
};

export default Topbar;
