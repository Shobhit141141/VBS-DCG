// ToolTip.js
import React, { useState } from "react";
import { FiInfo } from "react-icons/fi";
import "../css/ToolTip.css"; // Ensure correct CSS import

const ToolTip = ({ text }) => {
  const [tooltip, setTooltip] = useState(false);

  const handleMouseEnter = () => {
    setTooltip(true);
  };

  const handleMouseLeave = () => {
    setTooltip(false);
  };

  return (
    <div className="tooltip-container">
      <FiInfo
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="ml-2 cursor-pointer text-gray-500"
      />
      {tooltip && <div className="tooltip-text">{text}</div>}
    </div>
  );
};

export default ToolTip;
