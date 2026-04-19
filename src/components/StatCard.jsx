import React from 'react';

const StatCard = ({ title, value, accentColor }) => {
  return (
    <div className="card" style={{ flex: '1 1 200px', borderLeft: `6px solid ${accentColor}` }}>
      <h3 style={{ fontSize: '0.875rem', textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
        {title}
      </h3>
      <p style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>
        {value}
      </p>
    </div>
  );
};

export default StatCard;
