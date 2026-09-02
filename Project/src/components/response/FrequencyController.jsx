import React, { useCallback } from 'react';
import { Button } from '../ui/Button.jsx';
import { formatNumber, radToDeg } from '../../core/dsp/formatting.js';

export function FrequencyController({ theta, onThetaChange, isPlaying, onTogglePlay, speed, onSpeedChange }) {
  const handleSliderChange = useCallback((e) => {
    let val = parseFloat(e.target.value);
    if (val < 0) val += 2 * Math.PI;
    onThetaChange(val);
  }, [onThetaChange]);

  // Convert theta to slider range (-π to π)
  const sliderValue = theta > Math.PI ? theta - 2 * Math.PI : theta;

  return (
    <div className="space-y-3">
      <label className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wide">
        Test Frequency
      </label>
      
      <div className="flex items-center gap-3">
        <input
          type="range"
          min={-Math.PI}
          max={Math.PI}
          step={0.001}
          value={sliderValue}
          onChange={handleSliderChange}
          className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-violet-500"
        />
        <span className="text-xs font-mono text-slate-600 dark:text-slate-400 min-w-[5rem] text-right">
          {formatNumber(theta, 2)} rad
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="toggle" size="sm" onClick={onTogglePlay}>
          {isPlaying ? (
            <><PauseIcon /> Pause</>
          ) : (
            <><PlayIcon /> Sweep</>
          )}
        </Button>
        <div className="flex items-center gap-1 flex-1">
          <span className="text-xs text-slate-500 dark:text-slate-400">Speed</span>
          <input
            type="range"
            min={0.005}
            max={0.1}
            step={0.005}
            value={speed}
            onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
            className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-violet-500"
          />
        </div>
      </div>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  );
}
