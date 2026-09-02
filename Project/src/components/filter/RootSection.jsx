import React from 'react';
import { RootRow } from './RootRow.jsx';
import { Button } from '../ui/Button.jsx';
import { createRealRoot, createComplexPair } from '../../core/dsp/roots.js';

export function RootSection({ 
  roots, 
  kind, 
  onUpdate, 
  onDelete, 
  onAdd 
}) {
  const label = kind === 'pole' ? 'Poles' : 'Zeros';
  const colorClass = kind === 'pole' ? 'text-rose-500' : 'text-sky-500';

  const handleAddReal = () => {
    const defaultVal = kind === 'pole' ? 0.5 : 0.5;
    onAdd(createRealRoot(defaultVal));
  };

  const handleAddPair = () => {
    const defaults = kind === 'pole' 
      ? { radius: 0.7, angle: Math.PI / 4 }
      : { radius: 0.8, angle: Math.PI / 3 };
    onAdd(createComplexPair(defaults.radius, defaults.angle));
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className={`text-xs font-semibold uppercase tracking-wide ${colorClass}`}>
          {label} ({roots.length})
        </label>
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" onClick={handleAddReal} className="!px-2 !py-0.5">
            + Real
          </Button>
          <Button variant="ghost" size="sm" onClick={handleAddPair} className="!px-2 !py-0.5">
            + Pair
          </Button>
        </div>
      </div>

      {roots.length === 0 ? (
        <div className="text-xs text-slate-400 dark:text-slate-500 italic py-2 text-center">
          No {label.toLowerCase()} defined
        </div>
      ) : (
        <div className="space-y-1.5">
          {roots.map((root, index) => (
            <RootRow
              key={index}
              root={root}
              index={index}
              kind={kind}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
