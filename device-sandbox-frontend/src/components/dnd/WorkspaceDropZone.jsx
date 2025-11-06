import { useMemo, useState } from "react";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

import { applyPreset as applyFanPreset, setActiveTab as setFanTab } from "../../redux/fan/fanSlice";
import { applyPreset as applyLightPreset, setActiveTab as setLightTab } from "../../redux/light/lightSlice";
import { ItemTypes } from "./Draggables";

const WorkspaceDropZone = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropPulse, setDropPulse] = useState(false);

  const [{ isOver, canDrop }, dropRef] = useDrop(
    () => ({
      accept: [ItemTypes.NAV, ItemTypes.PRESET],
      drop: (item) => {
        setDropPulse(true);
        setTimeout(() => setDropPulse(false), 280);

        if (item.kind === "nav") {
          if (item.path) navigate(item.path);
          return;
        }

        if (item.kind === "preset") {
          const type = item.deviceType; // "fan" | "light"
          if (type === "fan") {
            dispatch(applyFanPreset(item.preset));
            dispatch(setFanTab("savedPreset"));
            navigate("/fan");
          } else if (type === "light") {
            dispatch(applyLightPreset(item.preset));
            dispatch(setLightTab("savedPreset"));
            navigate("/light");
          }
          return;
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
      }),
    }),
    [dispatch, navigate]
  );

  const ringClass = useMemo(() => {
    if (isOver && canDrop) return "ring-2 ring-blue-400/70";
    if (isOver && !canDrop) return "ring-2 ring-red-400/70";
    return "ring-0";
  }, [isOver, canDrop]);

  return (
    <motion.div
      ref={dropRef}
      className={`relative h-full w-full ${ringClass}`}
      animate={{ backgroundColor: isOver ? "#0C1426" : "#0A101D" }}
      transition={{ duration: 0.15 }}
    >
      <AnimatePresence>
        {isOver && canDrop && (
          <motion.div
            key="over"
            className="pointer-events-none absolute inset-0 grid place-items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            exit={{ opacity: 0 }}
          >
            <div className="rounded-2xl border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-sm tracking-wide">
              {/* Drop to load into workspace */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {dropPulse && (
          <motion.span
            key="pulse"
            className="pointer-events-none absolute inset-0 rounded-xl"
            initial={{ boxShadow: "0 0 0 0 rgba(59,130,246,0.5)" }}
            animate={{ boxShadow: "0 0 0 24px rgba(59,130,246,0)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
          />
        )}
      </AnimatePresence>

      <div className="h-full w-full">{children}</div>
    </motion.div>
  );
};

export default WorkspaceDropZone;
