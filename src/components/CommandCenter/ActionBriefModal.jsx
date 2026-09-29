import React from 'react';
import { FileText, Printer, CheckCircle2, ShieldAlert, Building2, School, Users, Sparkles, Download, ArrowRight } from 'lucide-react';

export default function ActionBriefModal({ hotspot, briefData, onClose }) {
  if (!hotspot) return null;

  const brief = briefData || hotspot.aiActionBrief;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full p-6 md:p-8 shadow-2xl space-y-6 relative my-8">
        {/* Printable Document Container */}
        <div id="action-brief-doc" className="space-y-6 text-slate-100">
          {/* Document Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
                  CivicPulse AI • Executive Intelligence Brief
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-white mt-1">
                CIVIC ACTION MEMORANDUM
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Ref ID: CP-BRIEF-{hotspot.id.toUpperCase()} • Generated on {new Date().toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-200 text-sm font-bold p-2 rounded-xl hover:bg-slate-800 print:hidden"
            >
              ✕
            </button>
          </div>

          {/* Target Metadata Banner */}
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Target Corridor</span>
              <span className="font-bold text-slate-200">{hotspot.ward} ({hotspot.affectedCorridorLength})</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Severity Rating</span>
              <span className="font-extrabold text-red-400">{hotspot.severity} (Risk Score: {brief.riskScore || 89})</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Department Owner</span>
              <span className="font-bold text-indigo-300">{hotspot.recommendedDepartment}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Target Timeline</span>
              <span className="font-bold text-emerald-400">{brief.estimatedResolutionTime || '5-7 Days'}</span>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="space-y-2">
            <h3 className="text-xs font-extrabold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4" /> 1. Executive Summary & Problem Diagnosis
            </h3>
            <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80 text-xs text-slate-300 leading-relaxed space-y-2">
              <p>{brief.summary}</p>
              <p className="text-amber-300 font-semibold">
                ⚠️ Urgency Assessment: {brief.urgency}
              </p>
            </div>
          </div>

          {/* Evidence Fusion Breakdown */}
          <div className="space-y-2">
            <h3 className="text-xs font-extrabold text-indigo-400 uppercase tracking-wider">
              2. Evidence Fusion Breakdown (127 Connected Citizen Reports)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Text Submissions</span>
                <span className="text-base font-extrabold text-slate-100">{hotspot.evidence.textReports} Reports</span>
                <span className="text-[10px] text-slate-400 block">Hindi, English, Tamil, Punjabi</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Voice Transcripts</span>
                <span className="text-base font-extrabold text-purple-400">{hotspot.evidence.voiceReports} Audio</span>
                <span className="text-[10px] text-slate-400 block">Multilingual speech-to-text</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Geotagged Images</span>
                <span className="text-base font-extrabold text-pink-400">{hotspot.evidence.imageReports} Photos</span>
                <span className="text-[10px] text-slate-400 block">Visual flooding verification</span>
              </div>
            </div>
          </div>

          {/* Impacted Infrastructure & Facilities */}
          <div className="space-y-2">
            <h3 className="text-xs font-extrabold text-indigo-400 uppercase tracking-wider">
              3. Critical Infrastructure & Population Impacted
            </h3>
            <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 text-xs space-y-2">
              <div className="flex items-center gap-2 text-slate-200">
                <Users className="w-4 h-4 text-indigo-400" />
                <span>Estimated Affected Residents: <strong>{hotspot.impactedPopulation.toLocaleString()} citizens</strong></span>
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-slate-400">Critical Facilities at Risk:</span>
                {hotspot.criticalFacilities.map((fac, i) => (
                  <span key={i} className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 text-[11px] font-medium flex items-center gap-1">
                    <School className="w-3 h-3 text-amber-400" /> {fac}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Recommended Action & Budget */}
          <div className="space-y-2">
            <h3 className="text-xs font-extrabold text-indigo-400 uppercase tracking-wider">
              4. Recommended Multi-Step Intervention & Budget Strategy
            </h3>
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 text-xs">
              <p className="text-slate-200 leading-relaxed">
                <strong>Suggested Action:</strong> {hotspot.suggestedIntervention}
              </p>
              <div className="flex items-center justify-between border-t border-slate-800 pt-3">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Estimated Outlay</span>
                  <span className="text-lg font-extrabold text-amber-400 block">₹{(hotspot.estimatedBudget / 100000).toFixed(1)} Lakhs</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Projected ROI</span>
                  <span className="text-xs font-bold text-emerald-400 block">{brief.roi || '94% complaint reduction'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between items-center border-t border-slate-800 pt-4 print:hidden">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold"
          >
            Close Memorandum
          </button>
          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
