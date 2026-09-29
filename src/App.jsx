import React, { useState } from 'react';
import Navbar from './components/Navbar';
import OverviewScreen from './components/CommandCenter/OverviewScreen';
import HotspotCaseFile from './components/CommandCenter/HotspotCaseFile';
import MapView from './components/CommandCenter/MapView';
import DuplicateCluster from './components/CommandCenter/DuplicateCluster';
import BudgetSimulator from './components/CommandCenter/BudgetSimulator';
import ActionBriefModal from './components/CommandCenter/ActionBriefModal';
import ExplainableAiDrawer from './components/CommandCenter/ExplainableAiDrawer';
import ReportingForm from './components/CitizenView/ReportingForm';
import CitizenTracker from './components/CitizenView/CitizenTracker';
import DemoScenarioSwitcher from './components/DemoScenarioSwitcher';
import { MOCK_HOTSPOTS, INITIAL_COMPLAINTS } from './data/mockData';
import { generateExecutiveBrief } from './services/geminiService';

export default function App() {
  const [activeMode, setActiveMode] = useState('command'); // 'command' | 'citizen'
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'hotspots' | 'evidence' | 'priorities' | 'actions' | 'community' | 'trends'
  
  const [currentLang, setCurrentLang] = useState('hi');
  const [apiKey, setApiKey] = useState('');
  
  const [hotspots, setHotspots] = useState(MOCK_HOTSPOTS);
  const [complaints, setComplaints] = useState(INITIAL_COMPLAINTS);
  const [selectedHotspot, setSelectedHotspot] = useState(MOCK_HOTSPOTS[0]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const [citizenTab, setCitizenTab] = useState('report');

  const [showBriefModal, setShowBriefModal] = useState(false);
  const [briefData, setBriefData] = useState(null);
  const [showSimulator, setShowSimulator] = useState(false);
  const [showExplainableDrawer, setShowExplainableDrawer] = useState(false);

  // Handle new complaint submitted from Citizen View
  const handleComplaintSubmitted = (newReport) => {
    setComplaints([newReport, ...complaints]);
    
    if (newReport.hotspotId) {
      setHotspots(prev => prev.map(h => {
        if (h.id === newReport.hotspotId) {
          return {
            ...h,
            reportCount: h.reportCount + 1,
            evidence: {
              ...h.evidence,
              textReports: newReport.inputType === 'text' ? h.evidence.textReports + 1 : h.evidence.textReports,
              voiceReports: newReport.inputType === 'voice' ? h.evidence.voiceReports + 1 : h.evidence.voiceReports,
              imageReports: newReport.inputType === 'photo' ? h.evidence.imageReports + 1 : h.evidence.imageReports
            }
          };
        }
        return h;
      }));
    }
  };

  // Generate Situation Brief
  const handleGenerateBrief = async (hotspot) => {
    setSelectedHotspot(hotspot);
    const data = await generateExecutiveBrief(hotspot, apiKey);
    setBriefData(data);
    setShowBriefModal(true);
  };

  // Handle Demo Scenario Switch
  const handleSelectScenario = (scenarioId) => {
    const hs = hotspots.find(h => h.id === scenarioId);
    if (hs) {
      setSelectedHotspot(hs);
    }
  };

  const handleInvestigateHotspot = (hs) => {
    setSelectedHotspot(hs);
    setActiveTab('hotspots');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Header & Navigation */}
      <Navbar
        activeMode={activeMode}
        setActiveMode={setActiveMode}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentLang={currentLang}
        setCurrentLang={setCurrentLang}
        apiKey={apiKey}
        setApiKey={setApiKey}
      />

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 space-y-6">
        {/* CITIZEN PORTAL MODE */}
        {activeMode === 'citizen' && (
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="bg-slate-900 p-1 rounded-lg border border-slate-800 flex gap-1">
                <button
                  onClick={() => setCitizenTab('report')}
                  className={`px-4 py-2 rounded text-xs font-bold transition-all ${
                    citizenTab === 'report' ? 'bg-sky-700 text-white' : 'text-slate-400'
                  }`}
                >
                  📝 Submit Issue
                </button>
                <button
                  onClick={() => setCitizenTab('track')}
                  className={`px-4 py-2 rounded text-xs font-bold transition-all ${
                    citizenTab === 'track' ? 'bg-sky-700 text-white' : 'text-slate-400'
                  }`}
                >
                  🔍 Track Report
                </button>
              </div>
            </div>

            {citizenTab === 'report' ? (
              <ReportingForm
                currentLang={currentLang}
                setCurrentLang={setCurrentLang}
                apiKey={apiKey}
                hotspots={hotspots}
                onComplaintSubmitted={handleComplaintSubmitted}
                onViewCommandCenter={() => {
                  setActiveMode('command');
                  setActiveTab('overview');
                }}
              />
            ) : (
              <CitizenTracker complaints={complaints} hotspots={hotspots} />
            )}
          </div>
        )}

        {/* COMMAND CENTER DASHBOARD MODE */}
        {activeMode === 'command' && (
          <div className="space-y-6">
            {/* Demo Preset Scenario Bar */}
            <DemoScenarioSwitcher
              activeScenarioId={selectedHotspot?.id}
              onSelectScenario={handleSelectScenario}
            />

            {/* TAB 1: OVERVIEW ("What is happening?") */}
            {activeTab === 'overview' && (
              <OverviewScreen
                hotspot={selectedHotspot}
                hotspots={hotspots}
                onInvestigateHotspot={handleInvestigateHotspot}
                onViewMap={() => setActiveTab('hotspots')}
                onViewEvidence={() => setActiveTab('evidence')}
              />
            )}

            {/* TAB 2: HOTSPOTS ("Where are the problems?") */}
            {(activeTab === 'hotspots' || activeTab === 'priorities') && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <MapView
                      hotspots={hotspots}
                      complaints={complaints}
                      selectedHotspot={selectedHotspot}
                      onSelectHotspot={setSelectedHotspot}
                      onSelectComplaint={setSelectedComplaint}
                    />
                  </div>

                  {/* Hotspot List Sidebar */}
                  <div className="civic-card p-5 space-y-3">
                    <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                      Hotspot Directory ({hotspots.length})
                    </h3>
                    <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                      {hotspots.map((hs) => (
                        <div
                          key={hs.id}
                          onClick={() => setSelectedHotspot(hs)}
                          className={`p-3 rounded-lg border transition-colors cursor-pointer space-y-1 ${
                            selectedHotspot?.id === hs.id
                              ? 'bg-slate-800 border-sky-500/80'
                              : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${hs.severity === 'HIGH' ? 'bg-red-950 text-red-400' : 'bg-amber-950 text-amber-400'}`}>
                              {hs.severity}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">{hs.reportCount} Reports</span>
                          </div>
                          <h4 className="text-xs font-bold text-slate-100 line-clamp-1">{hs.title}</h4>
                          <p className="text-[11px] text-slate-400">{hs.ward} • {hs.affectedCorridorLength}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Hotspot Operational Case File */}
                <HotspotCaseFile
                  hotspot={selectedHotspot}
                  onGenerateBrief={handleGenerateBrief}
                  onOpenSimulator={(hs) => {
                    setSelectedHotspot(hs);
                    setShowSimulator(true);
                  }}
                  onOpenTrace={() => setShowExplainableDrawer(true)}
                />
              </div>
            )}

            {/* TAB 3: EVIDENCE ("What supports these findings?") */}
            {activeTab === 'evidence' && (
              <DuplicateCluster
                complaints={complaints}
                hotspots={hotspots}
                onSelectComplaint={setSelectedComplaint}
                onSelectHotspot={handleInvestigateHotspot}
              />
            )}

            {/* TAB 4: ACTIONS ("What should happen next?") */}
            {activeTab === 'actions' && (
              <HotspotCaseFile
                hotspot={selectedHotspot}
                onGenerateBrief={handleGenerateBrief}
                onOpenSimulator={(hs) => {
                  setSelectedHotspot(hs);
                  setShowSimulator(true);
                }}
                onOpenTrace={() => setShowExplainableDrawer(true)}
              />
            )}

            {/* TAB 5: COMMUNITY ("What are citizens reporting?") */}
            {activeTab === 'community' && (
              <CitizenTracker complaints={complaints} hotspots={hotspots} />
            )}

            {/* TAB 6: TRENDS ("What is changing?") */}
            {activeTab === 'trends' && (
              <OverviewScreen
                hotspot={selectedHotspot}
                hotspots={hotspots}
                onInvestigateHotspot={handleInvestigateHotspot}
                onViewMap={() => setActiveTab('hotspots')}
                onViewEvidence={() => setActiveTab('evidence')}
              />
            )}
          </div>
        )}
      </main>

      {/* Modals & Drawers */}
      {showBriefModal && (
        <ActionBriefModal
          hotspot={selectedHotspot}
          briefData={briefData}
          onClose={() => setShowBriefModal(false)}
        />
      )}

      {showSimulator && (
        <BudgetSimulator
          hotspot={selectedHotspot}
          onClose={() => setShowSimulator(false)}
        />
      )}

      {showExplainableDrawer && (
        <ExplainableAiDrawer
          hotspot={selectedHotspot}
          onClose={() => setShowExplainableDrawer(false)}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 py-4 px-6 text-center text-xs text-slate-500">
        CivicPulse • Community Intelligence Platform • Municipal Decision Support
      </footer>
    </div>
  );
}
