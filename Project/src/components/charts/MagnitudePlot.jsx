import React, { useMemo, useState } from 'react';
import { calculateFullResponse } from '../../core/dsp/frequencyResponse.js';
import { magnitudeToDb } from '../../utils/math.js';
import { Card } from '../ui/Card.jsx';
import { ResponsePlot } from './ResponsePlot.jsx';

export function MagnitudePlot({ system, currentTheta, onThetaChange }) {
  const [scaleMode, setScaleMode] = useState('linear');

  const magnitudes = useMemo(() => {
    const { magnitudes } = calculateFullResponse(system, 512);
    return scaleMode === 'db' ? magnitudes.map(m => magnitudeToDb(m)) : magnitudes;
  }, [system, scaleMode]);

  const yLabel = scaleMode === 'db' ? 'Magnitude (dB)' : 'Magnitude';
  const yFormatter = scaleMode === 'db' 
    ? (v) => v.toFixed(0) 
    : (v) => v.toFixed(1);

  return (
    <Card 
      title="Magnitude Response" 
      subtitle={scaleMode === 'db' ? '20·log₁₀|H(e^jθ)|' : '|H(e^jθ)|'}
      controls={
        <div className="flex gap-1">
          <button onClick={() => setScaleMode('linear')}
            className={`px-2 py-0.5 text-xs rounded ${scaleMode === 'linear' ? 'bg-sky-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
            Linear
          </button>
          <button onClick={() => setScaleMode('db')}
            className={`px-2 py-0.5 text-xs rounded ${scaleMode === 'db' ? 'bg-sky-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
            dB
          </button>
        </div>
      }
    >
      <ResponsePlot
        system={system}
        currentTheta={currentTheta}
        onThetaChange={onThetaChange}
        data={magnitudes}
        color="#38bdf8"
        cursorColor="#a78bfa"
        yLabel={yLabel}
        yFormatter={yFormatter}
      />
    </Card>
  );
}
