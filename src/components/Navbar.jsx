import React, { useState } from 'react';
import { Activity, MapPin, Smartphone, LayoutDashboard, Settings, Languages, Shield, ChevronDown } from 'lucide-react';
import { LANGUAGES } from '../data/mockData';

export default function Navbar({
  activeMode,
  setActiveMode,
  activeTab,
  setActiveTab,
  currentLang,
  setCurrentLang,
  apiKey,
  setApiKey
}) {
  const [showConfigModal, setShowConfigModal] = useState(false);

  const navItems = [
    { id: 'overview', label: 'Overview', question: 'What is happening?' },
    { id: 'hotspots', label: 'Hotspots', question: 'Where are the problems?' },
    { id: 'evidence', label: 'Evidence', question: 'What supports findings?' },
    { id: 'priorities', label: 'Priorities', question: 'What needs attention?' },
    { id: 'actions', label: 'Actions', question: 'What should happen next?' },
    { id: 'community', label: 'Community', question: 'What are citizens reporting?' },
    { id: 'trends', label: 'Trends', question: 'What is changing?' }
  ];

  return (
    <header className="glass-panel border-b border-slate-800 px-4 py-3 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto space-y-3">
        {/* Top Header Row: Brand & Operational Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Brand & Location Context */}
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-sky-950 border border-sky-500/40 flex items-center justify-center text-sky-400">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-slate-100 tracking-tight">
                  CivicPulse <span className="text-sky-400 font-semibold text-xs border-l border-slate-700 pl-2 ml-1">Community Intelligence</span>
                </h1>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                <span className="flex items-center gap-1 text-slate-300 font-medium">
                  <MapPin className="w-3 h-3 text-sky-400" /> Selected Area: <strong className="text-white">Ward 17 • Demo District</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Controls: Portal Mode Switcher & Language / Config */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Mode Switcher */}
            <div className="bg-slate-900 p-1 rounded-lg border border-slate-800 flex items-center gap-1">
              <button
                onClick={() => setActiveMode('command')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  activeMode === 'command'
                    ? 'bg-sky-700 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Command Center</span>
              </button>
              <button
                onClick={() => setActiveMode('citizen')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  activeMode === 'citizen'
                    ? 'bg-sky-700 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Citizen Portal</span>
              </button>
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300">
              <Languages className="w-3.5 h-3.5 text-sky-400" />
              <select
                value={currentLang}
                onChange={(e) => setCurrentLang(e.target.value)}
                className="bg-transparent text-slate-200 text-xs font-medium focus:outline-none cursor-pointer"
              >
                {LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code} className="bg-slate-900 text-slate-200">
                    {l.flag} {l.native}
                  </option>
                ))}
              </select>
            </div>

            {/* Engine Config */}
            <button
              onClick={() => setShowConfigModal(true)}
              className="p-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300 transition-colors"
              title="Civic Intelligence Engine Configuration"
            >
              <Settings className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Question-Based Primary Navigation Bar (Active when in Command Mode) */}
        {activeMode === 'command' && (
          <nav className="flex items-center gap-1 overflow-x-auto pt-1 border-t border-slate-800/60 scrollbar-none">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-slate-800 text-white border border-sky-500/50 text-sky-300 font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
                title={item.question}
              >
                <span>{item.label}</span>
                <span className="text-[10px] text-slate-500 font-normal hidden lg:inline">
                  ({item.question})
                </span>
              </button>
            ))}
          </nav>
        )}
      </div>

      {/* Engine Config Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-sky-400" />
                <h3 className="text-sm font-bold text-slate-100">Civic Intelligence Engine Settings</h3>
              </div>
              <button
                onClick={() => setShowConfigModal(false)}
                className="text-slate-400 hover:text-slate-200 text-xs font-bold"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              CivicPulse operates with an integrated municipal pattern engine. You may optionally enter a custom Gemini API key for live model evaluation.
            </p>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">API Key</label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-sky-500 font-mono"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowConfigModal(false)}
                className="px-4 py-2 bg-sky-700 hover:bg-sky-600 text-white rounded-xl text-xs font-semibold"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
