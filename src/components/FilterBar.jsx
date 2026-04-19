import React from 'react';
import { Search, X } from 'lucide-react';

const FilterBar = ({ filters, setFilters, onReset, regions, totalResults }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value, page: 1 })); // reset to page 1 on filter change
  };

  return (
    <div className="card mb-4" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: '1 1 250px', position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleChange}
            placeholder="Search name or district..."
            className="form-input"
            style={{ paddingLeft: '2.5rem' }}
          />
        </div>
        
        <div style={{ flex: '1 1 150px' }}>
          <select name="region" value={filters.region} onChange={handleChange} className="form-select">
            <option value="All Regions">All Regions</option>
            {regions.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        <div style={{ flex: '1 1 150px' }}>
          <select name="assemblyType" value={filters.assemblyType} onChange={handleChange} className="form-select">
            <option value="All Types">All Types</option>
            <option value="Metropolitan">Metropolitan</option>
            <option value="Municipal">Municipal</option>
            <option value="District">District</option>
          </select>
        </div>

        <div style={{ flex: '1 1 120px' }}>
          <select name="gender" value={filters.gender} onChange={handleChange} className="form-select">
            <option value="All">All Genders</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>
        </div>

        <div style={{ flex: '1 1 160px' }}>
          <select name="sort" value={filters.sort} onChange={handleChange} className="form-select">
            <option value="Name (A–Z)">Sort: Name (A–Z)</option>
            <option value="Name (Z–A)">Sort: Name (Z–A)</option>
            <option value="Region">Sort: Region</option>
            <option value="District (A–Z)">Sort: District (A–Z)</option>
            <option value="Assembly Type">Sort: Assembly Type</option>
          </select>
        </div>

        <button onClick={onReset} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <X size={16} /> Reset
        </button>
      </div>
      <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
        Showing <strong>{totalResults}</strong> MMDCEs
      </div>
    </div>
  );
};

export default FilterBar;
