import React from 'react';
import { PRESET_LIST } from '../../core/dsp/presets.js';
import { Button } from '../ui/Button.jsx';

export function PresetSelector({ activePreset, onSelect }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wide">
        Filter Presets
      </label>
      <div className="grid grid-cols-1 gap-2">
        {PRESET_LIST.map((preset) => (
          <button
            key={preset.key}
            onClick={() => onSelect(preset.key)}
            className={`flex flex-col items-start p-3 rounded-lg border transition-all duration-150 text-left ${
              activePreset === preset.key
                ? 'border-sky-500 bg-sky-50 dark:bg-sky-900/20 dark:border-sky-400'
                : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700/50'
            }`}
          >
            <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
              {preset.description}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {preset.details}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
