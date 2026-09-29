import React, { useState } from 'react';
import { Layers, Filter, Search, Volume2, Image as ImageIcon, FileText, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';

export default function DuplicateCluster({ complaints, hotspots, onSelectComplaint, onSelectHotspot }) {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredComplaints = complaints.filter((c) => {
    const matchesCat = selectedCategory === 'ALL' || c.category.includes(selectedCategory);
    const matchesSearch =
      c.rawInput.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.translation && c.translation.toLowerCase().includes(searchQuery.toLowerCase())) ||
      c.citizenName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="glass-panel rounded-3xl p-6 border border-slate-800 shadow-2xl space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-extrabold text-slate-100">
              Live Pattern Detection & Deduplication Stream
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Gemini continuously clusters incoming multi-modal citizen reports to prevent duplicate work orders.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search reports or languages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500 w-48"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none cursor-pointer"
          >
            <option value="ALL">All Categories</option>
            <option value="Infrastructure">Infrastructure & Drainage</option>
            <option value="Sanitation">Sanitation & Waste</option>
            <option value="Safety">Public Safety & Power</option>
          </select>
        </div>
      </div>

      {/* Cluster Stream Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredComplaints.map((cmp) => {
          const matchedHotspot = hotspots.find((h) => h.id === cmp.hotspotId);
          return (
            <div
              key={cmp.id}
              onClick={() => onSelectComplaint(cmp)}
              className="p-4 bg-slate-950/80 hover:bg-slate-900 border border-slate-800/80 hover:border-indigo-500/40 rounded-2xl transition-all cursor-pointer space-y-3 group"
            >
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="p-1 bg-slate-900 rounded-lg text-slate-400">
                    {cmp.inputType === 'voice' ? (
                      <Volume2 className="w-3.5 h-3.5 text-purple-400" />
                    ) : cmp.inputType === 'photo' ? (
                      <ImageIcon className="w-3.5 h-3.5 text-pink-400" />
                    ) : (
                      <FileText className="w-3.5 h-3.5 text-indigo-400" />
                    )}
                  </span>
                  <span className="font-bold text-slate-200">{cmp.citizenName}</span>
                  <span className="px-2 py-0.5 bg-slate-900 border border-slate-800 rounded-md text-[10px] text-slate-400 font-mono">
                    {cmp.languageName}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">{cmp.timestamp}</span>
              </div>

              {/* Raw Input vs Translation */}
              <div className="space-y-1 text-xs">
                <p className="text-slate-300 font-medium line-clamp-2">
                  "{cmp.rawInput}"
                </p>
                {cmp.translation && cmp.translation !== cmp.rawInput && (
                  <p className="text-[11px] text-indigo-300/80 italic line-clamp-2">
                    En: "{cmp.translation}"
                  </p>
                )}
              </div>

              {/* Clustering Status Badge */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-900 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full text-[10px] font-bold">
                    {cmp.category}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${cmp.severity === 'High' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'}`}>
                    {cmp.severity}
                  </span>
                </div>

                {matchedHotspot && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectHotspot(matchedHotspot);
                    }}
                    className="text-[10px] text-red-400 hover:text-red-300 font-bold flex items-center gap-1 bg-red-500/10 px-2 py-1 rounded-lg border border-red-500/20"
                  >
                    <span>Fused in Hotspot #1</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
