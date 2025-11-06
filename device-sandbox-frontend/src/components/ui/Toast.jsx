import { useEffect } from "react";
import { CheckCircle, AlertTriangle, Info, XCircle } from "lucide-react";

const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 2500);
    return () => clearTimeout(timer);
  }, [onClose]);

  const toastConfig = {
    success: {
      icon: <CheckCircle className="w-4 h-4 text-[#22C55E]" />,
      bg: "bg-[#22C55E]/20",
      border: "border-[#22C55E]/40",
    },
    error: {
      icon: <XCircle className="w-4 h-4 text-[#EF4444]" />,
      bg: "bg-[#EF4444]/20",
      border: "border-[#EF4444]/40",
    },
    warning: {
      icon: <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />,
      bg: "bg-[#F59E0B]/20",
      border: "border-[#F59E0B]/40",
    },
    info: {
      icon: <Info className="w-4 h-4 text-[#3B82F6]" />,
      bg: "bg-[#3B82F6]/20",
      border: "border-[#3B82F6]/40",
    },
  };

  const { icon, bg, border } = toastConfig[type] || toastConfig.success;

  return (
    <div className="fixed inset-0 flex items-start justify-center z-60 pointer-events-none">
      <div className="mt-6 animate-toast-slide">
        <div
          className={`flex items-center gap-2 ${bg} backdrop-blur-md text-white px-5 py-2 rounded-md shadow-lg border ${border} pointer-events-auto`}
        >
          <div className="flex items-center justify-center rounded-full p-1 bg-black/20">
            {icon}
          </div>
          <span className="text-sm font-medium">{message}</span>
        </div>
      </div>
    </div>
  );
};

export default Toast;
