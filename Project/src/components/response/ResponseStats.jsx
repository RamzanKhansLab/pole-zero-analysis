import React, { useMemo } from 'react';
import { calculateMagnitude, calculatePhase } from '../../core/dsp/frequencyResponse.js';
import { getStabilityStatus } from '../../core/dsp/stability.js';
import { formatNumber, radToDeg, formatRootDisplay } from '../../core/dsp/formatting.js';
import { Badge } from '../ui/Badge.jsx';
import { Card } from '../ui/Card.jsx';

export function ResponseStats({ system, theta }) {
  const magnitude = useMemo(() => calculateMagnitude(theta, system), [theta, system]);
  const phase = useMemo(() => calculatePhase(theta, system), [theta, system]);
  const stability = useMemo(() => getStabilityStatus(system.poles), [system.poles]);

  return (
    <Card title="Response Statistics">
      <div className="grid grid-cols-2 gap-3">
        <StatItem label="Frequency θ" value={`${formatNumber(theta, 3)} rad`} sub={`${formatNumber(radToDeg(theta), 1)}°`} />
        <StatItem label="|H(e^jθ)|" value={formatNumber(magnitude, 4)} />
        <StatItem label="∠H(e^jθ)" value={`${formatNumber(radToDeg(phase), 2)}°`} sub={`${formatNumber(phase, 3)} rad`} />
        <StatItem label="Gain K" value={formatNumber(system.gain, 4)} />
      </div>
      
      <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-slate-400">Stability</span>
          <Badge status={stability}>{stability.toUpperCase()}</Badge>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 space-y-1">
        <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">System Summary</div>
        {system.poles.map((p, i) => (
          <div key={`p${i}`} className="text-xs font-mono text-rose-500">
            {formatRootDisplay(p, i, 'P')}
          </div>
        ))}
        {system.zeros.map((z, i) => (
          <div key={`z${i}`} className="text-xs font-mono text-sky-500">
            {formatRootDisplay(z, i, 'Z')}
          </div>
        ))}
      </div>
    </Card>
  );
}

function StatItem({ label, value, sub }) {
  return (
    <div className="space-y-0.5">
      <div className="text-xs text-slate-500 dark:text-slate-400">{label}</div>
      <div className="text-sm font-mono font-semibold text-slate-800 dark:text-slate-100">{value}</div>
      {sub && <div className="text-xs font-mono text-slate-400 dark:text-slate-500">{sub}</div>}
    </div>
  );
}
