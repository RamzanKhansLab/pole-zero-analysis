import React, { useRef, useEffect, useCallback, useState } from 'react';
import { Card } from '../ui/Card.jsx';
import { drawGrid, drawAxes, drawUnitCircle, drawTestPoint, drawPoleZeroRoots, hitTestRoots } from './chartUtils.js';

export function PoleZeroPlot({ poles, zeros, currentTheta, onRootDrag, onThetaChange }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [size, setSize] = useState(350);
  const [dragged, setDragged] = useState(null);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setSize(Math.min(containerRef.current.clientWidth, 400));
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const isDark = () => document.documentElement.classList.contains('dark');

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';
    ctx.scale(dpr, dpr);
    const center = size / 2;
    const scale = (size / 2) * 0.85;
    const dark = isDark();
    ctx.fillStyle = dark ? '#0f172a' : '#f8fafc';
    ctx.fillRect(0, 0, size, size);
    drawGrid(ctx, center, scale, size, dark);
    drawAxes(ctx, center, scale, size, dark);
    drawUnitCircle(ctx, center, scale, dark);
    drawTestPoint(ctx, center, scale, currentTheta, dark);
    drawPoleZeroRoots(ctx, center, scale, zeros, poles);
  }, [poles, zeros, currentTheta, size]);

  useEffect(() => { draw(); }, [draw]);

  const getCoords = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    const cy = e.touches ? e.touches[0].clientY : e.clientY;
    return { mx: cx - rect.left, my: cy - rect.top };
  };

  const handlePointerDown = (e) => {
    canvasRef.current.setPointerCapture(e.pointerId);
    const { mx, my } = getCoords(e);
    const hit = hitTestRoots(mx, my, size, zeros, poles);
    if (hit) {
      setDragged(hit);
      onRootDrag?.(true);
    } else {
      const center = size / 2;
      const sc = (size / 2) * 0.85;
      const x = (mx - center) / sc;
      const y = (center - my) / sc;
      let theta = Math.atan2(y, x);
      if (theta < 0) theta += 2 * Math.PI;
      onThetaChange?.(theta);
    }
  };

  const handlePointerMove = (e) => {
    if (!dragged) return;
    const { mx, my } = getCoords(e);
    const center = size / 2;
    const sc = (size / 2) * 0.85;
    const x = (mx - center) / sc;
    const y = (center - my) / sc;
    onRootDrag?.(false, dragged, x, y);
  };

  const handlePointerUp = (e) => {
    if (dragged) {
      canvasRef.current?.releasePointerCapture(e.pointerId);
      setDragged(null);
      onRootDrag?.(false);
    }
  };

  return (
    <Card title="Pole-Zero Map" subtitle="Complex Plane" className="flex flex-col items-center">
      <div ref={containerRef} className="w-full flex justify-center">
        <canvas ref={canvasRef} className="rounded-lg cursor-grab active:cursor-grabbing"
          style={{ touchAction: 'none' }}
          onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} />
      </div>
      <div className="flex items-center gap-4 mt-3 text-xs text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full border-2 border-sky-400 inline-block" /> Zero
        </span>
        <span className="flex items-center gap-1">
          <span className="text-rose-500 font-bold">×</span> Pole
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-violet-400 inline-block" /> Test Freq
        </span>
      </div>
    </Card>
  );
}

