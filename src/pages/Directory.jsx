import React, { useState, useMemo } from 'react';
import FilterBar from '../components/FilterBar';
import DataTable from '../components/DataTable';
import Pagination from '../components/Pagination';
import DetailModal from '../components/DetailModal';
import { mmdceData } from '../data';

const PAGE_SIZE = 20;

const defaultFilters = {
  search: '',
  region: 'All Regions',
  assemblyType: 'All Types',
  gender: 'All',
  sort: 'Name (A–Z)',
  page: 1
};

const Directory = () => {
  const [filters, setFilters] = useState(defaultFilters);
  const [selectedMMDCE, setSelectedMMDCE] = useState(null);

  // Extract unique regions dynamically
  const regionsList = useMemo(() => {
    const list = [...new Set(mmdceData.map(d => d.region))];
    return list.sort((a, b) => a.localeCompare(b));
  }, []);

  const handleReset = () => {
    setFilters(defaultFilters);
  };

  const processedData = useMemo(() => {
    let result = mmdceData;

    // Filters
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(d => 
        d.name.toLowerCase().includes(q) || 
        d.district.toLowerCase().includes(q)
      );
    }
    if (filters.region !== 'All Regions') {
      result = result.filter(d => d.region === filters.region);
    }
    if (filters.assemblyType !== 'All Types') {
      result = result.filter(d => d.assemblyType === filters.assemblyType);
    }
    if (filters.gender !== 'All') {
      result = result.filter(d => d.gender === filters.gender);
    }

    // Sort
    result = [...result].sort((a, b) => {
      switch (filters.sort) {
        case 'Name (A–Z)': return a.name.localeCompare(b.name);
        case 'Name (Z–A)': return b.name.localeCompare(a.name);
        case 'Region': return a.region.localeCompare(b.region) || a.name.localeCompare(b.name);
        case 'District (A–Z)': return a.district.localeCompare(b.district);
        case 'Assembly Type': return a.assemblyType.localeCompare(b.assemblyType) || a.name.localeCompare(b.name);
        default: return 0;
      }
    });

    return result;
  }, [filters.search, filters.region, filters.assemblyType, filters.gender, filters.sort]);

  const totalPages = Math.ceil(processedData.length / PAGE_SIZE);
  
  const currentData = useMemo(() => {
    const start = (filters.page - 1) * PAGE_SIZE;
    return processedData.slice(start, start + PAGE_SIZE);
  }, [processedData, filters.page]);

  return (
    <div className="container">
      <h1 style={{ marginBottom: '1.5rem', fontSize: '2rem' }}>MMDCEs Directory</h1>
      
      <FilterBar 
        filters={filters} 
        setFilters={setFilters} 
        onReset={handleReset} 
        regions={regionsList} 
        totalResults={processedData.length}
      />
      
      <DataTable 
        data={currentData} 
        onRowClick={setSelectedMMDCE} 
      />
      
      <Pagination 
        currentPage={filters.page} 
        totalPages={totalPages} 
        onPageChange={(page) => setFilters(prev => ({ ...prev, page }))} 
      />
      
      <DetailModal 
        mmdce={selectedMMDCE} 
        onClose={() => setSelectedMMDCE(null)} 
      />
    </div>
  );
};

export default Directory;
