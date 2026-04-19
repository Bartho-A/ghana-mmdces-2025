import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const DetailModal = ({ mmdce, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!mmdce) return null;

  const getBadgeClass = (type) => {
    switch(type.toLowerCase()) {
      case 'metropolitan': return 'badge badge-metropolitan';
      case 'municipal': return 'badge badge-municipal';
      case 'district': return 'badge badge-district';
      default: return 'badge';
    }
  };

  const handleOutsideClick = (e) => {
    if (e.target.className === 'modal-overlay') {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOutsideClick}>
      <div className="modal-content" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={24} />
        </button>
        
        <h2 id="modal-title" className={mmdce.name === "(Nominee Pending)" ? 'pending-name' : ''} style={{ marginBottom: '0.5rem', fontSize: '1.75rem' }}>
          {mmdce.name}
        </h2>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <span className={getBadgeClass(mmdce.assemblyType)}>{mmdce.assemblyType}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 500 }}>
             {mmdce.gender === 'Female' ? <span className="gender-icon-female">♀ Female</span> : mmdce.gender === 'Male' ? <span className="gender-icon-male">♂ Male</span> : <span className="gender-icon-unknown">? Unknown</span>}
          </span>
        </div>
        
        <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)', fontWeight: 600, letterSpacing: '0.05em' }}>Region</div>
            <div style={{ fontSize: '1.125rem', fontWeight: 500 }}>{mmdce.region}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)', fontWeight: 600, letterSpacing: '0.05em' }}>District / Assembly</div>
            <div style={{ fontSize: '1.125rem', fontWeight: 500 }}>{mmdce.district}</div>
          </div>
        </div>
        
        <div style={{ padding: '1rem', backgroundColor: '#F9FAFB', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', fontSize: '0.875rem', color: 'var(--text-secondary)', fontStyle: 'italic', textAlign: 'center' }}>
          Appointed MMDCE
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
