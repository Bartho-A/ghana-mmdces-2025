import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-brand">
          <span role="img" aria-label="Ghana Flag">🇬🇭</span> 
          Ghana MMDCEs 2025
        </div>
        
        <div className={`nav-links ${isOpen ? 'open' : ''}`}>
          <NavLink 
            to="/" 
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
          <NavLink 
            to="/directory" 
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            onClick={() => setIsOpen(false)}
          >
            Directory
          </NavLink>
          <NavLink 
            to="/map" 
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            onClick={() => setIsOpen(false)}
          >
            Map
          </NavLink>
        </div>

        <button 
          className="mobile-menu-btn" 
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
