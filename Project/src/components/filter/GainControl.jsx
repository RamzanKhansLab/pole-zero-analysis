import React, { useState, useEffect } from 'react';
import { Input } from '../ui/Input.jsx';
import { Button } from '../ui/Button.jsx';

export function GainControl({ gain, onChange }) {
  const [localValue, setLocalValue] = useState(gain.toString());

  useEffect(() => {
    setLocalValue(gain.toString());
  }, [gain]);

  const handleChange = (e) => {
    setLocalValue(e.target.value);
  };

  const handleBlur = () => {
    const parsed = parseFloat(localValue);
    if (!isNaN(parsed) && isFinite(parsed)) {
      onChange(parsed);
    } else {
      setLocalValue(gain.toString());
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleBlur();
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wide">
        System Gain
      </label>
      <div className="flex items-center gap-2">
        <span className="text-sm font-mono text-slate-600 dark:text-slate-400">K =</span>
        <input
          type="text"
          value={localValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="flex-1 px-2 py-1.5 text-sm font-mono bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-md text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
        />
      </div>
    </div>
  );
}
