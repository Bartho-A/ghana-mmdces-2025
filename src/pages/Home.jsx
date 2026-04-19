import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { mmdceData } from '../data';
import StatCard from '../components/StatCard';
import RegionBarChart from '../components/RegionBarChart';
import GenderDonutChart from '../components/GenderDonutChart';
import { Users } from 'lucide-react';

const Home = () => {
  const stats = useMemo(() => {
    let female = 0;
    let male = 0;
    let unknown = 0;
    const regions = new Set();
    
    mmdceData.forEach(d => {
      if (d.gender === 'Female') female++;
      else if (d.gender === 'Male') male++;
      else unknown++;
      
      regions.add(d.region);
    });

    return {
      total: mmdceData.length,
      female,
      male,
      regions: regions.size
    };
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section style={{ backgroundColor: 'var(--card-bg)', padding: '5rem 1.5rem', textAlign: 'center', borderBottom: '1px solid var(--border-color)', marginBottom: '3rem' }}>
        <div className="container">
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🇬🇭</div>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Ghana MMDCEs</h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontStyle: 'italic' }}>
            Metropolitan, Municipal and District Chief Executives
          </p>
        </div>
      </section>

      <div className="container">
        {/* KPI Row */}
        <section style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '3rem' }}>
          <StatCard title="Total MMDCEs" value={stats.total} accentColor="var(--ghana-gold)" />
          <StatCard title="Female Appointees" value={stats.female} accentColor="#db2777" />
          <StatCard title="Male Appointees" value={stats.male} accentColor="#3b82f6" />
          <StatCard title="Regions" value={stats.regions} accentColor="var(--ghana-green)" />
        </section>

        {/* Charts Section */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '3rem' }}>
          <div style={{ width: '100%' }}>
            <RegionBarChart />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
             <GenderDonutChart />
             
             {/* CTA Box */}
             <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '3rem', backgroundColor: '#006B3F', color: 'white' }}>
                <h3 style={{ fontSize: '2rem', color: 'white', marginBottom: '1rem' }}>Explore the Data</h3>
                <p style={{ marginBottom: '2rem', fontSize: '1.125rem', opacity: 0.9 }}>
                  Filter, search, and browse the complete directory of all 261 appointed MMDCEs across the country.
                </p>
                <Link to="/directory" className="btn-secondary" style={{ backgroundColor: 'var(--ghana-gold)', color: 'var(--text-primary)', border: 'none', padding: '1rem 2rem', fontSize: '1.125rem', boxShadow: 'var(--shadow-md)' }}>
                  <Users size={20} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'text-bottom' }}/> 
                  Browse Directory
                </Link>
             </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
