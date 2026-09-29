import React, { useState } from 'react';
import { HelpCircle, Sparkles, Code2, Cpu, Globe2, MapPin, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function ExplainableAiDrawer({ hotspot, onClose }) {
  const [activeStage, setActiveStage] = useState(1);

  const stages = [
    {
      id: 1,
      title: 'Multilingual NLU & Audio Parsing',
      icon: '🌐',
      description: 'Gemini converts citizen inputs across 4 regional languages (Hindi, Punjabi, Tamil, English) into standardized semantic representations.',
      codeSnippet: `// Gemini 2.5 Flash Input Normalization
const parsedInput = await gemini.analyze({
  text: "Har baar baarish mein road pe paani...",
  inputLanguage: "hi",
  detectEntities: true
});
// Output: { category: "Infrastructure & Drainage", intent: "Water Stagnation" }`
    },
    {
      id: 2,
      title: 'Entity & Corridor Geo-Tagging',
      icon: '📍',
      description: 'Extracted spatial anchors (St. Mary’s School, MG Road Junction, Ward 17) mapped onto municipal GIS coordinates.',
      codeSnippet: `// Entity Extractor
entities: ["St. Mary's Senior Secondary", "MG Road Junction", "Ward 17"],
coordinates: { lat: 28.6139, lng: 77.2090 }`
    },
    {
      id: 3,
      title: 'Haversine Spatial Corridor Clustering',
      icon: '📐',
      description: 'Geo-clustering algorithm evaluates pairwise report distances within a 800-meter corridor window.',
      codeSnippet: `// Haversine Distance Calculation
const distanceMeters = getDistanceMeters(cmpA, cmpB);
if (distanceMeters <= 800 && cmpA.category === cmpB.category) {
  addToCluster("hotspot-1");
}`
    },
    {
      id: 4,
      title: 'Cross-Lingual Semantic Similarity',
      icon: '🧠',
      description: 'Cross-lingual embeddings connect Hindi "paani bhar jata hai" with Punjabi "paani khad janda hai" as 94% identical civic intent.',
      codeSnippet: `// Cross-Lingual Embedding Vector Cosine Similarity
similarityScore("paani bhar jaata hai", "paani khad janda hai") => 0.9412`
    },
    {
      id: 5,
      title: 'Critical Infrastructure Risk Boosting',
      icon: '⚡',
      description: 'Proximity to vulnerable assets (St. Mary’s School, Community Clinic) applies a +25% risk score weight.',
      codeSnippet: `// Risk Score Calculator
baseRisk = 64;
if (nearSchool || nearHospital) baseRisk += 25; // Final Risk: 89/100 (HIGH)`
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full p-6 md:p-8 shadow-2xl space-y-6 relative my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-500/20 text-indigo-400 rounded-2xl border border-indigo-500/30">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
                Gemini 2.5 Flash Transparency Engine
              </span>
              <h3 className="text-xl font-extrabold text-white">
                Explainable AI Reasoning Trace
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 text-sm font-bold p-2 rounded-xl hover:bg-slate-800"
          >
            ✕
          </button>
        </div>

        {/* Overview Banner */}
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
          <p>
            <strong className="text-white">Why did Gemini cluster 127 complaints into Hotspot #1?</strong> CivicPulse AI operates as an explainable decision-support engine. Below is the step-by-step logic trace showing how unstructured raw inputs were synthesized into structured municipal intelligence.
          </p>
        </div>

        {/* Stage Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {stages.map((stg) => (
            <button
              key={stg.id}
              onClick={() => setActiveStage(stg.id)}
              className={`shrink-0 px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeStage === stg.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>{stg.icon}</span>
              <span>Stage {stg.id}</span>
            </button>
          ))}
        </div>

        {/* Active Stage Deep Dive */}
        {stages.find((s) => s.id === activeStage) && (
          <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-extrabold text-indigo-300 flex items-center gap-2">
                <span>{stages[activeStage - 1].icon}</span>
                <span>Stage {activeStage}: {stages[activeStage - 1].title}</span>
              </h4>
              <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                Verified Stage Output
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {stages[activeStage - 1].description}
            </p>

            {/* Code / Logic Trace Box */}
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-slate-200 overflow-x-auto">
              <div className="flex items-center justify-between text-[10px] text-slate-500 mb-2 font-sans">
                <span className="flex items-center gap-1"><Code2 className="w-3.5 h-3.5 text-indigo-400" /> Gemini System Trace Log</span>
                <span>JSON Schema Output</span>
              </div>
              <pre className="text-indigo-300/90 whitespace-pre-wrap">{stages[activeStage - 1].codeSnippet}</pre>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex justify-between items-center border-t border-slate-800 pt-4">
          <span className="text-[10px] text-slate-500 font-mono">
            Auditable AI Decision Support • 100% Explainable Architecture
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/30 cursor-pointer"
          >
            Close Reasoning Trace
          </button>
        </div>
      </div>
    </div>
  );
}
