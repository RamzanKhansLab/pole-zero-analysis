import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button.jsx';
import { formatNumber } from '../../core/dsp/formatting.js';

export function RootRow({ root, index, kind, onUpdate, onDelete }) {
  const [localValue, setLocalValue] = useState('');
  const [localRadius, setLocalRadius] = useState('');
  const [localAngle, setLocalAngle] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const prefix = kind === 'pole' ? 'P' : 'Z';
  const colorClass = kind === 'pole' ? 'text-rose-500' : 'text-sky-500';

  useEffect(() => {
    if (!isEditing) {
      if (root.type === 'real') {
        setLocalValue(root.value.toString());
      } else {
        setLocalRadius(root.radius.toString());
        setLocalAngle(root.angle.toString());
      }
    }
  }, [root, isEditing]);

  const handleValueBlur = () => {
    const parsed = parseFloat(localValue);
    if (!isNaN(parsed) && isFinite(parsed)) {
      onUpdate(index, { type: 'real', value: parsed });
    } else {
      setLocalValue(root.value.toString());
    }
    setIsEditing(false);
  };

  const handleRadiusBlur = () => {
    const parsed = parseFloat(localRadius);
    if (!isNaN(parsed) && isFinite(parsed) && parsed >= 0) {
      onUpdate(index, { ...root, radius: parsed });
    } else {
      setLocalRadius(root.radius.toString());
    }
    setIsEditing(false);
  };

  const handleAngleBlur = () => {
    const parsed = parseFloat(localAngle);
    if (!isNaN(parsed) && isFinite(parsed)) {
      onUpdate(index, { ...root, angle: parsed });
    } else {
      setLocalAngle(root.angle.toString());
    }
    setIsEditing(false);
  };

  return (
    <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
      <span className={`text-xs font-bold ${colorClass} min-w-[1.5rem]`}>
        {prefix}{index + 1}
      </span>
      
      <span className="text-xs text-slate-500 dark:text-slate-400 min-w-[4rem]">
        {root.type === 'real' ? 'Real' : 'Complex'}
      </span>

      {root.type === 'real' ? (
        <input
          type="text"
          value={isEditing ? localValue : root.value}
          onChange={(e) => {
            setLocalValue(e.target.value);
            setIsEditing(true);
          }}
          onBlur={handleValueBlur}
          onKeyDown={(e) => e.key === 'Enter' && handleValueBlur()}
          className="flex-1 px-2 py-1 text-xs font-mono bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-400"
        />
      ) : (
        <div className="flex-1 flex items-center gap-1">
          <div className="flex items-center gap-1 flex-1">
            <span className="text-xs text-slate-500 dark:text-slate-400">r</span>
            <input
              type="text"
              value={isEditing ? localRadius : root.radius}
              onChange={(e) => {
                setLocalRadius(e.target.value);
                setIsEditing(true);
              }}
              onBlur={handleRadiusBlur}
              onKeyDown={(e) => e.key === 'Enter' && handleRadiusBlur()}
              className="w-full px-1.5 py-1 text-xs font-mono bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-400"
            />
          </div>
          <div className="flex items-center gap-1 flex-1">
            <span className="text-xs text-slate-500 dark:text-slate-400">φ</span>
            <input
              type="text"
              value={isEditing ? localAngle : root.angle}
              onChange={(e) => {
                setLocalAngle(e.target.value);
                setIsEditing(true);
              }}
              onBlur={handleAngleBlur}
              onKeyDown={(e) => e.key === 'Enter' && handleAngleBlur()}
              className="w-full px-1.5 py-1 text-xs font-mono bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-400"
            />
          </div>
        </div>
      )}

      <Button
        variant="ghost"
        size="sm"
        onClick={() => onDelete(index)}
        className="!p-1 !text-rose-500 hover:!bg-rose-50 dark:hover:!bg-rose-900/20"
        title={`Delete ${kind}`}
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </Button>
    </div>
  );
}
