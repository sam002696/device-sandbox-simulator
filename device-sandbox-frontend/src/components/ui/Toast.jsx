import React, { useEffect } from "react";
import { CheckCircle } from "lucide-react";

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 2500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-start justify-center z-50 pointer-events-none">
      <div className="mt-6 animate-toast-slide">
        <div className="flex items-center gap-2 bg-[#2B303B]/90 backdrop-blur-md text-white px-5 py-2 rounded-md shadow-lg border border-[#3B4657]">
          <div className="flex items-center justify-center bg-[#22C55E]/20 rounded-full p-1">
            <CheckCircle className="w-4 h-4 text-[#22C55E]" />
          </div>
          <span className="text-sm font-medium">{message}</span>
        </div>
      </div>
    </div>
  );
};

export default Toast;
