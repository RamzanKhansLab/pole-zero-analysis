import React from 'react';

export function Input({ 
  label, 
  value, 
  onChange, 
  type = 'text',
  min,
  max,
  step,
  className = '',
  placeholder,
  suffix,
  ...props 
}) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-xs font-medium text-slate-600 dark:text-slate-400">
          {label}
        </label>
      )}
      <div className="flex items-center gap-1">
        <input
          type={type}
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          className="flex-1 px-2 py-1.5 text-sm bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-md text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
          {...props}
        />
        {suffix && (
          <span className="text-xs text-slate-500 dark:text-slate-400 min-w-[2rem]">{suffix}</span>
        )}
      </div>
    </div>
  );
}
