import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/homepage/HomePage.component';
import PreferenceHome from './pages/preference/PreferencePage.component';
import RegionalHome from './pages/regional/RegionalPage.component';
import ServiceStartPage from './pages/service-start/ServiceStartPage.component';
import TeamHome from './pages/team-page/TeamPage.component';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/service' element={<ServiceStartPage />} />
        <Route path='/service/regional' element={<RegionalHome />} />
        <Route path='/service/preference' element={<PreferenceHome />} />
        <Route path='/team' element={<TeamHome />} />
      </Routes>
    </>
  );
};

export default App;
