import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, AlertTriangle, Layers, Activity } from 'lucide-react';

// Helper component to center map on hotspot selection
function MapRecenter({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 15, { duration: 1.5 });
    }
  }, [center, map]);
  return null;
}

// Custom Leaflet DivIcons
const createHotspotIcon = (severity) => {
  const color = severity === 'HIGH' ? '#ef4444' : severity === 'MEDIUM_HIGH' ? '#f97316' : '#eab308';
  return L.divIcon({
    className: 'custom-leaflet-hotspot-pin',
    html: `
      <div style="
        background: ${color};
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 3px solid #0f172a;
        box-shadow: 0 0 20px ${color};
        color: white;
        font-weight: bold;
        font-size: 14px;
      ">
        🔥
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  });
};

const createComplaintIcon = (inputType) => {
  const symbol = inputType === 'voice' ? '🎙️' : inputType === 'photo' ? '📷' : '📝';
  return L.divIcon({
    className: 'custom-leaflet-complaint-pin',
    html: `
      <div style="
        background: #1e293b;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #6366f1;
        box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
        font-size: 11px;
      ">
        ${symbol}
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });
};

export default function MapView({ hotspots, complaints, selectedHotspot, onSelectHotspot, onSelectComplaint }) {
  const defaultCenter = [28.6139, 77.2090];
  const activeCenter = selectedHotspot ? [selectedHotspot.lat, selectedHotspot.lng] : defaultCenter;

  return (
    <div className="glass-panel rounded-3xl overflow-hidden border border-slate-800 shadow-2xl relative h-[460px]">
      {/* Map Header Overlay */}
      <div className="absolute top-3 left-3 z-[400] glass-panel-light px-3 py-1.5 rounded-xl border border-slate-700/80 text-xs flex items-center gap-2">
        <Activity className="w-3.5 h-3.5 text-indigo-400" />
        <span className="font-bold text-slate-200">Ward 17 Spatial Civic Intelligence Map</span>
        <span className="px-2 py-0.5 bg-red-500/20 text-red-300 border border-red-500/30 rounded-full text-[10px] font-bold">
          {hotspots.length} Hotspots Active
        </span>
      </div>

      <MapContainer
        center={defaultCenter}
        zoom={14}
        scrollWheelZoom={true}
        className="w-full h-full z-[10]"
      >
        <MapRecenter center={activeCenter} />

        {/* CartoDB Dark Matter Tile Layer */}
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {/* Render Hotspot Radii & Pins */}
        {hotspots.map((hs) => (
          <React.Fragment key={hs.id}>
            <Circle
              center={[hs.lat, hs.lng]}
              radius={hs.radius || 500}
              pathOptions={{
                color: hs.severity === 'HIGH' ? '#ef4444' : '#f97316',
                fillColor: hs.severity === 'HIGH' ? '#ef4444' : '#f97316',
                fillOpacity: selectedHotspot?.id === hs.id ? 0.35 : 0.18,
                weight: selectedHotspot?.id === hs.id ? 3 : 1.5
              }}
              eventHandlers={{
                click: () => onSelectHotspot(hs)
              }}
            />
            <Marker
              position={[hs.lat, hs.lng]}
              icon={createHotspotIcon(hs.severity)}
              eventHandlers={{
                click: () => onSelectHotspot(hs)
              }}
            >
              <Popup className="custom-leaflet-popup">
                <div className="p-2 text-slate-900 font-sans max-w-[220px]">
                  <span className="text-[10px] font-bold text-red-600 block uppercase">COMMUNITY HOTSPOT</span>
                  <h4 className="font-bold text-xs">{hs.title}</h4>
                  <p className="text-[11px] text-slate-600 mt-1">{hs.reportCount} connected reports • {hs.affectedCorridorLength}</p>
                </div>
              </Popup>
            </Marker>
          </React.Fragment>
        ))}

        {/* Render Citizen Complaint Pins */}
        {complaints.map((cmp) => (
          <Marker
            key={cmp.id}
            position={[cmp.lat, cmp.lng]}
            icon={createComplaintIcon(cmp.inputType)}
            eventHandlers={{
              click: () => onSelectComplaint(cmp)
            }}
          >
            <Popup>
              <div className="p-2 text-slate-900 font-sans max-w-[200px]">
                <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                  <span>{cmp.citizenName}</span>
                  <span className="font-bold">{cmp.languageName}</span>
                </div>
                <p className="text-xs font-semibold text-slate-800 line-clamp-2">"{cmp.translation || cmp.rawInput}"</p>
                <div className="mt-1 text-[10px] text-indigo-700 font-bold">
                  {cmp.category}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
