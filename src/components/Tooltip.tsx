import React from 'react';

interface TooltipProps {
  message: string;
}

const Tooltip: React.FC<TooltipProps> = ({ message }) => {
  return (
    <div className="tooltip absolute left-3/4 top-2 transform w-auto -translate-x-1/2 p-2 bg-blue-500 text-gray-200 text-sm rounded-md opacity-100 transition-opacity duration-300">
      <p>{message}</p>
    </div>
  );
};

export default Tooltip;
