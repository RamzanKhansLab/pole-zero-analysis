import React from 'react';

const statusColors = {
  stable: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
  marginal: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  unstable: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400',
};

export function Badge({ status, children, className = '' }) {
  const colorClass = statusColors[status] || statusColors.stable;
  
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${colorClass} ${className}`}>
      {children || status?.toUpperCase()}
    </span>
  );
}
