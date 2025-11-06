// components/dnd/Draggables.jsx
import React, { useEffect } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import {
  applyPreset as applyFanPreset,
  setActiveTab as setFanTab,
} from "../../redux/fan/fanSlice";
import {
  applyPreset as applyLightPreset,
  setActiveTab as setLightTab,
} from "../../redux/light/lightSlice";

export const ItemTypes = { NAV: "NAV", PRESET: "PRESET" };

// Expects `children` to be a DOM element (e.g., <a>, <li>, <div>) so we can attach ref.
export function DraggableNavItem({ item, children }) {
  const navigate = useNavigate();

  const [{ isDragging }, dragRef, preview] = useDrag(
    () => ({
      type: ItemTypes.NAV,
      item: {
        kind: "nav",
        path: item.path,
        deviceType: String(item.deviceType || "").toLowerCase(),
        label: item.name,
      },
      collect: (monitor) => ({ isDragging: monitor.isDragging() }),
      canDrag: () => true,

      // 👇 Act on ANY successful drop (avoids inner-target swallowing issues)
      end: (dragItem, monitor) => {
        if (!monitor.didDrop()) return;
        if (dragItem?.path) navigate(dragItem.path);
      },
    }),
    [navigate, item]
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

export function DraggablePresetItem({ preset, children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [{ isDragging }, dragRef, preview] = useDrag(
    () => ({
      type: ItemTypes.PRESET,
      item: {
        kind: "preset",
        preset,
        presetId: preset.id ?? preset.tempId,
        label: preset.name,
        deviceType: String(preset?.type || "").toLowerCase(), // "fan" | "light"
      },
      collect: (monitor) => ({ isDragging: monitor.isDragging() }),
      canDrag: () => true,

      // 👇 Act on ANY successful drop (don’t depend on dropResult)
      end: (dragItem, monitor) => {
        if (!monitor.didDrop()) return;

        const t = dragItem?.deviceType;
        if (t === "fan") {
          dispatch(applyFanPreset(dragItem.preset));
          dispatch(setFanTab("savedPreset"));
          navigate("/fan");
          return;
        }
        if (t === "light") {
          dispatch(applyLightPreset(dragItem.preset));
          dispatch(setLightTab("savedPreset"));
          navigate("/light");
          return;
        }
        // Optional debug:
        // console.warn("[DraggablePresetItem.end] Unknown deviceType:", t, dragItem);
      },
    }),
    [dispatch, navigate, preset]
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
