import React from 'react';
import { AlertCircle, MapPin, PieChart, Layers, FileText, DollarSign, ArrowRight } from 'lucide-react';

export default function HotspotInspector({ hotspot, onGenerateBrief, onOpenSimulator, onSelectComplaint }) {
  if (!hotspot) return null;

  return (
    <div className="civic-card p-6 border-l-4 border-l-red-600 space-y-6 shadow-xl">
      {/* Top Banner */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-[10px] font-bold tracking-wider bg-red-950 text-red-400 border border-red-800 rounded uppercase">
              COMMUNITY HOTSPOT
            </span>
            <span className="px-2 py-0.5 text-[10px] font-semibold bg-slate-800 text-slate-300 rounded">
              Evidence Strength: {hotspot.confidence}%
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">
            {hotspot.title}
          </h2>
          <p className="text-xs text-slate-400 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-red-500" /> {hotspot.ward} Corridor • {hotspot.affectedCorridorLength} Affected Area
          </p>
        </div>

        <div className="flex items-center gap-4 bg-slate-950 px-4 py-2 rounded-lg border border-slate-800 text-xs">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Related Reports</span>
            <span className="text-lg font-extrabold text-red-400">{hotspot.reportCount}</span>
          </div>
          <div className="h-6 w-[1px] bg-slate-800"></div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Corridor</span>
            <span className="text-sm font-bold text-slate-200">{hotspot.affectedCorridorLength}</span>
          </div>
        </div>
      </div>

      {/* Synthesis Summary */}
      <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2 text-xs">
        <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider block">SYNTHESIS FINDING</span>
        <p className="text-slate-300 leading-relaxed">
          127 citizen reports in Hindi, English, Punjabi, and Tamil across text, voice, and photo formats were concentrated within the same 1.2km corridor. Rather than treating these as separate pothole tickets, CivicPulse identifies them as <strong className="text-white">ONE interconnected infrastructure failure</strong>.
        </p>
      </div>

      {/* Grid of Evidence & Diagnostics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Evidence Mix */}
        <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2 text-xs">
          <span className="font-bold text-slate-200 uppercase tracking-wider block text-[10px]">Evidence Fusion Mix</span>
          <div className="space-y-1.5 text-slate-300">
            <div className="flex justify-between"><span>Text Complaints:</span> <strong className="text-white">{hotspot.evidence.textReports}</strong></div>
            <div className="flex justify-between"><span>Voice Transcripts:</span> <strong className="text-white">{hotspot.evidence.voiceReports}</strong></div>
            <div className="flex justify-between"><span>Photo Evidence:</span> <strong className="text-white">{hotspot.evidence.imageReports}</strong></div>
          </div>
        </div>

        {/* Contributing Factors */}
        <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2 text-xs md:col-span-2">
          <span className="font-bold text-slate-200 uppercase tracking-wider block text-[10px]">Root Cause Diagnostics</span>
          <ul className="space-y-1 text-slate-300">
            {hotspot.contributingFactors.map((factor, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-red-500">•</span>
                <span>{factor}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action CTAs */}
      <div className="flex items-center justify-between border-t border-slate-800 pt-4 flex-wrap gap-2">
        <div className="text-xs">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Assigned Department</span>
          <span className="text-slate-200 font-bold">{hotspot.recommendedDepartment}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onGenerateBrief(hotspot)}
            className="px-4 py-2 bg-sky-700 hover:bg-sky-600 text-white text-xs font-bold rounded flex items-center gap-1.5 cursor-pointer"
          >
            <FileText className="w-4 h-4" /> Situation Brief
          </button>
          <button
            onClick={() => onOpenSimulator(hotspot)}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold rounded flex items-center gap-1.5 cursor-pointer"
          >
            <DollarSign className="w-4 h-4 text-amber-400" /> Simulate Budget
          </button>
        </div>
      </div>
    </div>
  );
}
