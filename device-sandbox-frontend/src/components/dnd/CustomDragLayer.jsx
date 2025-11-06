import { useDragLayer } from "react-dnd";
import { motion } from "framer-motion";

function getItemStyles(currentOffset) {
  if (!currentOffset) return { display: "none" };
  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;
  return { transform, WebkitTransform: transform };
}

const CustomDragLayer = () => {
  const { item,  isDragging, currentOffset } = useDragLayer(
    (monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      currentOffset: monitor.getClientOffset(),
      isDragging: monitor.isDragging(),
    })
  );

  if (!isDragging || !currentOffset) return null;

  const label =
    item?.label ||
    (item?.kind === "nav" ? item?.deviceType?.toUpperCase() : "ITEM");

  return (
    <div className="pointer-events-none fixed top-0 left-0 h-full w-1/6 z-9999">
      <div style={getItemStyles(currentOffset)}>
        <motion.div
          initial={{ scale: 0.92, rotate: -2, opacity: 0.9 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: "spring", stiffness: 600, damping: 35 }}
          className="rounded-xl border border-white/10 bg-[#1E293B] px-3 py-2 text-sm text-white shadow-2xl"
        >

          {label}
        </motion.div>
      </div>
    </div>
  );
};

export default CustomDragLayer;
