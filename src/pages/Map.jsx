import React, { useState, useMemo } from 'react';
import MapView from '../components/MapView';
import { mmdceData } from '../data';

const MapViewPage = () => {
  const [regionFilter, setRegionFilter] = useState('All Regions');
  const [assemblyFilter, setAssemblyFilter] = useState('All Types');

  const regionsList = useMemo(() => {
    const list = [...new Set(mmdceData.map(d => d.region))];
    return list.sort((a, b) => a.localeCompare(b));
  }, []);

  const filteredData = useMemo(() => {
    let result = mmdceData;
    if (regionFilter !== 'All Regions') {
      result = result.filter(d => d.region === regionFilter);
    }
    if (assemblyFilter !== 'All Types') {
      result = result.filter(d => d.assemblyType === assemblyFilter);
    }
    return result;
  }, [regionFilter, assemblyFilter]);

  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 120px)' }}>
      <h1 style={{ marginBottom: '1rem', fontSize: '2rem' }}>Map View</h1>
      
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <div style={{ flex: '1 1 200px' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.25rem' }}>Filter by Region</label>
          <select 
            value={regionFilter} 
            onChange={(e) => setRegionFilter(e.target.value)} 
            className="form-select"
          >
            <option value="All Regions">All Regions</option>
            {regionsList.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        
        <div style={{ flex: '1 1 200px' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.25rem' }}>Filter by Assembly Type</label>
          <select 
            value={assemblyFilter} 
            onChange={(e) => setAssemblyFilter(e.target.value)} 
            className="form-select"
          >
            <option value="All Types">All Types</option>
            <option value="Metropolitan">Metropolitan</option>
            <option value="Municipal">Municipal</option>
            <option value="District">District</option>
          </select>
        </div>
      </div>
      
      <div style={{ flex: 1, minHeight: '500px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
        <MapView data={filteredData} />
      </div>
    </div>
  );
};

export default MapViewPage;
