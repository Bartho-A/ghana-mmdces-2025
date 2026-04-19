import React, { useMemo } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';

const REGION_COORDS = {
  'Ahafo Region': [7.0, -2.5],
  'Ashanti Region': [6.7, -1.6],
  'Bono Region': [7.7, -2.5],
  'Bono East Region': [7.8, -1.2],
  'Central Region': [5.5, -1.2],
  'Eastern Region': [6.3, -0.3],
  'Greater Accra Region': [5.6, -0.2],
  'North East Region': [10.5, -0.4],
  'Northern Region': [9.5, -1.0],
  'Oti Region': [8.0, 0.3],
  'Savannah Region': [9.0, -1.8],
  'Upper East Region': [10.7, -0.9],
  'Upper West Region': [10.5, -2.3],
  'Volta Region': [6.8, 0.4],
  'Western Region': [5.4, -2.2],
  'Western North Region': [6.7, -2.6]
};

// Simple pseudo-random generator based on ID so markers stay in the same place 
// on re-renders, rather than jumping around (jitter).
const pseudoRandom = (seed) => {
  let x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
};

const MapView = ({ data }) => {
  const getMarkerColor = (type) => {
    switch (type.toLowerCase()) {
      case 'metropolitan': return '#CE1126'; // Red
      case 'municipal': return '#F59E0B'; // Orange-gold
      case 'district': return '#006B3F'; // Green
      default: return '#6b7280';
    }
  };
  
  const getBadgeClass = (type) => {
    switch(type.toLowerCase()) {
      case 'metropolitan': return 'badge badge-metropolitan';
      case 'municipal': return 'badge badge-municipal';
      case 'district': return 'badge badge-district';
      default: return 'badge';
    }
  };

  const markers = useMemo(() => {
    return data.map((d) => {
      const baseCoords = REGION_COORDS[d.region] || [7.9465, -1.0232];
      
      // Jitter so they don't perfectly overlap, using their ID as a seed
      // Spread them by ~ 0.5 degrees lat/lng
      const jitterLat = (pseudoRandom(d.id * 13) - 0.5) * 0.5;
      const jitterLng = (pseudoRandom(d.id * 17) - 0.5) * 0.5;

      return {
        ...d,
        lat: baseCoords[0] + jitterLat,
        lng: baseCoords[1] + jitterLng
      };
    });
  }, [data]);

  return (
    <div style={{ height: '100%', width: '100%', position: 'relative' }}>
      <MapContainer 
        center={[7.9465, -1.0232]} 
        zoom={7} 
        style={{ height: '100%', width: '100%', borderRadius: 'var(--radius-md)', zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {markers.map(m => (
          <CircleMarker 
            key={m.id}
            center={[m.lat, m.lng]}
            pathOptions={{ 
              color: getMarkerColor(m.assemblyType), 
              fillColor: getMarkerColor(m.assemblyType),
              fillOpacity: 0.6,
              weight: 2
            }}
            radius={8}
          >
            <Popup>
              <div style={{ minWidth: '200px' }}>
                <h4 className={m.name === "(Nominee Pending)" ? 'pending-name' : ''} style={{ fontSize: '1.125rem', marginBottom: '0.25rem', color: 'var(--text-primary)', margin: 0 }}>
                  {m.name}
                </h4>
                <div style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: 500 }}>
                  {m.district}
                </div>
                <div style={{ marginBottom: '0.5rem' }}>{m.region}</div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span className={getBadgeClass(m.assemblyType)}>{m.assemblyType}</span>
                  <span style={{ fontWeight: 600 }}>
                    {m.gender === 'Female' ? <span className="gender-icon-female">♀</span> : m.gender === 'Male' ? <span className="gender-icon-male">♂</span> : <span className="gender-icon-unknown">?</span>}
                  </span>
                </div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
      
      {/* Legend */}
      <div className="card" style={{ position: 'absolute', bottom: '20px', right: '20px', zIndex: 1000, padding: '1rem', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
        <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem', textTransform: 'uppercase' }}>Assembly Type</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#CE1126' }}></div>
            <span style={{ fontSize: '0.875rem' }}>Metropolitan</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#F59E0B' }}></div>
            <span style={{ fontSize: '0.875rem' }}>Municipal</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#006B3F' }}></div>
            <span style={{ fontSize: '0.875rem' }}>District</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
