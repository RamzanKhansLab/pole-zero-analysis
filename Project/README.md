# Universal Conjugate-Aware Digital Filter Designer

A modern, interactive web application for designing and analyzing digital filters through pole-zero placement on the complex plane.

This is the **React + Vite + Tailwind CSS** version. See the [main README](../README.md) for an overview of both versions, or the [Sample/](../Sample/) folder for the original HTML implementation.

## Live Links

| Description | Link |
|-------------|------|
| **Live Demo** | [https://pole-zero-analysis.vercel.app/](https://pole-zero-analysis.vercel.app/) |
| **GitHub Folder** | [https://github.com/RamzanKhansLab/pole-zero-analysis/tree/main/Project](https://github.com/RamzanKhansLab/pole-zero-analysis/tree/main/Project) |

This application provides a comprehensive environment for digital signal processing education and filter design. Users can interactively place poles and zeros on the complex plane, visualize the resulting frequency response, and export filter coefficients in multiple formats.

## Features

- **Interactive Pole-Zero Map**: Drag-and-drop poles and zeros on the complex plane with conjugate symmetry preservation
- **Magnitude Response**: Real-time visualization with linear and dB scale options
- **Phase Response**: Complete phase analysis with wrapped/unwrapped display in degrees or radians
- **Frequency Sweep**: Animated frequency sweep with adjustable speed
- **Filter Presets**: LPF, BPF, and HPF configurations
- **Root Management**: Add, edit, and delete real poles/zeros and complex conjugate pairs
- **Coefficient Export**: MATLAB, Python/NumPy, and raw coefficient output
- **Stability Analysis**: Real-time BIBO stability indication
- **Dark/Light Theme**: Complete theme support with persistence
- **Responsive Design**: Works on desktop, tablet, and mobile

## DSP Mathematics

### Transfer Function

The filter transfer function is defined as:

```
H(z) = K × Π(z - z_i) / Π(z - p_i)
```

Where K is the gain, z_i are zeros, and p_i are poles.

### Polynomial Generation

**Real root** at position a:
```
(1 - a·z⁻¹) → coefficients [1, -a]
```

**Complex conjugate pair** r·e^(±jφ):
```
(1 - 2r·cos(φ)·z⁻¹ + r²·z⁻²) → coefficients [1, -2r·cos(φ), r²]
```

### Frequency Response

```
H(e^jθ) = K × Π(e^jθ - z_i) / Π(e^jθ - p_i)
```

- **Magnitude**: |H(e^jθ)|
- **Phase**: ∠H(e^jθ) = atan2(Im(H), Re(H))

### Stability

A discrete-time filter is BIBO stable if all poles satisfy |p_i| < 1.

## Architecture

```
src/
├── app/
│   └── App.jsx              # Main application shell
├── components/
│   ├── layout/              # Application layout components
│   ├── filter/              # Filter control components
│   ├── charts/              # Visualization components
│   ├── response/            # Response statistics and frequency control
│   ├── coefficients/        # Coefficient display and export
│   └── ui/                  # Reusable UI primitives
├── hooks/
│   ├── useFilterSystem.js   # Filter state management
│   ├── useTheme.js          # Theme management
│   └── useAnimation.js      # Animation/sweep control
├── core/
│   └── dsp/                 # DSP calculation modules
│       ├── polynomial.js    # Polynomial multiplication
│       ├── roots.js         # Root manipulation
│       ├── frequencyResponse.js  # H(e^jθ) calculation
│       ├── stability.js     # Stability analysis
│       ├── presets.js       # Filter presets
│       └── formatting.js    # Output formatting
├── utils/
│   ├── math.js              # Math utilities
│   └── clipboard.js         # Clipboard operations
├── main.jsx                 # Entry point
└── index.css                # Global styles
```

## Installation

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

## Technology Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Canvas API** - Chart rendering
- **JavaScript (ES2022)** - Language

## Development

- UI components live in `src/components/`
- DSP logic lives in `src/core/dsp/`
- Styles use Tailwind CSS with CSS variables for theming
- State management uses React hooks (useReducer)

## Mathematical Precision

- All calculations use IEEE 754 double-precision floating point
- Coefficients displayed to 4 decimal places by default
- Phase unwrapping uses standard 2π threshold detection
- dB magnitude clamped to prevent -Infinity display

## Future Improvements

- Group delay visualization
- Impulse response display
- Step response analysis
- Frequency response data export
- Filter design from specifications
- Direct coefficient editing
- Second-order sections (SOS) representation
- Z-plane region of convergence visualization

## Design & Development

This application was designed and created by **Chaitanya Shelar**.

- **Concept & Design**: Chaitanya Shelar
- **Development & Deployment**: Ramzan Khan

We would like to thank everyone who contributed to making this project possible.
