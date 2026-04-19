import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '1.5rem' }}>
      <button 
        className="btn-secondary" 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{ display: 'flex', alignItems: 'center', opacity: currentPage === 1 ? 0.5 : 1, cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
      >
        <ChevronLeft size={16} /> Previous
      </button>
      
      <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
        Page {currentPage} of {totalPages}
      </span>
      
      <button 
        className="btn-secondary" 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{ display: 'flex', alignItems: 'center', opacity: currentPage === totalPages ? 0.5 : 1, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
      >
        Next <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;
