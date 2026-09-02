import React from 'react';
import { RootSection } from './RootSection.jsx';
import { Card } from '../ui/Card.jsx';

export function RootEditor({ 
  poles, 
  zeros, 
  onUpdatePole, 
  onUpdateZero, 
  onDeletePole, 
  onDeleteZero, 
  onAddPole, 
  onAddZero 
}) {
  return (
    <Card title="Root Management" className="space-y-4">
      <RootSection
        roots={poles}
        kind="pole"
        onUpdate={onUpdatePole}
        onDelete={onDeletePole}
        onAdd={onAddPole}
      />
      <div className="border-t border-slate-200 dark:border-slate-700" />
      <RootSection
        roots={zeros}
        kind="zero"
        onUpdate={onUpdateZero}
        onDelete={onDeleteZero}
        onAdd={onAddZero}
      />
    </Card>
  );
}
