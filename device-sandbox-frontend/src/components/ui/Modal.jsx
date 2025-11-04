import { useDispatch } from "react-redux";
import { closeModal } from "../../redux/fan/fanSlice";


const Modal = () => {
  const dispatch = useDispatch();

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
          className="w-full p-2 rounded-md bg-[#1E2939] text-gray-200 outline-none mb-4"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={() => dispatch(closeModal())}
            className="px-4 py-2 text-sm rounded-md bg-gray-600 hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={() => dispatch(closeModal())}
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
