import React from 'react';
import { Sparkles, Sliders, Zap, AlertTriangle, Layers } from 'lucide-react';

export default function DemoScenarioSwitcher({ activeScenarioId, onSelectScenario }) {
  const scenarios = [
    {
      id: 'hotspot-1',
      name: 'Monsoon Flood Crisis (Ward 17)',
      badge: '127 Reports',
      color: 'from-red-600 to-indigo-600',
      tag: 'High Priority'
    },
    {
      id: 'hotspot-2',
      name: 'Market Waste Accumulation (Ward 12)',
      badge: '43 Reports',
      color: 'from-amber-600 to-orange-600',
      tag: 'Sanitation'
    },
    {
      id: 'hotspot-3',
      name: 'Metro Night Safety Blackout (Ward 18)',
      badge: '31 Reports',
      color: 'from-yellow-600 to-amber-600',
      tag: 'Public Safety'
    }
  ];

  return (
    <div className="glass-panel rounded-2xl p-3 border border-indigo-500/30 flex items-center justify-between flex-wrap gap-3">
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
        <span className="text-xs font-extrabold text-slate-200 uppercase tracking-wider">
          Hackathon Preset Scenarios:
        </span>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {scenarios.map((sc) => (
          <button
            key={sc.id}
            onClick={() => onSelectScenario(sc.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeScenarioId === sc.id
                ? `bg-gradient-to-r ${sc.color} text-white shadow-lg`
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>{sc.name}</span>
            <span className="px-1.5 py-0.2 bg-slate-950/60 rounded-full text-[10px] font-mono text-amber-300">
              {sc.badge}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
