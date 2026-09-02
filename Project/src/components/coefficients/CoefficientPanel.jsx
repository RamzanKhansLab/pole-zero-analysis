import React, { useMemo, useState } from 'react';
import { getFilterCoefficients } from '../../core/dsp/polynomial.js';
import { formatMATLAB, formatPython, formatNumber } from '../../core/dsp/formatting.js';
import { copyToClipboard } from '../../utils/clipboard.js';
import { Card } from '../ui/Card.jsx';
import { Button } from '../ui/Button.jsx';

export function CoefficientPanel({ system }) {
  const [copied, setCopied] = useState(null);
  const [format, setFormat] = useState('raw');

  const { b, a } = useMemo(() => getFilterCoefficients(system), [system]);

  const handleCopy = async (text, label) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    }
  };

  const getDisplayText = () => {
    switch (format) {
      case 'matlab': return formatMATLAB(b, a);
      case 'python': return formatPython(b, a);
      default: return `b = [${b.map(c => formatNumber(c, 4)).join(', ')}]\na = [${a.map(c => formatNumber(c, 4)).join(', ')}]`;
    }
  };

  return (
    <Card 
      title="Filter Coefficients" 
      subtitle="Transfer Function H(z)"
      controls={
        <div className="flex gap-1">
          {['raw', 'matlab', 'python'].map(f => (
            <button key={f} onClick={() => setFormat(f)}
              className={`px-2 py-0.5 text-xs rounded capitalize ${format === f ? 'bg-emerald-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
              {f}
            </button>
          ))}
        </div>
      }
    >
      <div className="space-y-3">
        <div className="bg-slate-100 dark:bg-slate-900 rounded-lg p-3 font-mono text-xs text-slate-700 dark:text-slate-300 whitespace-pre-wrap overflow-x-auto">
          {getDisplayText()}
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleCopy(getDisplayText(), 'all')}
            className="flex-1"
          >
            {copied === 'all' ? '✓ Copied!' : 'Copy'}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleCopy(`[${b.map(c => formatNumber(c, 6)).join(', ')}]`, 'b')}
          >
            {copied === 'b' ? '✓' : 'Copy b'}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleCopy(`[${a.map(c => formatNumber(c, 6)).join(', ')}]`, 'a')}
          >
            {copied === 'a' ? '✓' : 'Copy a'}
          </Button>
        </div>
      </div>
    </Card>
  );
}
