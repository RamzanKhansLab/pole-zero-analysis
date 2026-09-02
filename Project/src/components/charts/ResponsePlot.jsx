import React, { useRef, useEffect, useCallback, useState } from 'react';
import { Card } from '../ui/Card.jsx';

export function ResponsePlot({ 
  system, currentTheta, onThetaChange, 
  data, color, cursorColor, yLabel, yFormatter 
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [dims, setDims] = useState({ width: 500, height: 200 });

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        const w = containerRef.current.clientWidth;
        setDims({ width: w, height: Math.min(w * 0.4, 220) });
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !data || data.length === 0) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const { width: w, height: h } = dims;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.scale(dpr, dpr);
    const dark = document.documentElement.classList.contains('dark');
    const bgColor = dark ? '#0f172a' : '#f8fafc';
    const gridColor = dark ? '#1e293b' : '#e2e8f0';
    const textColor = dark ? '#64748b' : '#94a3b8';

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, w, h);

    const pad = { top: 20, right: 15, bottom: 30, left: 50 };
    const plotW = w - pad.left - pad.right;
    const plotH = h - pad.top - pad.bottom;

    let maxVal = Math.max(...data, 0.1);
    let minVal = Math.min(...data, 0);
    const margin = (maxVal - minVal) * 0.1 || 0.5;
    maxVal += margin;
    minVal -= margin;
    const range = maxVal - minVal || 1;

    // Grid
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 4; i++) {
      const y = pad.top + (plotH * i) / 4;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(pad.left + plotW, y);
      ctx.stroke();
    }

    // Zero line
    const zeroY = pad.top + ((maxVal - 0) / range) * plotH;
    if (zeroY >= pad.top && zeroY <= pad.top + plotH) {
      ctx.strokeStyle = dark ? '#475569' : '#94a3b8';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(pad.left, zeroY);
      ctx.lineTo(pad.left + plotW, zeroY);
      ctx.stroke();
    }

    // Frequency labels
    const freqLabels = ['0', 'π/2', 'π', '3π/2', '2π'];
    ctx.textAlign = 'center';
    ctx.fillStyle = textColor;
    ctx.font = '10px Inter, sans-serif';
    for (let i = 0; i <= 4; i++) {
      const x = pad.left + (plotW * i) / 4;
      ctx.beginPath();
      ctx.strokeStyle = gridColor;
      ctx.moveTo(x, pad.top);
      ctx.lineTo(x, pad.top + plotH);
      ctx.stroke();
      ctx.fillText(freqLabels[i], x, h - 8);
    }

    // Y labels
    ctx.textAlign = 'right';
    for (let i = 0; i <= 4; i++) {
      const val = maxVal - (range * i) / 4;
      const y = pad.top + (plotH * i) / 4;
      ctx.fillText(yFormatter(val), pad.left - 5, y + 3);
    }

    // Y axis label
    ctx.save();
    ctx.translate(14, pad.top + plotH / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    ctx.fillText(yLabel, 0, 0);
    ctx.restore();

    // Plot curve
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i < data.length; i++) {
      const x = pad.left + (i / (data.length - 1)) * plotW;
      const normY = (maxVal - data[i]) / range;
      const y = pad.top + normY * plotH;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Fill under curve
    ctx.lineTo(pad.left + plotW, pad.top + plotH);
    ctx.lineTo(pad.left, pad.top + plotH);
    ctx.closePath();
    ctx.fillStyle = color + '15';
    ctx.fill();

    // Cursor
    const cursorX = pad.left + (currentTheta / (2 * Math.PI)) * plotW;
    const currentVal = data[Math.floor((currentTheta / (2 * Math.PI)) * data.length)];
    const cursorY = pad.top + ((maxVal - currentVal) / range) * plotH;
    ctx.strokeStyle = cursorColor;
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(cursorX, pad.top);
    ctx.lineTo(cursorX, pad.top + plotH);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = cursorColor;
    ctx.beginPath();
    ctx.arc(cursorX, cursorY, 4, 0, 2 * Math.PI);
    ctx.fill();
  }, [data, currentTheta, dims, color, cursorColor, yLabel, yFormatter]);

  useEffect(() => { draw(); }, [draw]);

  const handleClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const plotW = dims.width - 50 - 15;
    const theta = ((x - 50) / plotW) * 2 * Math.PI;
    if (theta >= 0 && theta <= 2 * Math.PI) onThetaChange?.(theta);
  };

  return (
    <div ref={containerRef} className="w-full">
      <canvas ref={canvasRef} className="w-full rounded-lg cursor-crosshair" onClick={handleClick} />
    </div>
  );
}
