import React from 'react';
import { AlertCircle, MapPin, ArrowRight, Shield, Layers, FileText, CheckCircle2, Activity, Clock } from 'lucide-react';

export default function OverviewScreen({ hotspot, hotspots, onInvestigateHotspot, onViewMap, onViewEvidence }) {
  if (!hotspot) return null;

  return (
    <div className="space-y-6">
      {/* Overview Screen Title / Context */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Executive Operational Overview</h2>
          <p className="text-xs text-slate-400">Current priority community signals requiring municipal authority action.</p>
        </div>
        <span className="text-xs font-mono text-slate-400">System Status: Active Monitoring</span>
      </div>

      {/* DOMINANT VISUAL FOCUS: FEATURED COMMUNITY SIGNAL */}
      <div className="civic-card p-6 border-l-4 border-l-red-600 space-y-5 shadow-xl">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-red-950 text-red-400 border border-red-800 rounded-md text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5" /> FEATURED COMMUNITY SIGNAL
            </span>
            <span className="px-2.5 py-1 bg-slate-800 text-slate-300 rounded-md text-xs font-semibold">
              Evidence Strength: High ({hotspot.confidence}%)
            </span>
          </div>
          <span className="text-xs font-mono text-slate-400">Corridor Length: {hotspot.affectedCorridorLength}</span>
        </div>

        {/* Issue Title & Ward */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-red-500" />
            <strong className="text-slate-200">{hotspot.ward}</strong> • {hotspot.category}
          </div>
          <h3 className="text-2xl font-extrabold text-white tracking-tight">
            {hotspot.title}
          </h3>
        </div>

        {/* Core Metric Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-2 border-y border-slate-800 text-xs">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Related Reports</span>
            <span className="text-xl font-extrabold text-red-400">{hotspot.reportCount} Citizens</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Affected Corridor</span>
            <span className="text-lg font-bold text-slate-200">{hotspot.affectedCorridorLength}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">First Reported</span>
            <span className="text-xs font-medium text-slate-300">June 12, 2026</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Latest Activity</span>
            <span className="text-xs font-medium text-slate-300">September 28, 2026</span>
          </div>
        </div>

        {/* Narrative Finding & Action CTA */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
          <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
            127 individual citizen reports across text, voice, and photos confirm recurring post-rain waterlogging along the MG Road school zone. Recommended for holistic municipal drainage repair.
          </p>

          <button
            onClick={() => onInvestigateHotspot(hotspot)}
            className="px-6 py-3 bg-sky-700 hover:bg-sky-600 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-2 shadow-lg transition-all shrink-0 cursor-pointer"
          >
            <span>Investigate Case File</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Secondary Operational Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="civic-card p-4 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Active Hotspots</span>
          <div className="flex items-center justify-between">
            <span className="text-xl font-extrabold text-slate-100">{hotspots.length} Clusters</span>
            <span className="text-[10px] px-2 py-0.5 bg-red-950 text-red-400 border border-red-800 rounded">1 High Priority</span>
          </div>
        </div>

        <div className="civic-card p-4 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">High Priority Issues</span>
          <div className="flex items-center justify-between">
            <span className="text-xl font-extrabold text-red-400">1 Urgent</span>
            <span className="text-[10px] text-slate-400">Ward 17 Corridor</span>
          </div>
        </div>

        <div className="civic-card p-4 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Report Volume</span>
          <div className="flex items-center justify-between">
            <span className="text-xl font-extrabold text-slate-100">201 Total</span>
            <span className="text-[10px] text-slate-400">30-Day Window</span>
          </div>
        </div>

        <div className="civic-card p-4 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Issues Under Review</span>
          <div className="flex items-center justify-between">
            <span className="text-xl font-extrabold text-amber-400">2 Pending</span>
            <span className="text-[10px] text-slate-400">Sanitation & Lighting</span>
          </div>
        </div>
      </div>

      {/* Secondary Active Hotspots List */}
      <div className="civic-card p-5 space-y-4">
        <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Active Community Hotspots Inventory</h4>
        <div className="divide-y divide-slate-800">
          {hotspots.map((hs) => (
            <div
              key={hs.id}
              onClick={() => onInvestigateHotspot(hs)}
              className="py-3 flex items-center justify-between gap-4 hover:bg-slate-900/50 px-2 rounded-lg cursor-pointer transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${hs.severity === 'HIGH' ? 'bg-red-950 text-red-400 border border-red-800' : 'bg-amber-950 text-amber-400 border border-amber-800'}`}>
                    {hs.severity}
                  </span>
                  <span className="text-xs font-bold text-white">{hs.title}</span>
                </div>
                <p className="text-[11px] text-slate-400">{hs.ward} • {hs.affectedCorridorLength} • {hs.recommendedDepartment}</p>
              </div>

              <div className="flex items-center gap-3 text-right">
                <div>
                  <span className="text-xs font-bold text-slate-200 block">{hs.reportCount} Reports</span>
                  <span className="text-[10px] text-slate-400 font-mono">Evidence Strength: {hs.confidence}%</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onInvestigateHotspot(hs);
                  }}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md text-xs font-medium cursor-pointer"
                >
                  Investigate
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
