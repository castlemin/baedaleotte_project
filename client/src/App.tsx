import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home-page/HomePage.component';
import PreferenceHome from './pages/service/preference-page/PreferenceHome.component';
import RegionalHome from './pages/service/regional-page/RegionalHome.component';
import ServiceStartPage from './pages/service/ServiceStartPage.component';
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
