import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/homepage/HomePage.component';
import RegionalHome from './pages/regional/RegionalPage.component';
import PreferenceHome from './pages/preference/PreferencePage.component';
import TeamHome from './pages/team-page/TeamPage.component';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/regional' element={<RegionalHome />} />
      <Route path='/preference' element={<PreferenceHome />} />
      <Route path='/team' element={<TeamHome />} />
    </Routes>
  );
}

export default App;
