import React, { useState, useRef } from 'react';

export function Tooltip({ content, children, position = 'top' }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <span 
      className="relative inline-flex"
      ref={ref}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && content && (
        <span className={`absolute z-50 px-2 py-1 text-xs font-medium text-white bg-slate-800 dark:bg-slate-200 dark:text-slate-900 rounded shadow-lg whitespace-nowrap pointer-events-none animate-fade-in ${positionClasses[position]}`}>
          {content}
        </span>
      )}
    </span>
  );
}
