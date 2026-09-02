/**
 * Filter stability analysis.
 * A discrete-time filter is BIBO stable if all poles satisfy |p| < 1.
 */

import { rootMagnitude } from './roots.js';

/**
 * Determine filter stability status.
 * @param {Object[]} poles - Array of pole root objects
 * @returns {'stable' | 'marginal' | 'unstable'}
 */
export function getStabilityStatus(poles) {
  if (poles.length === 0) return 'stable';
  
  let hasMarginal = false;
  
  for (const pole of poles) {
    const mag = rootMagnitude(pole);
    if (mag >= 1.0) return 'unstable';
    if (mag >= 0.95) hasMarginal = true;
  }
  
  return hasMarginal ? 'marginal' : 'stable';
}

/**
 * Check if filter is strictly stable.
 * @param {Object[]} poles
 * @returns {boolean}
 */
export function isStable(poles) {
  return getStabilityStatus(poles) === 'stable';
}

/**
 * Get the maximum pole magnitude.
 * @param {Object[]} poles
 * @returns {number}
 */
export function getMaxPoleMagnitude(poles) {
  if (poles.length === 0) return 0;
  return Math.max(...poles.map(rootMagnitude));
}
