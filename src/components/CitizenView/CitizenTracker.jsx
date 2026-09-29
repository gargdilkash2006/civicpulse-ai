import React, { useState } from 'react';
import { Search, CheckCircle2, MapPin, Users, ShieldAlert, Sparkles, ArrowRight, MessageSquare } from 'lucide-react';

export default function CitizenTracker({ complaints, hotspots }) {
  const [searchId, setSearchId] = useState('cmp-101');
  const [activeComplaint, setActiveComplaint] = useState(complaints[0] || null);

  const handleSearch = (e) => {
    e.preventDefault();
    const found = complaints.find((c) => c.id.toLowerCase() === searchId.toLowerCase().trim());
    if (found) {
      setActiveComplaint(found);
    }
  };

  const matchedHotspot = activeComplaint ? hotspots.find((h) => h.id === activeComplaint.hotspotId) : null;

  return (
    <div className="max-w-xl mx-auto py-4 px-4 space-y-6">
      <div className="glass-panel rounded-3xl p-6 border border-slate-800 shadow-2xl space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Citizen Voice Feedback Loop</span>
            <h3 className="text-lg font-extrabold text-white">Track Your Report Impact</h3>
          </div>
          <span className="px-2.5 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full text-xs font-bold">
            Live Tracker
          </span>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter Ticket ID (e.g. cmp-101)..."
            className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500 font-mono"
          />
          <button
            type="submit"
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
          >
            <Search className="w-3.5 h-3.5" /> Track
          </button>
        </form>

        {/* Active Complaint Status Card */}
        {activeComplaint && (
          <div className="p-5 bg-slate-950/90 rounded-2xl border border-slate-800 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between text-xs border-b border-slate-900 pb-2">
              <span className="font-bold text-slate-200">Ticket #{activeComplaint.id}</span>
              <span className="text-slate-500 font-mono">{activeComplaint.timestamp}</span>
            </div>

            {/* Input & Translation */}
            <div className="space-y-1 text-xs">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Your Submitted Voice Input:</span>
              <p className="text-slate-300 italic">"{activeComplaint.rawInput}"</p>
              {activeComplaint.translation && activeComplaint.translation !== activeComplaint.rawInput && (
                <p className="text-indigo-300 text-[11px]">En: "{activeComplaint.translation}"</p>
              )}
            </div>

            {/* Fused Community Impact Badge */}
            {matchedHotspot ? (
              <div className="p-4 bg-gradient-to-r from-red-950/40 to-indigo-950/40 border border-indigo-500/40 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>YOUR VOICE POWERED COMMUNITY ACTION!</span>
                </div>
                <p className="text-xs text-slate-300">
                  Your report joined <strong className="text-white">126 other citizen voices</strong> in Ward 17 to create <strong className="text-red-300">{matchedHotspot.title}</strong>.
                </p>
                <div className="pt-2 flex items-center justify-between text-[11px] text-emerald-400 font-bold">
                  <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Approved by Municipal Commissioner</span>
                  <span>₹18.5L Budget Allocated</span>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-slate-900 rounded-xl text-xs text-slate-400">
                Status: Logged and under AI pattern clustering analysis.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
