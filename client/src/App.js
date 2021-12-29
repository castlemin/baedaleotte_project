import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import RegionalHome from './pages/regional/regionalPage.component';
import PreferenceHome from './pages/preference/preferencePage.component';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/regional' element={<RegionalHome />} />
      <Route path='/preference' element={<PreferenceHome />} />
    </Routes>
  );
}

export default App;
