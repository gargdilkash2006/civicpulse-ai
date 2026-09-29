import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldAlert, Layers, CheckCircle2, AlertTriangle, FileText, Volume2, Image as ImageIcon, RotateCcw, HelpCircle, Activity } from 'lucide-react';

export default function BeforeAfterTransformation({ hotspot, complaints, onSelectHotspot }) {
  const [viewState, setViewState] = useState('before'); // 'before' | 'fusing' | 'after'
  const [isFusing, setIsFusing] = useState(false);

  const handleRunFusion = () => {
    setIsFusing(true);
    setViewState('fusing');
    setTimeout(() => {
      setIsFusing(false);
      setViewState('after');
    }, 2200);
  };

  return (
    <div className="glass-panel rounded-3xl p-6 md:p-8 border border-slate-800 shadow-2xl space-y-6 relative overflow-hidden">
      {/* Top Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-[10px] font-extrabold tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full uppercase">
              Google AI Hackathon Core Demo
            </span>
            <span className="text-xs text-slate-400">• Visual Storytelling</span>
          </div>
          <h2 className="text-2xl font-black text-white mt-1">
            From Complaints to Community Intelligence
          </h2>
          <p className="text-xs text-slate-400 mt-0.5 max-w-2xl">
            See how CivicPulse AI fuses fragmented, unstructured citizen complaints across 4 languages into 1 actionable community hotspot.
          </p>
        </div>

        {/* View Toggle Bar */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-2xl border border-slate-800">
          <button
            onClick={() => setViewState('before')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              viewState === 'before'
                ? 'bg-slate-800 text-amber-300 border border-amber-500/30 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ❌ BEFORE CivicPulse (127 Scattered Calls)
          </button>
          <button
            onClick={() => setViewState('after')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              viewState === 'after'
                ? 'bg-gradient-to-r from-red-600 via-purple-600 to-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ✨ AFTER CivicPulse (1 Fused Hotspot)
          </button>
        </div>
      </div>

      {/* STATE 1: BEFORE CIVICPULSE (Fragmented complaints) */}
      {viewState === 'before' && (
        <div className="space-y-6 animate-fade-in">
          {/* Warning Callout */}
          <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300 space-y-1">
              <h4 className="font-bold text-amber-300 text-sm">TRADITIONAL MUNICIPAL SYSTEM (Siloed & Fragmented)</h4>
              <p>
                127 separate citizen reports arrived via call centers, WhatsApp, photos, and web forms in Hindi, Punjabi, Tamil, and English. In traditional municipal workflows, these are filed as 127 isolated pothole tickets. Officials miss the big picture.
              </p>
            </div>
          </div>

          {/* Grid of Scattered Raw Complaints */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-4 bg-slate-950/90 rounded-2xl border border-slate-800 space-y-2 opacity-90 hover:opacity-100 transition-opacity">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-amber-400 flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5" /> Ticket #4891 (Hindi)
                </span>
                <span className="text-slate-500">10m ago</span>
              </div>
              <p className="text-xs text-slate-300 italic">"Har baar baarish mein road pe paani bhar jaata hai..."</p>
              <div className="pt-2 border-t border-slate-900 text-[10px] text-slate-500 flex justify-between">
                <span>Filed under: Surface Pothole</span>
                <span className="text-slate-400">Ward 17</span>
              </div>
            </div>

            <div className="p-4 bg-slate-950/90 rounded-2xl border border-slate-800 space-y-2 opacity-90 hover:opacity-100 transition-opacity">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-purple-400 flex items-center gap-1">
                  <Volume2 className="w-3.5 h-3.5" /> Ticket #4892 (Punjabi Audio)
                </span>
                <span className="text-slate-500">25m ago</span>
              </div>
              <p className="text-xs text-slate-300 italic">"Saade area vich har baarish ton baad sadak te paani khad janda hai..."</p>
              <div className="pt-2 border-t border-slate-900 text-[10px] text-slate-500 flex justify-between">
                <span>Filed under: Water Stagnation</span>
                <span className="text-slate-400">Ward 17</span>
              </div>
            </div>

            <div className="p-4 bg-slate-950/90 rounded-2xl border border-slate-800 space-y-2 opacity-90 hover:opacity-100 transition-opacity">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-pink-400 flex items-center gap-1">
                  <ImageIcon className="w-3.5 h-3.5" /> Ticket #4893 (Photo Upload)
                </span>
                <span className="text-slate-500">1h ago</span>
              </div>
              <p className="text-xs text-slate-300 italic">"Drainage overflow again near St. Mary's School gate..."</p>
              <div className="pt-2 border-t border-slate-900 text-[10px] text-slate-500 flex justify-between">
                <span>Filed under: Sanitation Call</span>
                <span className="text-slate-400">Ward 17</span>
              </div>
            </div>
          </div>

          {/* Transform CTA Button */}
          <div className="text-center pt-4">
            <button
              onClick={handleRunFusion}
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-extrabold text-sm rounded-2xl shadow-2xl shadow-indigo-600/40 flex items-center gap-3 mx-auto transition-all transform hover:scale-105 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-amber-300 animate-spin" />
              <span>RUN GEMINI EVIDENCE FUSION ENGINE</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-[11px] text-slate-500 mt-2">
              Watch 127 scattered calls fuse into 1 actionable community hotspot
            </p>
          </div>
        </div>
      )}

      {/* STATE 2: FUSING ANIMATION */}
      {viewState === 'fusing' && (
        <div className="py-16 text-center space-y-4 animate-pulse">
          <div className="h-16 w-16 mx-auto rounded-3xl bg-indigo-600/20 border border-indigo-500/50 flex items-center justify-center text-indigo-400">
            <Sparkles className="w-8 h-8 animate-spin" />
          </div>
          <h3 className="text-xl font-extrabold text-white">Gemini 2.5 Flash Fusing Evidence...</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Translating Hindi, Punjabi & Tamil • Calculating Haversine spatial corridor (<strong className="text-indigo-300">1.2 km</strong>) • Synthesizing 127 citizen voice inputs into 1 structural failure pattern...
          </p>
          <div className="w-64 mx-auto bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-full rounded-full animate-pulse" style={{ width: '85%' }}></div>
          </div>
        </div>
      )}

      {/* STATE 3: AFTER CIVICPULSE (Fused Hotspot Highlight) */}
      {viewState === 'after' && (
        <div className="space-y-6 animate-fade-in">
          {/* Success Banner */}
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              <div>
                <h4 className="text-sm font-extrabold text-emerald-300">127 REPORT SILOS SYNTHESIZED INTO 1 COMMUNITY HOTSPOT</h4>
                <p className="text-xs text-slate-300">
                  Gemini identified that all 127 reports share a single root cause: <strong className="text-white">Sub-surface trunk stormwater drain failure along MG Road school zone</strong>.
                </p>
              </div>
            </div>
            <button
              onClick={() => setViewState('before')}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 rounded-xl text-xs flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Replay Demo
            </button>
          </div>

          {/* Fused Community Hotspot Card */}
          <div className="p-6 bg-slate-950/90 rounded-3xl border border-red-500/40 shadow-2xl space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-red-500/20 text-red-300 border border-red-500/40 rounded-full text-xs font-extrabold uppercase tracking-wider flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-red-400" /> 🔴 COMMUNITY HOTSPOT DETECTED
                </span>
                <span className="px-2.5 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-bold">
                  91% AI Confidence
                </span>
              </div>
              <span className="text-xs text-slate-400 font-mono">Corridor Length: 1.2 km</span>
            </div>

            <h3 className="text-xl font-black text-white">
              Ward 17 Recurring Road + Drainage Corridor Failure
            </h3>

            {/* Metrics Breakdown Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Fused Reports</span>
                <span className="text-lg font-extrabold text-red-400">127 Citizen Calls</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Evidence Mix</span>
                <span className="text-xs font-bold text-slate-200 block">82 Text • 22 Voice • 23 Photo</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Languages Fused</span>
                <span className="text-xs font-bold text-purple-400 block">Hindi, Punjabi, Tamil, English</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Recommended Action</span>
                <span className="text-xs font-bold text-emerald-400 block">Overhaul 1.2km Trunk Line</span>
              </div>
            </div>

            {/* Explanatory Callout */}
            <div className="p-4 bg-indigo-950/40 border border-indigo-500/30 rounded-2xl text-xs text-slate-300 space-y-1">
              <span className="font-bold text-indigo-300 block uppercase tracking-wider text-[10px]">WHY THIS IS A GAME CHANGER:</span>
              <p>
                Instead of dispatching 127 separate maintenance workers to patch isolated potholes, municipal authorities can now execute <strong>1 holistic ₹18.5L corridor infrastructure project</strong> that fixes the root cause permanently.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
