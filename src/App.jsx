import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Directory from './pages/Directory';
import MapViewPage from './pages/Map';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/directory" element={<Directory />} />
            <Route path="/map" element={<MapViewPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
