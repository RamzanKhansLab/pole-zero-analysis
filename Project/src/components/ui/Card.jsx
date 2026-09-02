import React from 'react';

export function Card({ children, className = '', title, subtitle, controls }) {
  return (
    <div className={`bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden ${className}`}>
      {(title || controls) && (
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-700">
          <div>
            {title && <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">{title}</h3>}
            {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>}
          </div>
          {controls && <div className="flex items-center gap-2">{controls}</div>}
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}
