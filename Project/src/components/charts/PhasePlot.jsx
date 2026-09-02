import React, { useMemo, useState } from 'react';
import { calculateFullResponse, unwrapPhase } from '../../core/dsp/frequencyResponse.js';
import { radToDeg } from '../../core/dsp/formatting.js';
import { Card } from '../ui/Card.jsx';
import { ResponsePlot } from './ResponsePlot.jsx';

export function PhasePlot({ system, currentTheta, onThetaChange }) {
  const [unit, setUnit] = useState('degrees');
  const [unwrap, setUnwrap] = useState(false);

  const phases = useMemo(() => {
    const { phases } = calculateFullResponse(system, 512);
    let processed = unwrap ? unwrapPhase(phases) : phases;
    if (unit === 'degrees') processed = processed.map(p => radToDeg(p));
    return processed;
  }, [system, unit, unwrap]);

  const yLabel = `Phase (${unit === 'degrees' ? '°' : 'rad'})`;
  const yFormatter = unit === 'degrees' 
    ? (v) => v.toFixed(0) + '°'
    : (v) => v.toFixed(1);

  return (
    <Card 
      title="Phase Response" 
      subtitle={unwrap ? 'Unwrapped ∠H(e^jθ)' : '∠H(e^jθ)'}
      controls={
        <div className="flex gap-1">
          <button onClick={() => setUnit('degrees')}
            className={`px-2 py-0.5 text-xs rounded ${unit === 'degrees' ? 'bg-violet-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
            °
          </button>
          <button onClick={() => setUnit('radians')}
            className={`px-2 py-0.5 text-xs rounded ${unit === 'radians' ? 'bg-violet-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
            rad
          </button>
          <button onClick={() => setUnwrap(!unwrap)}
            className={`px-2 py-0.5 text-xs rounded ${unwrap ? 'bg-violet-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
            Unwrap
          </button>
        </div>
      }
    >
      <ResponsePlot
        system={system}
        currentTheta={currentTheta}
        onThetaChange={onThetaChange}
        data={phases}
        color="#a78bfa"
        cursorColor="#f472b6"
        yLabel={yLabel}
        yFormatter={yFormatter}
      />
    </Card>
  );
}
