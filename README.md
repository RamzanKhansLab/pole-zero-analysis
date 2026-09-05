# Universal Conjugate-Aware Digital Filter Designer

A modern, interactive web application for designing and analyzing digital filters through pole-zero placement on the complex plane.

## Live Links

| Version | Link |
|---------|------|
| **React App (Live)** | [https://pole-zero-analysis.vercel.app/](https://pole-zero-analysis.vercel.app/) |
| **Sample HTML (Live)** | [https://ramzankhanslab.github.io/pole-zero-analysis/](https://ramzankhanslab.github.io/pole-zero-analysis/) |
| **GitHub Repository** | [https://github.com/RamzanKhansLab/pole-zero-analysis](https://github.com/RamzanKhansLab/pole-zero-analysis) |

## Repository Structure

This repository contains two versions of the application:

| Folder | Description |
|--------|-------------|
| [`Project/`](Project/) | **React + Vite + Tailwind CSS** version (production-ready) |
| [`Sample/`](Sample/) | **Original single-file HTML** version (reference implementation) |

---

## Project/ (React Version)

A complete rebuild of the original HTML application as a production-quality ReactJS application with component-based architecture, reusable DSP modules, and modern UI/UX.

### Features

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

### Quick Start

```bash
cd Project
npm install
npm run dev
```

Then open `http://localhost:5173` in your browser.

### Production Build

```bash
cd Project
npm run build
npm run preview
```

---

## Sample/ (Original HTML Version)

The original single-file HTML/CSS/JavaScript implementation of the filter designer. This serves as the reference implementation and starting point for the React rebuild.

### Features

- Pole-zero map with drag-and-drop interaction
- Magnitude response visualization
- Filter presets (LPF, BPF, HPF)
- Frequency sweep animation
- Coefficient display

### Quick Start

Simply open `Sample/index.html` in a web browser. No build step required.

---

## DSP Mathematics

### Transfer Function

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

---

## Filter Presets

| Preset | Label | Poles | Zeros |
|--------|-------|-------|-------|
| Low-Pass Filter | LPF (3P, 2Z) | Real: 0.6, Pair: r=0.8 φ=0.3 | Pair: r=1 φ=π |
| Band-Pass Filter | BPF (2P, 3Z) | Pair: r=0.8 φ=π/2 | Real: -1, Pair: r=1 φ=π/3 |
| High-Pass Filter | HPF (3P, 3Z) | Real: -0.6, Pair: r=0.8 φ=π-0.4 | Real: 1, Pair: r=1 φ=0.2 |

---

## Technology Stack (Project/)

- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Canvas API** - Chart rendering
- **JavaScript (ES2022)** - Language

---

## Credits

This application was designed and created by **Chaitanya Shelar**.

- **Concept & Design**: Chaitanya Shelar
- **Development & Deployment**: Ramzan Khan

---

## License

This project is open source and available for educational and research purposes.

