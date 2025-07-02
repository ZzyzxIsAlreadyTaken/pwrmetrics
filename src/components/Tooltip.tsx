import React, { useState, useRef } from "react";

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  align?: "left" | "center" | "right";
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  align = "center",
}) => {
  const [visible, setVisible] = useState(false);
  const timeout = useRef<number | null>(null);

  const show = () => {
    timeout.current = window.setTimeout(() => setVisible(true), 100);
  };
  const hide = () => {
    if (timeout.current) window.clearTimeout(timeout.current);
    setVisible(false);
  };

  let positionClass = "left-1/2 -translate-x-1/2";
  if (align === "left") positionClass = "left-0";
  if (align === "right") positionClass = "right-0";

  return (
    <span
      className="relative inline-block"
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      {children}
      {visible && (
        <div
          className={`absolute z-50 mt-2 px-3 py-2 rounded bg-gray-900/70 text-white text-xs shadow-lg whitespace-pre-line min-w-[180px] max-w-xs ${positionClass}`}
        >
          {content}
        </div>
      )}
    </span>
  );
};

export default Tooltip;
