import React, { useState } from 'react';
import { AlertCircle, MapPin, FileText, CheckCircle2, ShieldCheck, DollarSign, Sliders, Bell, UserCheck, HelpCircle, Layers, ArrowRight, Volume2, Image as ImageIcon } from 'lucide-react';

export default function HotspotCaseFile({ hotspot, onGenerateBrief, onOpenSimulator, onOpenTrace }) {
  if (!hotspot) return null;

  const [govStatus, setGovStatus] = useState(hotspot.govStatus || 'UNREVIEWED');
  const [departmentOwner, setDepartmentOwner] = useState(hotspot.recommendedDepartment || 'Municipal Engineering & Stormwater Division');
  const [officialNotes, setOfficialNotes] = useState(
    'Inspected corridor diagnostics. Approved allocation of ₹18.5L for holistic 1.2km trunk line desilting & permeable paving.'
  );
  const [showBroadcastToast, setShowBroadcastToast] = useState(false);

  // 3-5 anonymized citizen statements
  const citizenStatements = [
    {
      id: 'stmt-1',
      lang: 'Hindi',
      quote: 'Har baar baarish mein road pe paani bhar jaata hai aur St. Mary school ke paas severe traffic jam ho jata hai.',
      translation: 'Every time it rains, water logs on the road and causes severe traffic jams near St. Mary school.',
      type: 'Text Input'
    },
    {
      id: 'stmt-2',
      lang: 'Punjabi',
      quote: 'Saade area vich har baarish ton baad sadak te paani khad janda hai, bachiyan nu school jaana aukha ho gya hai.',
      translation: 'After every rain in our area, water accumulates on the road, making it very difficult for children to go to school.',
      type: 'Voice Audio'
    },
    {
      id: 'stmt-3',
      lang: 'English',
      quote: 'Drainage overflow again on MG Road near St. Marys. Deep water pooling over 1.5 feet.',
      translation: 'Drainage overflow again on MG Road near St. Marys. Deep water pooling over 1.5 feet.',
      type: 'Photo Upload'
    },
    {
      id: 'stmt-4',
      lang: 'Tamil',
      quote: 'மழை பெய்யும்போதெல்லாம் இந்த சாலையில் தண்ணீர் தேங்கி விடுகிறது, சாக்கடை அடைப்பு.',
      translation: 'Whenever it rains, water accumulates on this road due to drain blockage.',
      type: 'Text Input'
    }
  ];

  return (
    <div className="space-y-6">
      {/* CASE FILE HEADER */}
      <div className="civic-card p-6 space-y-4 border-l-4 border-l-red-600">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-red-950 text-red-400 border border-red-800 rounded text-xs font-bold uppercase tracking-wider">
              HIGH PRIORITY CASE FILE
            </span>
            <span className="px-2.5 py-1 bg-slate-800 text-slate-300 rounded text-xs font-semibold">
              Evidence Strength: High ({hotspot.confidence}%)
            </span>
          </div>
          <span className="text-xs font-mono text-slate-400">Case ID: CP-CASE-{hotspot.id.toUpperCase()}</span>
        </div>

        <div className="space-y-1">
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-red-500" /> {hotspot.ward} • {hotspot.affectedCorridorLength} Affected Zone
          </span>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            {hotspot.title}
          </h2>
        </div>

        <div className="flex items-center gap-6 pt-2 border-t border-slate-800 text-xs">
          <div>
            <span className="text-[10px] text-slate-400 block uppercase">Related Reports</span>
            <strong className="text-base text-red-400 font-extrabold">{hotspot.reportCount} Citizens</strong>
          </div>
          <div className="h-6 w-[1px] bg-slate-800"></div>
          <div>
            <span className="text-[10px] text-slate-400 block uppercase">Assigned Department</span>
            <strong className="text-slate-200">{departmentOwner}</strong>
          </div>
          <div className="h-6 w-[1px] bg-slate-800"></div>
          <div>
            <span className="text-[10px] text-slate-400 block uppercase">Status</span>
            <strong className="text-amber-400 uppercase">{govStatus.replace(/_/g, ' ')}</strong>
          </div>
        </div>
      </div>

      {/* CASE FILE EDITORIAL SECTIONS */}

      {/* SECTION 1: What Citizens Are Reporting */}
      <div className="civic-card p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <span>🗣️</span> 1. What Citizens Are Reporting
        </h3>
        <p className="text-xs text-slate-400">
          Anonymized citizen statements submitted across regional languages:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {citizenStatements.map((stmt) => (
            <div key={stmt.id} className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold text-slate-300">{stmt.type}</span>
                <span className="px-1.5 py-0.5 bg-slate-800 text-slate-400 rounded font-mono text-[10px]">{stmt.lang}</span>
              </div>
              <p className="text-slate-200 italic font-medium">"{stmt.quote}"</p>
              {stmt.translation !== stmt.quote && (
                <p className="text-slate-400 text-[11px]">English: "{stmt.translation}"</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: What CivicPulse Detected & Evidence Mix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="civic-card p-6 space-y-3 md:col-span-2">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <span>🧠</span> 2. What CivicPulse Detected
          </h3>
          <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-2">
            <p>
              Reports describing flooding, drainage overflow, and severe school zone traffic disruption are concentrated within the same <strong className="text-white">1.2 km MG Road corridor</strong>.
            </p>
            <p>
              <strong className="text-red-400">Root Cause Pattern:</strong> Combined sub-surface stormwater drain blockage + asphalt subsidence near St. Mary's School gate.
            </p>
          </div>
        </div>

        {/* Evidence Mix Breakdown */}
        <div className="civic-card p-6 space-y-3">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <span>📊</span> Evidence Mix
          </h3>
          <div className="space-y-2 text-xs text-slate-300">
            <div className="flex justify-between">
              <span>Text Reports:</span>
              <strong className="text-white">{hotspot.evidence.textReports}</strong>
            </div>
            <div className="flex justify-between">
              <span>Voice Transcripts:</span>
              <strong className="text-white">{hotspot.evidence.voiceReports}</strong>
            </div>
            <div className="flex justify-between">
              <span>Photo Submissions:</span>
              <strong className="text-white">{hotspot.evidence.imageReports}</strong>
            </div>
            <div className="flex justify-between border-t border-slate-800 pt-2 font-bold text-white">
              <span>Geographic Radius:</span>
              <span>1.2 km Corridor</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: What Needs Verification & Recommended Next Step */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="civic-card p-6 space-y-3">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <span>🔎</span> What Needs Verification
          </h3>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-amber-500 font-bold">•</span>
              <span>Sub-surface CCTV inspection required for trunk line obstruction at marker 200m.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500 font-bold">•</span>
              <span>Verify catch-basin inlet debris buildup near St. Mary’s bus stop.</span>
            </li>
          </ul>
        </div>

        <div className="civic-card p-6 space-y-3">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <span>🛠️</span> Recommended Next Step
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Execute holistic corridor overhaul: jet-clean 1.2km underground stormwater drain, reconstruct catch basins with debris grates, and re-pave school zone with permeable asphalt.
          </p>
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => onGenerateBrief(hotspot)}
              className="px-4 py-2 bg-sky-700 hover:bg-sky-600 text-white font-bold rounded text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <FileText className="w-4 h-4" /> Situation Brief
            </button>
            <button
              onClick={() => onOpenSimulator(hotspot)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <DollarSign className="w-4 h-4 text-amber-400" /> Budget Simulator
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 4: Authority Decision & Governance */}
      <div className="civic-card p-6 space-y-4 border-t-2 border-t-sky-600">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <span>🏛️</span> Authority Decision & Governance Protocol
          </h3>
          <span className="text-xs font-mono text-slate-400">Human Official Control</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Assigned Department Owner</label>
            <input
              type="text"
              value={departmentOwner}
              onChange={(e) => setDepartmentOwner(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded text-xs text-slate-100 focus:outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Commissioner Order Notes</label>
            <textarea
              rows={2}
              value={officialNotes}
              onChange={(e) => setOfficialNotes(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded text-xs text-slate-100 focus:outline-none focus:border-sky-500"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={() => setGovStatus('APPROVED')}
            className="px-4 py-2.5 bg-sky-700 hover:bg-sky-600 text-white font-bold rounded text-xs flex items-center gap-2 cursor-pointer"
          >
            <UserCheck className="w-4 h-4" /> Approve Case & Budget (₹18.5L)
          </button>
          <button
            onClick={() => {
              setGovStatus('CITIZEN_BROADCAST_SENT');
              setShowBroadcastToast(true);
              setTimeout(() => setShowBroadcastToast(false), 4000);
            }}
            className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded text-xs flex items-center gap-2 cursor-pointer"
          >
            <Bell className="w-4 h-4" /> Broadcast Update to 127 Citizens
          </button>
          <button
            onClick={onOpenTrace}
            className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded text-xs flex items-center gap-1.5 cursor-pointer ml-auto"
          >
            <HelpCircle className="w-4 h-4 text-sky-400" /> Evidence Logic Trace
          </button>
        </div>

        {showBroadcastToast && (
          <div className="p-3 bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs rounded flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Citizen Notification Sent! 127 reporting citizens updated: "Ward 17 drainage overhaul approved by Municipal Commissioner."</span>
          </div>
        )}
      </div>
    </div>
  );
}
