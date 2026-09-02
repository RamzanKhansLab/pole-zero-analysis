/**
 * Complex frequency response calculation.
 * H(e^jθ) = K * Π(e^jθ - z_i) / Π(e^jθ - p_i)
 */

/**
 * Calculate the complex frequency response at a given frequency.
 * @param {number} theta - Frequency in radians (0 to 2π)
 * @param {Object} system - Filter system { gain, poles, zeros }
 * @returns {{ re: number, im: number }} Complex result
 */
export function calculateComplexResponse(theta, system) {
  const cosTheta = Math.cos(theta);
  const sinTheta = Math.sin(theta);
  
  // e^jθ = cos(θ) + j*sin(θ)
  let numRe = system.gain;
  let numIm = 0;
  let denRe = 1;
  let denIm = 0;
  
  // Multiply numerator by (e^jθ - z_i) for each zero
  for (const zero of system.zeros) {
    const points = zero.type === 'real' 
      ? [{ x: zero.value, y: 0 }]
      : [
          { x: zero.radius * Math.cos(zero.angle), y: zero.radius * Math.sin(zero.angle) },
          { x: zero.radius * Math.cos(zero.angle), y: -zero.radius * Math.sin(zero.angle) }
        ];
    
    for (const pt of points) {
      // (e^jθ - z) = (cosθ - zx) + j(sinθ - zy)
      const diffRe = cosTheta - pt.x;
      const diffIm = sinTheta - pt.y;
      
      // Complex multiply: num * diff
      const newRe = numRe * diffRe - numIm * diffIm;
      const newIm = numRe * diffIm + numIm * diffRe;
      numRe = newRe;
      numIm = newIm;
    }
  }
  
  // Multiply denominator by (e^jθ - p_i) for each pole
  for (const pole of system.poles) {
    const points = pole.type === 'real'
      ? [{ x: pole.value, y: 0 }]
      : [
          { x: pole.radius * Math.cos(pole.angle), y: pole.radius * Math.sin(pole.angle) },
          { x: pole.radius * Math.cos(pole.angle), y: -pole.radius * Math.sin(pole.angle) }
        ];
    
    for (const pt of points) {
      const diffRe = cosTheta - pt.x;
      const diffIm = sinTheta - pt.y;
      
      const newRe = denRe * diffRe - denIm * diffIm;
      const newIm = denRe * diffIm + denIm * diffRe;
      denRe = newRe;
      denIm = newIm;
    }
  }
  
  // Complex division: num / den
  const denMagSq = denRe * denRe + denIm * denIm;
  if (denMagSq < 1e-30) {
    return { re: 1e10, im: 0 }; // Near singularity
  }
  
  return {
    re: (numRe * denRe + numIm * denIm) / denMagSq,
    im: (numIm * denRe - numRe * denIm) / denMagSq
  };
}

/**
 * Calculate magnitude response at a frequency.
 * @param {number} theta - Frequency in radians
 * @param {Object} system - Filter system
 * @returns {number} Magnitude
 */
export function calculateMagnitude(theta, system) {
  const complex = calculateComplexResponse(theta, system);
  return Math.sqrt(complex.re * complex.re + complex.im * complex.im);
}

/**
 * Calculate phase response at a frequency.
 * @param {number} theta - Frequency in radians
 * @param {Object} system - Filter system
 * @returns {number} Phase in radians (-π to π)
 */
export function calculatePhase(theta, system) {
  const complex = calculateComplexResponse(theta, system);
  return Math.atan2(complex.im, complex.re);
}

/**
 * Calculate full frequency response over a range.
 * @param {Object} system - Filter system
 * @param {number} numPoints - Number of frequency points
 * @returns {{ frequencies: number[], magnitudes: number[], phases: number[] }}
 */
export function calculateFullResponse(system, numPoints = 512) {
  const frequencies = [];
  const magnitudes = [];
  const phases = [];
  
  for (let i = 0; i < numPoints; i++) {
    const theta = (i / numPoints) * 2 * Math.PI;
    frequencies.push(theta);
    magnitudes.push(calculateMagnitude(theta, system));
    phases.push(calculatePhase(theta, system));
  }
  
  return { frequencies, magnitudes, phases };
}

/**
 * Unwrap phase to remove 2π discontinuities.
 * @param {number[]} phases - Array of wrapped phase values
 * @returns {number[]} Unwrapped phase values
 */
export function unwrapPhase(phases) {
  const unwrapped = [phases[0]];
  let cumShift = 0;
  
  for (let i = 1; i < phases.length; i++) {
    let diff = phases[i] - phases[i - 1];
    if (diff > Math.PI) cumShift -= 2 * Math.PI;
    else if (diff < -Math.PI) cumShift += 2 * Math.PI;
    unwrapped.push(phases[i] + cumShift);
  }
  
  return unwrapped;
}
