// CivicPulse AI - Mock Civic Data & Multilingual Prompts

export const LANGUAGES = [
  { code: 'en', name: 'English', native: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'Hindi', native: 'हिंदी', flag: '🇮🇳' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', native: 'मराठी', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు', flag: '🇮🇳' }
];

export const SAMPLE_INPUTS = [
  {
    id: 'sample-1',
    lang: 'hi',
    langName: 'Hindi',
    inputType: 'text',
    text: 'Har baar baarish mein road pe paani bhar jaata hai aur St. Mary school ke paas severe traffic jam ho jata hai.',
    translation: 'Every time it rains, water logs on the road and causes severe traffic jams near St. Mary school.',
    category: 'Infrastructure & Drainage',
    severity: 'High',
    ward: 'Ward 17'
  },
  {
    id: 'sample-2',
    lang: 'pa',
    langName: 'Punjabi',
    inputType: 'voice',
    text: 'Saade area vich har baarish ton baad sadak te paani khad janda hai, bachiyan nu school jaana bhot aukha ho gya hai.',
    translation: 'After every rain in our area, water accumulates on the road, making it very difficult for children to go to school.',
    category: 'Infrastructure & Drainage',
    severity: 'High',
    ward: 'Ward 17'
  },
  {
    id: 'sample-3',
    lang: 'en',
    langName: 'English',
    inputType: 'photo',
    text: 'Drainage overflow again on MG Road. Deep water pooling near the main junction block.',
    translation: 'Drainage overflow again on MG Road. Deep water pooling near the main junction block.',
    category: 'Infrastructure & Drainage',
    severity: 'High',
    ward: 'Ward 17',
    photoUrl: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'sample-4',
    lang: 'ta',
    langName: 'Tamil',
    inputType: 'text',
    text: 'மழை பெய்யும்போதெல்லாம் இந்த சாலையில் தண்ணீர் தேங்கி விடுகிறது, சாக்கடை அடைப்பு.',
    translation: 'Whenever it rains, water accumulates on this road due to drain blockage.',
    category: 'Infrastructure & Drainage',
    severity: 'High',
    ward: 'Ward 17'
  },
  {
    id: 'sample-5',
    lang: 'hi',
    langName: 'Hindi',
    inputType: 'text',
    text: 'Central market ke pass 3 din se kachra pada hai aur badboo a rahi hai.',
    translation: 'Garbage has been lying near Central Market for 3 days and foul smell is emanating.',
    category: 'Sanitation & Solid Waste',
    severity: 'Medium',
    ward: 'Ward 12'
  }
];

export const MOCK_HOTSPOTS = [
  {
    id: 'hotspot-1',
    title: 'Ward 17 Recurring Road + Drainage Corridor Failure',
    category: 'Infrastructure & Drainage',
    severity: 'HIGH',
    status: 'CRITICAL_ACTION_NEEDED',
    confidence: 91,
    reportCount: 127,
    affectedCorridorLength: '1.2 km',
    ward: 'Ward 17',
    lat: 28.6139,
    lng: 77.2090,
    radius: 600, // meters
    evidence: {
      textReports: 82,
      voiceReports: 22,
      imageReports: 23,
      topLanguages: ['Hindi (45%)', 'English (30%)', 'Punjabi (20%)', 'Tamil (5%)']
    },
    pattern: 'Recurring structural failure triggered after >15mm rainfall events.',
    contributingFactors: [
      'Blocked primary trunk stormwater line (Sub-surface inspection recommended)',
      'Asphalt subsidence and deep potholes near St. Mary’s School gate',
      'Inadequate catch-basin inlet capacity along 1.2km MG Road corridor'
    ],
    recommendedDepartment: 'Municipal Engineering & Stormwater Division',
    suggestedIntervention: 'Conduct holistic corridor overhaul: jet-clean 1.2km underground stormwater drain, reconstruct catch basins with debris grates, and re-pave school zone with permeable asphalt.',
    impactedPopulation: 18500,
    criticalFacilities: ['St. Mary’s Senior Secondary School', 'Ward 17 Community Health Center', 'Central Bus Junction'],
    estimatedBudget: 1850000, // ₹18.5 Lakhs
    aiActionBrief: {
      summary: 'High-density cluster of 127 citizen complaints over 30 days indicates an interconnected drainage-road structural breakdown rather than localized surface potholing.',
      urgency: 'Immediate action required before upcoming monsoon spell to prevent school evacuation and traffic paralysis.',
      departmentOwner: 'Department of Public Works & Urban Drainage',
      estimatedResolutionTime: '5-7 Days',
      riskScore: 89,
      roi: 'Reduces repeat emergency pumping calls by 94% and protects 18,500 residents.'
    }
  },
  {
    id: 'hotspot-2',
    title: 'Ward 12 Commercial Waste Accumulation & Vector Risk',
    category: 'Sanitation & Waste',
    severity: 'MEDIUM_HIGH',
    status: 'UNDER_REVIEW',
    confidence: 88,
    reportCount: 43,
    affectedCorridorLength: '0.5 km',
    ward: 'Ward 12',
    lat: 28.6250,
    lng: 77.2180,
    radius: 400,
    evidence: {
      textReports: 28,
      voiceReports: 5,
      imageReports: 10,
      topLanguages: ['Hindi (60%)', 'English (40%)']
    },
    pattern: 'Daily overflow peak between 4 PM - 8 PM behind commercial market.',
    contributingFactors: [
      'Irregular secondary collection truck dispatch times',
      'Illegal dumping by wholesale market vendors'
    ],
    recommendedDepartment: 'Department of Solid Waste Management',
    suggestedIntervention: 'Deploy 2 additional compactors during peak vendor hours and install 24x7 smart bin monitoring sensors.',
    impactedPopulation: 9200,
    criticalFacilities: ['Central Market Complex', 'Ward 12 Primary School'],
    estimatedBudget: 420000, // ₹4.2 Lakhs
    aiActionBrief: {
      summary: '43 reports highlight recurring waste pileup causing sanitation hazard near food stalls.',
      urgency: 'Medium - deploy extra fleet within 24 hours.',
      departmentOwner: 'Solid Waste Management Division',
      estimatedResolutionTime: '2 Days',
      riskScore: 68,
      roi: 'Prevents vector-borne health risks and clears 4.2 tons of daily uncollected waste.'
    }
  },
  {
    id: 'hotspot-3',
    title: 'Ward 18 Grid Streetlight Outage & Transit Safety Corridor',
    category: 'Public Safety & Power',
    severity: 'MEDIUM',
    status: 'DISPATCHED',
    confidence: 85,
    reportCount: 31,
    affectedCorridorLength: '0.8 km',
    ward: 'Ward 18',
    lat: 28.6050,
    lng: 77.1980,
    radius: 350,
    evidence: {
      textReports: 20,
      voiceReports: 8,
      imageReports: 3,
      topLanguages: ['English (50%)', 'Hindi (35%)', 'Punjabi (15%)']
    },
    pattern: 'Sequential dark spots along Metro feeder road after 8 PM.',
    contributingFactors: [
      'Feeder line transformer short circuit',
      'Vandalized junction box near foot overbridge'
    ],
    recommendedDepartment: 'Electrical & Street Lighting Bureau',
    suggestedIntervention: 'Repair main transformer breaker and replace 14 sodium lamps with smart LED fixtures.',
    impactedPopulation: 6400,
    criticalFacilities: ['Metro Station Gate 2', 'Girls Higher Secondary Hostel'],
    estimatedBudget: 280000, // ₹2.8 Lakhs
    aiActionBrief: {
      summary: '31 safety complaints linked to feeder line failure.',
      urgency: 'Medium - High priority for night safety.',
      departmentOwner: 'Electrical & Lighting Bureau',
      estimatedResolutionTime: '1-2 Days',
      riskScore: 62,
      roi: 'Restores night safety for 6,400 daily metro commuters.'
    }
  }
];

export const INITIAL_COMPLAINTS = [
  {
    id: 'cmp-101',
    citizenName: 'Rajesh Kumar',
    timestamp: '10 mins ago',
    inputType: 'text',
    language: 'hi',
    languageName: 'Hindi',
    rawInput: 'Har baar baarish mein road pe paani bhar jaata hai aur St. Mary school ke paas traffic jam ho jata hai.',
    translation: 'Every time it rains, water logs on the road and causes severe traffic jams near St. Mary school.',
    lat: 28.6142,
    lng: 77.2095,
    ward: 'Ward 17',
    category: 'Infrastructure & Drainage',
    severity: 'High',
    status: 'Grouped in Hotspot #1',
    hotspotId: 'hotspot-1',
    aiParsed: {
      issue: 'Recurring Road Waterlogging & Traffic Gridlock',
      category: 'Infrastructure & Drainage',
      severity: 'High',
      recurring: true,
      confidence: 94,
      department: 'Municipal Engineering & Stormwater Division',
      entities: ['Rainfall waterlogging', 'St. Mary School zone', 'Traffic jam']
    }
  },
  {
    id: 'cmp-102',
    citizenName: 'Gurpreet Singh',
    timestamp: '25 mins ago',
    inputType: 'voice',
    language: 'pa',
    languageName: 'Punjabi',
    rawInput: 'Saade area vich har baarish ton baad sadak te paani khad janda hai, bachiyan nu school jaana bhot aukha ho gya hai.',
    translation: 'After every rain in our area, water accumulates on the road, making it very difficult for children to go to school.',
    lat: 28.6135,
    lng: 77.2082,
    ward: 'Ward 17',
    category: 'Infrastructure & Drainage',
    severity: 'High',
    status: 'Grouped in Hotspot #1',
    hotspotId: 'hotspot-1',
    aiParsed: {
      issue: 'School Access Corridor Flooding',
      category: 'Infrastructure & Drainage',
      severity: 'High',
      recurring: true,
      confidence: 92,
      department: 'Municipal Engineering & Stormwater Division',
      entities: ['School access blocked', 'Post-rain water stagnation']
    }
  },
  {
    id: 'cmp-103',
    citizenName: 'Anita Sharma',
    timestamp: '1 hour ago',
    inputType: 'photo',
    photoUrl: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=800&q=80',
    language: 'en',
    languageName: 'English',
    rawInput: 'Drainage overflow again on MG Road near St. Marys. Deep water pooling over 1.5 feet.',
    translation: 'Drainage overflow again on MG Road near St. Marys. Deep water pooling over 1.5 feet.',
    lat: 28.6148,
    lng: 77.2101,
    ward: 'Ward 17',
    category: 'Infrastructure & Drainage',
    severity: 'High',
    status: 'Grouped in Hotspot #1',
    hotspotId: 'hotspot-1',
    aiParsed: {
      issue: 'Drainage Overflow & Submerged Roadway',
      category: 'Infrastructure & Drainage',
      severity: 'High',
      recurring: true,
      confidence: 96,
      department: 'Municipal Engineering & Stormwater Division',
      entities: ['1.5ft water pooling', 'MG Road junction', 'Drainage overflow']
    }
  },
  {
    id: 'cmp-104',
    citizenName: 'Karthik Subramanian',
    timestamp: '2 hours ago',
    inputType: 'text',
    language: 'ta',
    languageName: 'Tamil',
    rawInput: 'மழை பெய்யும்போதெல்லாம் இந்த சாலையில் தண்ணீர் தேங்கி விடுகிறது, சாக்கடை அடைப்பு.',
    translation: 'Whenever it rains, water accumulates on this road due to drain blockage.',
    lat: 28.6131,
    lng: 77.2088,
    ward: 'Ward 17',
    category: 'Infrastructure & Drainage',
    severity: 'High',
    status: 'Grouped in Hotspot #1',
    hotspotId: 'hotspot-1',
    aiParsed: {
      issue: 'Stormwater Drain Blockage',
      category: 'Infrastructure & Drainage',
      severity: 'High',
      recurring: true,
      confidence: 91,
      department: 'Municipal Engineering & Stormwater Division',
      entities: ['Rainwater logging', 'Sewer choke']
    }
  },
  {
    id: 'cmp-105',
    citizenName: 'Amit Verma',
    timestamp: '3 hours ago',
    inputType: 'text',
    language: 'hi',
    languageName: 'Hindi',
    rawInput: 'Central market ke pass 3 din se kachra pada hai aur badboo a rahi hai.',
    translation: 'Garbage has been lying near Central Market for 3 days and foul smell is emanating.',
    lat: 28.6252,
    lng: 77.2185,
    ward: 'Ward 12',
    category: 'Sanitation & Waste',
    severity: 'Medium',
    status: 'Grouped in Hotspot #2',
    hotspotId: 'hotspot-2',
    aiParsed: {
      issue: 'Commercial Garbage Accumulation',
      category: 'Sanitation & Waste',
      severity: 'Medium',
      recurring: true,
      confidence: 89,
      department: 'Department of Solid Waste Management',
      entities: ['Central Market dump', '3-day waste accumulation']
    }
  },
  {
    id: 'cmp-106',
    citizenName: 'Priya Mukherjee',
    timestamp: '4 hours ago',
    inputType: 'voice',
    language: 'bn',
    languageName: 'Bengali',
    rawInput: 'এই রাস্তায় ২ সপ্তাহ ধরে ড্রেনের মোড় নোংরা জলে ভরে আছে।',
    translation: 'The drain corner on this street has been overflowing with dirty water for 2 weeks.',
    lat: 28.6145,
    lng: 77.2075,
    ward: 'Ward 17',
    category: 'Infrastructure & Drainage',
    severity: 'High',
    status: 'Grouped in Hotspot #1',
    hotspotId: 'hotspot-1',
    aiParsed: {
      issue: 'Stagnant Drain Water & Hygiene Hazard',
      category: 'Infrastructure & Drainage',
      severity: 'High',
      recurring: true,
      confidence: 90,
      department: 'Municipal Engineering & Stormwater Division',
      entities: ['Dirty water stagnation', '2-week complaint history']
    }
  }
];
