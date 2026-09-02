import { rootToCartesianPair } from '../../core/dsp/roots.js';

export function drawGrid(ctx, center, scale, size, dark) {
  ctx.strokeStyle = dark ? '#1e293b' : '#e2e8f0';
  ctx.lineWidth = 0.5;
  for (let i = 1; i < 4; i++) {
    const r = (scale * i) / 4;
    ctx.beginPath();
    ctx.arc(center, center, r, 0, 2 * Math.PI);
    ctx.stroke();
  }
}

export function drawAxes(ctx, center, scale, size, dark) {
  ctx.strokeStyle = dark ? '#334155' : '#cbd5e1';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, center);
  ctx.lineTo(size, center);
  ctx.moveTo(center, 0);
  ctx.lineTo(center, size);
  ctx.stroke();
  ctx.fillStyle = dark ? '#64748b' : '#94a3b8';
  ctx.font = '10px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Re', size - 12, center - 4);
  ctx.fillText('1', center + scale + 8, center + 4);
  ctx.fillText('-1', center - scale - 8, center + 4);
  ctx.textAlign = 'left';
  ctx.fillText('j', center + 4, scale + 16);
  ctx.fillText('-j', center + 4, size - scale - 8);
}

export function drawUnitCircle(ctx, center, scale, dark) {
  ctx.strokeStyle = dark ? '#475569' : '#94a3b8';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.arc(center, center, scale, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.setLineDash([]);
}

export function drawTestPoint(ctx, center, scale, theta, dark) {
  const tx = center + scale * Math.cos(theta);
  const ty = center - scale * Math.sin(theta);
  ctx.strokeStyle = dark ? '#a78bfa' : '#7c3aed';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(center, center);
  ctx.lineTo(tx, ty);
  ctx.stroke();
  ctx.fillStyle = dark ? '#a78bfa' : '#7c3aed';
  ctx.beginPath();
  ctx.arc(tx, ty, 4, 0, 2 * Math.PI);
  ctx.fill();
}

export function drawXMark(ctx, x, y, s) {
  ctx.beginPath();
  ctx.moveTo(x - s, y - s);
  ctx.lineTo(x + s, y + s);
  ctx.moveTo(x + s, y - s);
  ctx.lineTo(x - s, y + s);
  ctx.stroke();
}

export function drawPoleZeroRoots(ctx, center, scale, zeros, poles) {
  for (let i = 0; i < zeros.length; i++) {
    const { upper, lower } = rootToCartesianPair(zeros[i]);
    const x = center + scale * upper.x;
    const y = center - scale * upper.y;
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, 8, 0, 2 * Math.PI);
    ctx.stroke();
    if (upper.y !== lower.y) {
      const y2 = center - scale * lower.y;
      ctx.beginPath();
      ctx.arc(x, y2, 8, 0, 2 * Math.PI);
      ctx.stroke();
    }
  }
  for (let i = 0; i < poles.length; i++) {
    const { upper, lower } = rootToCartesianPair(poles[i]);
    const x = center + scale * upper.x;
    const y = center - scale * upper.y;
    ctx.strokeStyle = '#f43f5e';
    ctx.lineWidth = 2;
    drawXMark(ctx, x, y, 7);
    if (upper.y !== lower.y) {
      const y2 = center - scale * lower.y;
      drawXMark(ctx, x, y2, 7);
    }
  }
}

export function hitTestRoots(mx, my, size, zeros, poles) {
  const center = size / 2;
  const sc = (size / 2) * 0.85;
  for (let i = 0; i < zeros.length; i++) {
    const { upper, lower } = rootToCartesianPair(zeros[i]);
    const x = center + sc * upper.x;
    const y = center - sc * upper.y;
    if (Math.hypot(mx - x, my - y) < 14) return { type: 'zero', index: i };
    if (upper.y !== lower.y) {
      const y2 = center - sc * lower.y;
      if (Math.hypot(mx - x, my - y2) < 14) return { type: 'zero', index: i };
    }
  }
  for (let i = 0; i < poles.length; i++) {
    const { upper, lower } = rootToCartesianPair(poles[i]);
    const x = center + sc * upper.x;
    const y = center - sc * upper.y;
    if (Math.hypot(mx - x, my - y) < 14) return { type: 'pole', index: i };
    if (upper.y !== lower.y) {
      const y2 = center - sc * lower.y;
      if (Math.hypot(mx - x, my - y2) < 14) return { type: 'pole', index: i };
    }
  }
  return null;
}
