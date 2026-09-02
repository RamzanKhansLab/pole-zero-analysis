/**
 * Filter presets - LPF, BPF, HPF configurations.
 */

export const PRESETS = {
  lpf_3p2z: {
    label: 'LPF (3P, 2Z)',
    description: 'Low-Pass Filter',
    details: '3 Poles · 2 Zeros',
    gain: 1,
    poles: [
      { type: 'real', value: 0.6 },
      { type: 'pair', radius: 0.8, angle: 0.3 }
    ],
    zeros: [
      { type: 'pair', radius: 1, angle: Math.PI }
    ]
  },
  bpf_2p3z: {
    label: 'BPF (2P, 3Z)',
    description: 'Band-Pass Filter',
    details: '2 Poles · 3 Zeros',
    gain: 1,
    poles: [
      { type: 'pair', radius: 0.8, angle: Math.PI / 2 }
    ],
    zeros: [
      { type: 'real', value: -1 },
      { type: 'pair', radius: 1, angle: Math.PI / 3 }
    ]
  },
  hpf_3p3z: {
    label: 'HPF (3P, 3Z)',
    description: 'High-Pass Filter',
    details: '3 Poles · 3 Zeros',
    gain: 1,
    poles: [
      { type: 'real', value: -0.6 },
      { type: 'pair', radius: 0.8, angle: Math.PI - 0.4 }
    ],
    zeros: [
      { type: 'real', value: 1 },
      { type: 'pair', radius: 1, angle: 0.2 }
    ]
  }
};

export const PRESET_LIST = [
  { key: 'lpf_3p2z', ...PRESETS.lpf_3p2z },
  { key: 'bpf_2p3z', ...PRESETS.bpf_2p3z },
  { key: 'hpf_3p3z', ...PRESETS.hpf_3p3z }
];

/**
 * Deep clone a preset to avoid mutation.
 * @param {string} key - Preset key
 * @returns {Object} Cloned preset system
 */
export function getPreset(key) {
  const preset = PRESETS[key];
  if (!preset) return null;
  return {
    gain: preset.gain,
    poles: JSON.parse(JSON.stringify(preset.poles)),
    zeros: JSON.parse(JSON.stringify(preset.zeros))
  };
}
