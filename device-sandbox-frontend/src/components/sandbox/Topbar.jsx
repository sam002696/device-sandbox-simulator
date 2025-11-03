import { Menu } from "lucide-react";

const Topbar = ({ setSidebarOpen }) => {
  return (
    <header className="mt-8  flex items-center justify-between px-4">
      {/* Mobile toggle (optional) */}
      <button
        onClick={() => setSidebarOpen((prev) => !prev)}
        className="lg:hidden text-gray-300 hover:text-white"
      >
        <Menu className="w-6 h-6" />
      </button>

      <h1 className="text-lg font-semibold tracking-wide text-gray-100">
        Testing Canvas
      </h1>
    </header>
  );
};

export default Topbar;
