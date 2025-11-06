// components/dnd/Draggables.jsx
import React, { useEffect } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

export const ItemTypes = { NAV: "NAV", PRESET: "PRESET" };

// Expects `children` to be a DOM element (e.g., <div>, <li>, <a>) so we can attach ref.
export function DraggableNavItem({ item, children }) {
  const [{ isDragging }, dragRef, preview] = useDrag(
    () => ({
      type: ItemTypes.NAV,
      item: {
        kind: "nav",
        path: item.path,
        deviceType: item.deviceType,
        label: item.name,
      },
      collect: (monitor) => ({ isDragging: monitor.isDragging() }),
      canDrag: () => true,
    }),
    [item]
  );

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  // Attach the drag ref to the *actual* DOM child
  return React.cloneElement(children, {
    ref: dragRef,
    "data-dragging": isDragging ? "true" : "false",
    style: { ...(children.props.style || {}), touchAction: "none" },
  });
}

export function DraggablePresetItem({ preset, children }) {
  const [{ isDragging }, dragRef, preview] = useDrag(
    () => ({
      type: ItemTypes.PRESET,
      item: {
        kind: "preset",
        preset,
        presetId: preset.id ?? preset.tempId,
        label: preset.name,
        deviceType: preset.type, // "fan" | "light"
      },
      collect: (monitor) => ({ isDragging: monitor.isDragging() }),
      canDrag: () => true,
    }),
    [preset]
  );

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  return React.cloneElement(children, {
    ref: dragRef,
    "data-dragging": isDragging ? "true" : "false",
    style: { ...(children.props.style || {}), touchAction: "none" },
  });
}
