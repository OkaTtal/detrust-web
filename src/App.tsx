import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './Navbar';
import  IntroPage  from './IntroPage';
import MyTrustPage from './MyTrustPage';

function App() {
  return (
    <Router>
      <div style={{ backgroundColor: '#0e0e0e', minHeight: '100vh', color: '#fff' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<IntroPage />} />
          <Route path="/DeTrust" element={<IntroPage />} />
          <Route path="/我的信托" element={<MyTrustPage />} />
          {/* <Route path="/vote" element={<VotePage />} />
          <Route path="/charts" element={<ChartsPage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
