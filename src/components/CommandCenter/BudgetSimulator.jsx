import React, { useState } from 'react';
import { DollarSign, Sliders, TrendingUp, ShieldCheck, Zap, ArrowRight, RotateCcw } from 'lucide-react';

export default function BudgetSimulator({ hotspot, onClose }) {
  const [budgetLakhs, setBudgetLakhs] = useState(18.5); // Default ₹18.5 Lakhs
  const [includeDrainage, setIncludeDrainage] = useState(true);
  const [includeRoadRepave, setIncludeRoadRepave] = useState(true);
  const [includeTelemetry, setIncludeTelemetry] = useState(true);

  // Dynamic Impact Formula Calculations
  let reductionPercent = Math.min(96, Math.round((budgetLakhs / 20) * 88));
  if (!includeDrainage) reductionPercent -= 35;
  if (!includeRoadRepave) reductionPercent -= 25;
  reductionPercent = Math.max(15, reductionPercent);

  const newRiskScore = Math.max(8, Math.round(89 * (1 - reductionPercent / 100)));
  const satisfactionGain = Math.min(95, Math.round(reductionPercent * 0.85));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-2xl border border-amber-500/30">
              <Sliders className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Decision Support Simulator</span>
              <h3 className="text-lg font-extrabold text-slate-100">
                Resource & Budget Allocation Simulator
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 text-sm font-bold p-1 rounded-lg hover:bg-slate-800"
          >
            ✕
          </button>
        </div>

        {/* Hotspot Target Summary */}
        <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-bold">Simulating Target</span>
            <p className="text-slate-200 font-bold">{hotspot?.title || 'Ward 17 Corridor'}</p>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-500 uppercase font-bold">Baseline Risk</span>
            <span className="text-red-400 font-extrabold block">89 / 100 HIGH</span>
          </div>
        </div>

        {/* Interactive Budget Slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-amber-400" /> Capital Expenditure Allocation (₹ Lakhs):
            </label>
            <span className="text-xl font-extrabold text-amber-400">₹{budgetLakhs} Lakhs</span>
          </div>
          <input
            type="range"
            min="5"
            max="35"
            step="0.5"
            value={budgetLakhs}
            onChange={(e) => setBudgetLakhs(parseFloat(e.target.value))}
            className="w-full accent-amber-500 h-2 bg-slate-950 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>₹5 Lakhs (Patch Repair)</span>
            <span>₹18.5 Lakhs (AI Optimal)</span>
            <span>₹35 Lakhs (Full Corridor Redesign)</span>
          </div>
        </div>

        {/* Intervention Scope Toggles */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Intervention Scope Modules</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              onClick={() => setIncludeDrainage(!includeDrainage)}
              className={`p-3 rounded-2xl border text-left text-xs font-semibold transition-all ${
                includeDrainage
                  ? 'bg-indigo-600/20 border-indigo-500 text-indigo-200'
                  : 'bg-slate-950 border-slate-800 text-slate-500'
              }`}
            >
              <span className="block text-[10px] text-slate-400">Module A</span>
              1.2km Trunk Drain Desilting
            </button>
            <button
              onClick={() => setIncludeRoadRepave(!includeRoadRepave)}
              className={`p-3 rounded-2xl border text-left text-xs font-semibold transition-all ${
                includeRoadRepave
                  ? 'bg-purple-600/20 border-purple-500 text-purple-200'
                  : 'bg-slate-950 border-slate-800 text-slate-500'
              }`}
            >
              <span className="block text-[10px] text-slate-400">Module B</span>
              Permeable Asphalt Paving
            </button>
            <button
              onClick={() => setIncludeTelemetry(!includeTelemetry)}
              className={`p-3 rounded-2xl border text-left text-xs font-semibold transition-all ${
                includeTelemetry
                  ? 'bg-emerald-600/20 border-emerald-500 text-emerald-200'
                  : 'bg-slate-950 border-slate-800 text-slate-500'
              }`}
            >
              <span className="block text-[10px] text-slate-400">Module C</span>
              IoT Flood Sensor Telemetry
            </button>
          </div>
        </div>

        {/* Projected Impact Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Complaint Reduction</span>
            <span className="text-2xl font-extrabold text-emerald-400">-{reductionPercent}%</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Projected</span>
          </div>

          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Post-Action Risk</span>
            <span className="text-2xl font-extrabold text-indigo-400">{newRiskScore} / 100</span>
            <span className="text-[10px] text-emerald-400 block mt-0.5">Low Risk</span>
          </div>

          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Public Approval Lift</span>
            <span className="text-2xl font-extrabold text-amber-400">+{satisfactionGain}%</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Community NPS</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-between items-center pt-2">
          <button
            onClick={() => setBudgetLakhs(18.5)}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset to Recommended Plan
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
          >
            <span>Apply Simulation Scenario</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
