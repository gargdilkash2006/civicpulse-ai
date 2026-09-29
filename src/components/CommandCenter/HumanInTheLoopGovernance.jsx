import React, { useState } from 'react';
import { ShieldCheck, UserCheck, CheckCircle2, AlertCircle, Send, Edit3, ArrowRight, Bell, Sparkles } from 'lucide-react';

export default function HumanInTheLoopGovernance({ hotspot, onUpdateStatus }) {
  const [govStatus, setGovStatus] = useState(hotspot?.govStatus || 'UNREVIEWED'); // 'UNREVIEWED' | 'APPROVED' | 'DISPATCHED' | 'NOTIFIED'
  const [officialNotes, setOfficialNotes] = useState(
    'Inspected corridor diagnostics. Approved allocation of ₹18.5L for holistic 1.2km trunk line desilting & permeable paving.'
  );
  const [departmentOwner, setDepartmentOwner] = useState(hotspot?.recommendedDepartment || 'Municipal Engineering & Stormwater Division');
  const [showBroadcastSuccess, setShowBroadcastSuccess] = useState(false);

  const handleApprove = () => {
    setGovStatus('APPROVED');
  };

  const handleDispatch = () => {
    setGovStatus('DISPATCHED');
  };

  const handleSendBroadcast = () => {
    setGovStatus('NOTIFIED');
    setShowBroadcastSuccess(true);
    setTimeout(() => setShowBroadcastSuccess(false), 4000);
  };

  return (
    <div className="glass-panel rounded-3xl p-6 border border-slate-800 shadow-2xl space-y-6">
      {/* Governance Console Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-2xl border border-emerald-500/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                Human-in-the-Loop Governance Console
              </span>
              <span className="px-2 py-0.5 bg-slate-900 text-slate-300 border border-slate-800 rounded-full text-[10px] font-mono">
                Official Authority Decision Support
              </span>
            </div>
            <h3 className="text-lg font-extrabold text-white mt-0.5">
              Municipal Commissioner Decision & Dispatch Protocol
            </h3>
          </div>
        </div>

        {/* Status Lifecycle Badge */}
        <div className="flex items-center gap-2">
          {govStatus === 'UNREVIEWED' && (
            <span className="px-3 py-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-xs font-bold flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" /> Awaiting Commissioner Review
            </span>
          )}
          {govStatus === 'APPROVED' && (
            <span className="px-3 py-1.5 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full text-xs font-bold flex items-center gap-1.5">
              <UserCheck className="w-4 h-4" /> Approved by Municipal Authority
            </span>
          )}
          {govStatus === 'DISPATCHED' && (
            <span className="px-3 py-1.5 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full text-xs font-bold flex items-center gap-1.5">
              <Send className="w-4 h-4" /> Work Order Dispatched to Field
            </span>
          )}
          {govStatus === 'NOTIFIED' && (
            <span className="px-3 py-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Citizens Notified via Broadcast
            </span>
          )}
        </div>
      </div>

      {/* Decision Controls Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Official Notes & Department Assignment */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Official Department Assignment (Human Override Option)
            </label>
            <input
              type="text"
              value={departmentOwner}
              onChange={(e) => setDepartmentOwner(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Municipal Commissioner Direction & Review Notes
            </label>
            <textarea
              rows={3}
              value={officialNotes}
              onChange={(e) => setOfficialNotes(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Right Column: Workflow Action Buttons */}
        <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block mb-1">
              HUMAN DECISION ACTIONS
            </span>
            <p className="text-xs text-slate-400">
              AI provided evidence fusion. The final decision to approve budget and dispatch crews rests entirely with human authorities.
            </p>
          </div>

          <div className="space-y-2">
            {govStatus === 'UNREVIEWED' && (
              <button
                onClick={handleApprove}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
              >
                <UserCheck className="w-4 h-4" />
                <span>1. Approve AI Work Order & ₹18.5L Budget</span>
              </button>
            )}

            {(govStatus === 'APPROVED' || govStatus === 'UNREVIEWED') && (
              <button
                onClick={handleDispatch}
                disabled={govStatus === 'UNREVIEWED'}
                className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 transition-all disabled:opacity-40 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>2. Dispatch Work Order to Field Engineers</span>
              </button>
            )}

            <button
              onClick={handleSendBroadcast}
              disabled={govStatus === 'UNREVIEWED'}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all disabled:opacity-40 cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              <span>3. Broadcast Progress Update to 127 Citizens</span>
            </button>
          </div>
        </div>
      </div>

      {/* Broadcast Sent Toast Notification */}
      {showBroadcastSuccess && (
        <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl flex items-center gap-3 text-xs text-emerald-200 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <strong className="font-bold text-white block">CITIZEN FEEDBACK BROADCAST DISPATCHED!</strong>
            Simulated SMS/WhatsApp message sent to all 127 reporting citizens: <em>"Your voice mattered! Ward 17 drainage overhaul approved by Municipal Commissioner."</em>
          </div>
        </div>
      )}
    </div>
  );
}
