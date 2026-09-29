// CivicPulse AI - Geo-Clustering & Pattern Fusion Engine

/**
 * Calculates distance between two (lat, lng) points in meters (Haversine formula)
 */
export function getDistanceMeters(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

/**
 * Checks similarity between a new report and existing hotspots/complaints
 */
export function detectClusterMatch(newReport, hotspots) {
  const MATCH_RADIUS_METERS = 800; // 800m corridor clustering window

  for (const hotspot of hotspots) {
    const dist = getDistanceMeters(newReport.lat, newReport.lng, hotspot.lat, hotspot.lng);

    // Check distance and category match
    if (dist <= MATCH_RADIUS_METERS) {
      const isCategorySimilar =
        hotspot.category.toLowerCase().includes(newReport.category.toLowerCase()) ||
        newReport.category.toLowerCase().includes(hotspot.category.toLowerCase()) ||
        (newReport.category.includes('Drainage') && hotspot.category.includes('Drainage'));

      if (isCategorySimilar) {
        return {
          matched: true,
          hotspotId: hotspot.id,
          hotspotTitle: hotspot.title,
          distanceMeters: Math.round(dist),
          confidenceScore: Math.min(98, 88 + Math.round((1 - dist / MATCH_RADIUS_METERS) * 10))
        };
      }
    }
  }

  return { matched: false, hotspotId: null };
}
