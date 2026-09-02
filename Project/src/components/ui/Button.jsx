import React from 'react';

const variants = {
  primary: 'bg-sky-500 hover:bg-sky-400 text-white dark:bg-sky-600 dark:hover:bg-sky-500',
  secondary: 'bg-slate-600 hover:bg-slate-500 text-white dark:bg-slate-700 dark:hover:bg-slate-600',
  danger: 'bg-rose-500 hover:bg-rose-400 text-white dark:bg-rose-600 dark:hover:bg-rose-500',
  ghost: 'bg-transparent hover:bg-slate-200 text-slate-700 dark:hover:bg-slate-700 dark:text-slate-300',
  outline: 'border border-slate-300 hover:bg-slate-100 text-slate-700 dark:border-slate-600 dark:hover:bg-slate-700 dark:text-slate-300',
  toggle: 'bg-slate-600 hover:bg-slate-500 text-white dark:bg-slate-700 dark:hover:bg-slate-600',
};

const sizes = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
  lg: 'px-4 py-2 text-base',
};

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  active = false,
  disabled = false,
  className = '',
  ...props 
}) {
  const base = 'inline-flex items-center justify-center font-medium rounded-md transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 dark:focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed';
  const variantClass = variants[variant] || variants.primary;
  const sizeClass = sizes[size] || sizes.md;
  const activeClass = active ? 'ring-2 ring-sky-400 bg-sky-500 text-white dark:bg-sky-600' : '';
  
  return (
    <button 
      className={`${base} ${variantClass} ${sizeClass} ${activeClass} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
