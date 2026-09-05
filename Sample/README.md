# Universal Conjugate-Aware Digital Filter Designer — Original HTML Version

This folder contains the original single-file HTML/CSS/JavaScript implementation of the filter designer. It serves as the reference implementation for the React version in the `../Project/` folder.

## Live Links

| Description | Link |
|-------------|------|
| **Live Demo** | [https://ramzankhanslab.github.io/pole-zero-analysis/](https://ramzankhanslab.github.io/pole-zero-analysis/) |
| **GitHub Folder** | [https://github.com/RamzanKhansLab/pole-zero-analysis/tree/main/Sample](https://github.com/RamzanKhansLab/pole-zero-analysis/tree/main/Sample) |

Simply open `index.html` in a web browser. No build step or dependencies required.

## Features

- **Interactive Pole-Zero Map**: Drag and drop poles and zeros on the complex plane
- **Magnitude Response**: Real-time visualization of |H(e^jθ)|
- **Filter Presets**: LPF (3P, 2Z), BPF (2P, 3Z), HPF (3P, 3Z)
- **Frequency Sweep**: Animated sweep with play/pause control
- **Coefficient Display**: Shows numerator and denominator polynomial coefficients
- **Stability Indicator**: Displays filter stability status

## Filter Presets

| Preset | Label | Poles | Zeros |
|--------|-------|-------|-------|
| Low-Pass Filter | LPF (3P, 2Z) | Real: 0.6, Pair: r=0.8 φ=0.3 | Pair: r=1 φ=π |
| Band-Pass Filter | BPF (2P, 3Z) | Pair: r=0.8 φ=π/2 | Real: -1, Pair: r=1 φ=π/3 |
| High-Pass Filter | HPF (3P, 3Z) | Real: -0.6, Pair: r=0.8 φ=π-0.4 | Real: 1, Pair: r=1 φ=0.2 |

## DSP Mathematics

### Transfer Function

```
H(z) = K × Π(z - z_i) / Π(z - p_i)
```

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

### Stability

A discrete-time filter is BIBO stable if all poles satisfy |p_i| < 1.

## Related

- [Project/](../Project/) — React + Vite + Tailwind CSS version (production-ready)
- [Main README](../README.md) — Overview of both versions

## Credits

This application was designed and created by **Chaitanya Shelar**.

- **Concept & Design**: Chaitanya Shelar
- **Development & Deployment**: Ramzan Khan

## License

This project is open source and available for educational and research purposes.

