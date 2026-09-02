import React, { useState, useCallback } from 'react';
import { useFilterSystem } from './hooks/useFilterSystem.js';
import { useTheme } from './hooks/useTheme.js';
import { cartesianToRoot } from './core/dsp/roots.js';
import { Header } from './components/layout/Header.jsx';
import { Footer } from './components/layout/Footer.jsx';
import { PresetSelector } from './components/filter/PresetSelector.jsx';
import { GainControl } from './components/filter/GainControl.jsx';
import { RootEditor } from './components/filter/RootEditor.jsx';
import { PoleZeroPlot } from './components/charts/PoleZeroPlot.jsx';
import { MagnitudePlot } from './components/charts/MagnitudePlot.jsx';
import { PhasePlot } from './components/charts/PhasePlot.jsx';
import { FrequencyController } from './components/response/FrequencyController.jsx';
import { ResponseStats } from './components/response/ResponseStats.jsx';
import { CoefficientPanel } from './components/coefficients/CoefficientPanel.jsx';
import { Card } from './components/ui/Card.jsx';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const {
    system, setGain, addPole, addZero,
    updatePole, updateZero, deletePole, deleteZero,
    loadPreset, reset
  } = useFilterSystem();

  const [theta, setTheta] = useState(Math.PI / 4);
  const [activePreset, setActivePreset] = useState('lpf_3p2z');
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(0.03);

  const handleRootDrag = useCallback((isStart, dragInfo, x, y) => {
    if (isStart || !dragInfo) return;
    const { type, index } = dragInfo;
    const currentRoot = type === 'pole' ? system.poles[index] : system.zeros[index];
    const setter = type === 'pole' ? updatePole : updateZero;
    const limit = type === 'pole' ? 0.98 : 1.5;
    const r = Math.sqrt(x * x + y * y);
    if (r > limit) {
      const scale = limit / r;
      x *= scale;
      y *= scale;
    }
    setter(index, cartesianToRoot(x, y, currentRoot.type));
  }, [system, updatePole, updateZero]);

  const handlePresetSelect = useCallback((key) => {
    loadPreset(key);
    setActivePreset(key);
  }, [loadPreset]);

  const handleReset = useCallback(() => {
    reset();
    setActivePreset('lpf_3p2z');
    setTheta(Math.PI / 4);
  }, [reset]);

  const toggleAnimation = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <Header theme={theme} onToggleTheme={toggleTheme} onReset={handleReset} />
      
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
          <aside className="space-y-4">
            <PresetSelector activePreset={activePreset} onSelect={handlePresetSelect} />
            <GainControl gain={system.gain} onChange={setGain} />
            <Card title="Frequency Control">
              <FrequencyController
                theta={theta}
                onThetaChange={setTheta}
                isPlaying={isPlaying}
                onTogglePlay={toggleAnimation}
                speed={speed}
                onSpeedChange={setSpeed}
              />
            </Card>
            <RootEditor
              poles={system.poles}
              zeros={system.zeros}
              onUpdatePole={updatePole}
              onUpdateZero={updateZero}
              onDeletePole={deletePole}
              onDeleteZero={deleteZero}
              onAddPole={addPole}
              onAddZero={addZero}
            />
          </aside>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <PoleZeroPlot
                poles={system.poles}
                zeros={system.zeros}
                currentTheta={theta}
                onRootDrag={handleRootDrag}
                onThetaChange={setTheta}
              />
              <ResponseStats system={system} theta={theta} />
            </div>
            
            <MagnitudePlot
              system={system}
              currentTheta={theta}
              onThetaChange={setTheta}
            />
            
            <PhasePlot
              system={system}
              currentTheta={theta}
              onThetaChange={setTheta}
            />
            
            <CoefficientPanel system={system} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
