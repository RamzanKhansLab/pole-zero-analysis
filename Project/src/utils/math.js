/**
 * General math utilities.
 */

/**
 * Clamp a value between min and max.
 */
export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

/**
 * Linear interpolation.
 */
export function lerp(a, b, t) {
  return a + (b - a) * t;
}

/**
 * Map a value from one range to another.
 */
export function mapRange(value, inMin, inMax, outMin, outMax) {
  return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin);
}

/**
 * Safely compute log10, clamping to avoid -Infinity.
 */
export function safeLog10(value, epsilon = 1e-12) {
  return Math.log10(Math.max(value, epsilon));
}

/**
 * Convert magnitude to dB.
 */
export function magnitudeToDb(magnitude) {
  return 20 * safeLog10(magnitude);
}
