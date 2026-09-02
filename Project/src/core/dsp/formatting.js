/**
 * Formatting utilities for DSP output display and export.
 */

/**
 * Format a number to fixed decimal places.
 * @param {number} value
 * @param {number} decimals
 * @returns {string}
 */
export function formatNumber(value, decimals = 4) {
  if (!isFinite(value)) return '---';
  return value.toFixed(decimals);
}

/**
 * Format coefficients for MATLAB output.
 * @param {number[]} b - Numerator coefficients
 * @param {number[]} a - Denominator coefficients
 * @returns {string}
 */
export function formatMATLAB(b, a) {
  const bStr = b.map(c => formatNumber(c, 4)).join(' ');
  const aStr = a.map(c => formatNumber(c, 4)).join(' ');
  return `b = [${bStr}];\na = [${aStr}];`;
}

/**
 * Format coefficients for Python/NumPy output.
 * @param {number[]} b - Numerator coefficients
 * @param {number[]} a - Denominator coefficients
 * @returns {string}
 */
export function formatPython(b, a) {
  const bStr = b.map(c => formatNumber(c, 4)).join(', ');
  const aStr = a.map(c => formatNumber(c, 4)).join(', ');
  return `b = [${bStr}]\na = [${aStr}]`;
}

/**
 * Format a root for display.
 * @param {Object} root
 * @param {number} index
 * @param {string} kind - 'P' for pole, 'Z' for zero
 * @returns {string}
 */
export function formatRootDisplay(root, index, kind) {
  if (root.type === 'real') {
    return `${kind}${index + 1} = ${formatNumber(root.value)}`;
  }
  const x = root.radius * Math.cos(root.angle);
  const y = root.radius * Math.sin(root.angle);
  return `${kind}${index + 1} = ${formatNumber(x)} ± j${formatNumber(y)}`;
}

/**
 * Convert radians to degrees.
 * @param {number} rad
 * @returns {number}
 */
export function radToDeg(rad) {
  return (rad * 180) / Math.PI;
}

/**
 * Format frequency for display.
 * @param {number} theta - Radians
 * @returns {string}
 */
export function formatFrequency(theta) {
  const piMultiple = theta / Math.PI;
  if (Math.abs(piMultiple) < 0.01) return '0';
  if (Math.abs(Math.abs(piMultiple) - 0.5) < 0.01) {
    return piMultiple > 0 ? 'π/2' : '-π/2';
  }
  if (Math.abs(Math.abs(piMultiple) - 1) < 0.01) {
    return piMultiple > 0 ? 'π' : '-π';
  }
  return `${formatNumber(theta, 3)} rad (${formatNumber(radToDeg(theta), 1)}°)`;
}
