/**
 * Root manipulation utilities for pole-zero management.
 */

/**
 * Create a real root.
 * @param {number} value - Real value
 * @returns {Object} Real root object
 */
export function createRealRoot(value) {
  return { type: 'real', value };
}

/**
 * Create a complex conjugate pair.
 * @param {number} radius - Magnitude (0 to ~1.5)
 * @param {number} angle - Angle in radians (0 to π)
 * @returns {Object} Complex pair root object
 */
export function createComplexPair(radius, angle) {
  return { type: 'pair', radius, angle };
}

/**
 * Get the x,y coordinates for a root in the complex plane.
 * For real roots, y = 0.
 * For complex pairs, returns the upper half (positive imaginary).
 * @param {Object} root 
 * @returns {{ x: number, y: number }}
 */
export function rootToCartesian(root) {
  if (root.type === 'real') {
    return { x: root.value, y: 0 };
  }
  return {
    x: root.radius * Math.cos(root.angle),
    y: root.radius * Math.sin(root.angle)
  };
}

/**
 * Get both points of a conjugate pair (upper and lower).
 * For real roots, both points are the same.
 * @param {Object} root
 * @returns {{ upper: {x, y}, lower: {x, y} }}
 */
export function rootToCartesianPair(root) {
  if (root.type === 'real') {
    const pt = { x: root.value, y: 0 };
    return { upper: pt, lower: pt };
  }
  return {
    upper: { x: root.radius * Math.cos(root.angle), y: root.radius * Math.sin(root.angle) },
    lower: { x: root.radius * Math.cos(root.angle), y: -root.radius * Math.sin(root.angle) }
  };
}

/**
 * Convert cartesian coordinates back to a root.
 * @param {number} x - Real part
 * @param {number} y - Imaginary part (positive = upper half)
 * @param {string} currentType - Current root type ('real' or 'pair')
 * @returns {Object} Updated root
 */
export function cartesianToRoot(x, y, currentType) {
  if (currentType === 'real') {
    return { type: 'real', value: x };
  }
  const radius = Math.sqrt(x * x + y * y);
  const angle = Math.atan2(Math.abs(y), x);
  return { type: 'pair', radius, angle };
}

/**
 * Calculate the magnitude of a root.
 * @param {Object} root
 * @returns {number}
 */
export function rootMagnitude(root) {
  if (root.type === 'real') {
    return Math.abs(root.value);
  }
  return root.radius;
}
