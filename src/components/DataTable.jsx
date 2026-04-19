import React from 'react';

const DataTable = ({ data, onRowClick }) => {
  const getBadgeClass = (type) => {
    switch(type.toLowerCase()) {
      case 'metropolitan': return 'badge badge-metropolitan';
      case 'municipal': return 'badge badge-municipal';
      case 'district': return 'badge badge-district';
      default: return 'badge';
    }
  };

  const renderGenderIcon = (gender) => {
    if (gender === 'Female') return <span className="gender-icon-female" title="Female">♀</span>;
    if (gender === 'Male') return <span className="gender-icon-male" title="Male">♂</span>;
    return <span className="gender-icon-unknown" title="Unknown">?</span>;
  };

  if (data.length === 0) {
    return (
      <div className="card text-center" style={{ padding: '3rem' }}>
        <p style={{ color: 'var(--text-secondary)' }}>No results match your current filters.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>District / Assembly</th>
            <th>Assembly Type</th>
            <th>Region</th>
            <th style={{ textAlign: 'center' }}>Gender</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={row.id} onClick={() => onRowClick(row)}>
              <td style={{ color: 'var(--text-secondary)' }}>{row.id}</td>
              <td className={row.name === "(Nominee Pending)" ? 'pending-name' : ''} style={{ fontWeight: 500 }}>
                {row.name}
              </td>
              <td>{row.district}</td>
              <td>
                <span className={getBadgeClass(row.assemblyType)}>{row.assemblyType}</span>
              </td>
              <td>{row.region}</td>
              <td style={{ textAlign: 'center', fontSize: '1.25rem' }}>
                {renderGenderIcon(row.gender)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
