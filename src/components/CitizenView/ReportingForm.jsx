import React, { useState } from 'react';
import { Mic, Image as ImageIcon, Send, MapPin, CheckCircle2, AlertTriangle, Layers, Globe2, Volume2, ArrowRight, Activity } from 'lucide-react';
import { SAMPLE_INPUTS, LANGUAGES } from '../../data/mockData';
import { parseCitizenReport } from '../../services/geminiService';
import { detectClusterMatch } from '../../services/clusteringEngine';

export default function ReportingForm({ currentLang, setCurrentLang, apiKey, hotspots, onComplaintSubmitted, onViewCommandCenter }) {
  const [inputType, setInputType] = useState('text'); // 'text' | 'voice' | 'photo'
  const [inputText, setInputText] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioTranscript, setAudioTranscript] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState(null);

  // Quick prompt filler
  const handleSelectSample = (sample) => {
    setInputText(sample.text);
    if (sample.inputType) setInputType(sample.inputType);
    if (sample.photoUrl) setSelectedPhoto(sample.photoUrl);
    if (sample.lang) setCurrentLang(sample.lang);
  };

  // Simulate Voice Recording
  const handleToggleRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
      setAudioTranscript('');
      setTimeout(() => {
        setAudioTranscript('Saade area vich har baarish ton baad sadak te paani khad janda hai, school jaana aukha ho gya hai.');
        setInputText('Saade area vich har baarish ton baad sadak te paani khad janda hai, school jaana aukha ho gya hai.');
        setIsRecording(false);
      }, 2500);
    } else {
      setIsRecording(false);
    }
  };

  // Handle Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const textToSubmit = inputType === 'voice' ? (audioTranscript || inputText) : inputText;
    if (!textToSubmit && !selectedPhoto) return;

    setIsSubmitting(true);

    try {
      const parsed = await parseCitizenReport({
        text: textToSubmit || 'Flooded road photo uploaded by citizen.',
        inputType,
        photoUrl: selectedPhoto,
        language: currentLang,
        apiKey
      });

      const newReport = {
        id: `cmp-${Date.now().toString().slice(-4)}`,
        citizenName: 'Anonymous Citizen',
        timestamp: 'Just now',
        inputType,
        language: currentLang,
        rawInput: textToSubmit || 'Photo report submitted',
        translation: parsed.translation || textToSubmit,
        lat: 28.6140 + (Math.random() - 0.5) * 0.003,
        lng: 77.2090 + (Math.random() - 0.5) * 0.003,
        ward: parsed.ward || 'Ward 17',
        category: parsed.category,
        severity: parsed.severity,
        status: 'Analyzing Cluster Proximity...',
        photoUrl: selectedPhoto,
        aiParsed: parsed
      };

      const clusterInfo = detectClusterMatch(newReport, hotspots);
      if (clusterInfo.matched) {
        newReport.status = `Grouped in Hotspot #${clusterInfo.hotspotId.split('-')[1]}`;
        newReport.hotspotId = clusterInfo.hotspotId;
      }

      setAiAnalysisResult({
        report: newReport,
        parsed,
        clusterInfo
      });

      onComplaintSubmitted(newReport);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeLangObj = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];

  return (
    <div className="max-w-xl mx-auto py-6 px-4 space-y-6">
      {/* Mobile Shell Frame */}
      <div className="civic-card p-6 border-slate-800 space-y-5 shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider">Citizen Reporting Portal</span>
            <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              Submit a Community Issue
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Your voice is automatically grouped into municipal community hotspots.
            </p>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1 bg-slate-900 rounded-md border border-slate-800 text-[11px] text-slate-300">
            <MapPin className="w-3 h-3 text-red-500" /> Ward 17, MG Road
          </div>
        </div>

        {/* Quick Sample Input Selector */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1 font-medium"><Globe2 className="w-3.5 h-3.5 text-sky-400" /> Multilingual Quick Examples:</span>
            <span className="text-[10px] text-sky-400">Click to fill</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {SAMPLE_INPUTS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => handleSelectSample(s)}
                className="shrink-0 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-left text-xs transition-colors"
              >
                <div className="font-semibold text-slate-200 flex items-center gap-1">
                  <span>{s.langName}</span>
                  <span className="text-[10px] text-slate-500">({s.inputType})</span>
                </div>
                <p className="text-[11px] text-slate-400 truncate max-w-[180px]">{s.text}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Input Mode Tabs */}
        <div className="grid grid-cols-3 gap-2 p-1 bg-slate-950 rounded-lg border border-slate-800">
          <button
            type="button"
            onClick={() => setInputType('text')}
            className={`py-2 px-3 rounded-md text-xs font-bold transition-all ${
              inputType === 'text'
                ? 'bg-sky-700 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            📝 Text Input
          </button>
          <button
            type="button"
            onClick={() => setInputType('voice')}
            className={`py-2 px-3 rounded-md text-xs font-bold transition-all ${
              inputType === 'voice'
                ? 'bg-sky-700 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            🎙️ Voice Mode
          </button>
          <button
            type="button"
            onClick={() => setInputType('photo')}
            className={`py-2 px-3 rounded-md text-xs font-bold transition-all ${
              inputType === 'photo'
                ? 'bg-sky-700 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            📷 Upload Photo
          </button>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* TEXT MODE */}
          {inputType === 'text' && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Describe the problem in {activeLangObj.native} ({activeLangObj.name})
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={4}
                placeholder="e.g. Har baar baarish mein road pe paani bhar jaata hai..."
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-sky-500 placeholder:text-slate-600 font-sans"
              />
            </div>
          )}

          {/* VOICE MODE */}
          {inputType === 'voice' && (
            <div className="space-y-3 py-4 text-center">
              <div className="relative inline-block">
                <button
                  type="button"
                  onClick={handleToggleRecord}
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                    isRecording
                      ? 'bg-red-600 text-white animate-pulse'
                      : 'bg-sky-700 hover:bg-sky-600 text-white'
                  }`}
                >
                  <Mic className="w-6 h-6" />
                </button>
              </div>
              <p className="text-xs font-semibold text-slate-300">
                {isRecording ? 'Listening & Transcribing...' : 'Tap Mic to Speak in your local language'}
              </p>
              {audioTranscript && (
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-left text-xs text-sky-300 font-mono">
                  <span className="text-[10px] text-slate-500 block mb-1">Transcript ({activeLangObj.name}):</span>
                  "{audioTranscript}"
                </div>
              )}
            </div>
          )}

          {/* PHOTO MODE */}
          {inputType === 'photo' && (
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-slate-300">Attach Photo</label>
              {selectedPhoto ? (
                <div className="relative rounded-lg overflow-hidden border border-slate-800 h-40">
                  <img src={selectedPhoto} alt="Issue evidence" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setSelectedPhoto(null)}
                    className="absolute top-2 right-2 px-2 py-1 bg-slate-900/90 text-slate-200 text-xs rounded border border-slate-700"
                  >
                    Remove Photo
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => setSelectedPhoto('https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=800&q=80')}
                  className="border border-dashed border-slate-800 hover:border-sky-500/50 rounded-lg p-5 text-center cursor-pointer bg-slate-950"
                >
                  <ImageIcon className="w-6 h-6 text-slate-500 mx-auto mb-1" />
                  <p className="text-xs font-medium text-slate-300">Click to upload photo or choose demo sample</p>
                </div>
              )}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || (!inputText && !selectedPhoto && inputType !== 'voice')}
            className="w-full py-3 bg-sky-700 hover:bg-sky-600 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-2 shadow-lg transition-all disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? (
              <span>Processing Report...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Citizen Report</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* CIVIC INTELLIGENCE FINDING CARD */}
      {aiAnalysisResult && (
        <div className="civic-card p-5 border-sky-600/40 space-y-4 animate-fade-in">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-sky-400" />
              <h3 className="text-sm font-bold text-slate-100">Civic Intelligence Finding</h3>
            </div>
            <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded text-xs font-bold">
              Parsed & Logged
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-2.5 bg-slate-950 rounded border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Category</span>
              <span className="text-slate-200 font-bold">{aiAnalysisResult.parsed.category}</span>
            </div>
            <div className="p-2.5 bg-slate-950 rounded border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Severity</span>
              <span className={`font-bold ${aiAnalysisResult.parsed.severity === 'High' ? 'text-red-400' : 'text-amber-400'}`}>
                {aiAnalysisResult.parsed.severity}
              </span>
            </div>
            <div className="p-2.5 bg-slate-950 rounded border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Pattern</span>
              <span className="text-slate-200 font-bold">{aiAnalysisResult.parsed.recurring ? 'Recurring Issue' : 'Isolated Event'}</span>
            </div>
            <div className="p-2.5 bg-slate-950 rounded border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Evidence Strength</span>
              <span className="text-sky-400 font-bold">{aiAnalysisResult.parsed.confidence}%</span>
            </div>
          </div>

          <div className="p-3 bg-slate-950 rounded border border-slate-800 text-xs">
            <span className="text-[10px] text-slate-400 block font-bold mb-1">ENGLISH TRANSLATION:</span>
            <p className="text-slate-300 italic">"{aiAnalysisResult.parsed.translation}"</p>
          </div>

          {aiAnalysisResult.clusterInfo?.matched ? (
            <div className="p-3 bg-red-950/60 border border-red-800 rounded text-xs text-red-300">
              Report automatically grouped into <strong className="text-white">{aiAnalysisResult.clusterInfo.hotspotTitle}</strong> ({aiAnalysisResult.clusterInfo.distanceMeters}m corridor match).
            </div>
          ) : (
            <div className="p-3 bg-slate-900 rounded text-xs text-slate-300">
              Logged in Ward 17 queue.
            </div>
          )}

          <button
            type="button"
            onClick={onViewCommandCenter}
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 border border-sky-500/40 text-sky-300 font-bold rounded text-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>View Community Intelligence Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
