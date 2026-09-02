/**
 * Polynomial operations for digital filter coefficient generation.
 * 
 * For a real root a: contributes (1 - a*z^-1) => [1, -a]
 * For a conjugate pair r*e^(±jφ): contributes [1, -2r*cos(φ), r²]
 */

/**
 * Multiply two polynomials via convolution.
 * @param {number[]} a - First polynomial coefficients
 * @param {number[]} b - Second polynomial coefficients
 * @returns {number[]} Product polynomial coefficients
 */
export function polyMultiply(a, b) {
  const result = new Array(a.length + b.length - 1).fill(0);
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b.length; j++) {
      result[i + j] += a[i] * b[j];
    }
  }
  return result;
}

/**
 * Get polynomial coefficients for a single root.
 * Real root: [1, -value]
 * Complex pair: [1, -2*r*cos(φ), r²]
 * @param {Object} root - Root object
 * @returns {number[]} Polynomial coefficients
 */
export function rootToPolynomial(root) {
  if (root.type === 'real') {
    return [1, -root.value];
  } else {
    const { radius, angle } = root;
    return [1, -2 * radius * Math.cos(angle), radius * radius];
  }
}

/**
 * Compute full polynomial coefficients from an array of roots.
 * @param {Object[]} roots - Array of root objects
 * @returns {number[]} Full polynomial coefficients
 */
export function getPolynomialCoefficients(roots) {
  if (roots.length === 0) return [1];
  
  let coeffs = [1];
  for (const root of roots) {
    const poly = rootToPolynomial(root);
    coeffs = polyMultiply(coeffs, poly);
  }
  return coeffs;
}

/**
 * Compute numerator (B) and denominator (A) coefficients.
 * @param {Object} system - Filter system { gain, poles, zeros }
 * @returns {{ b: number[], a: number[] }} Coefficients
 */
export function getFilterCoefficients(system) {
  const b = getPolynomialCoefficients(system.zeros).map(c => c * system.gain);
  const a = getPolynomialCoefficients(system.poles);
  return { b, a };
}
