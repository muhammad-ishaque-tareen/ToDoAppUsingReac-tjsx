import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';
import SearchResults from './pages/SearchResults'; 
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ContactUs from './pages/ContactUs';
import Login from './pages/Login';
import About from './pages/About';
import TermsAndConditions from './pages/TermsAndConditions';
import DashBoard from './pages/DashBoard';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />      
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/search/:term" element={<SearchResults />} />
        <Route path="/terms-condition" element={<TermsAndConditions />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
