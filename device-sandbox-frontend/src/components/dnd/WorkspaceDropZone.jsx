// components/dnd/WorkspaceDropZone.jsx
import { useMemo, useState } from "react";
import { useDrop } from "react-dnd";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { ItemTypes } from "../../constants/itemType";


const WorkspaceDropZone = ({ children }) => {
  const [dropPulse, setDropPulse] = useState(false);

  const [{ isOver, canDrop }, dropRef] = useDrop(
    () => ({
      accept: [ItemTypes.NAV, ItemTypes.PRESET],
      canDrop: () => true,

      drop: () => {
        setDropPulse(true);
        setTimeout(() => setDropPulse(false), 280);
        return { target: "workspace" };
      },

      // Collecting drop zone state
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    []
  );

  const ringClass = useMemo(() => {
    if (isOver && canDrop) return "ring-2 ring-blue-400/70";
    if (isOver && !canDrop) return "ring-2 ring-red-400/70";
    return "ring-0";
  }, [isOver, canDrop]);

  return (
    // Container to capture drops
    <div
      ref={dropRef}
      className={`relative z-0 h-full w-full ${ringClass}`}
      // Making sure browser doesn't block drops
      onDragOver={(e) => e.preventDefault()}
      // ensuring pointer events work inside drop zone
      style={{ pointerEvents: "auto" }}
    >
      {/* Visuals live in motion.div; no refs here */}
      <motion.div
        animate={{ backgroundColor: isOver ? "#0C1426" : "#0A101D" }}
        transition={{ duration: 0.15 }}
        className="relative h-full w-full"
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
                {/* Dropping to load into workspace */}
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
    </div>
  );
};

export default WorkspaceDropZone;
