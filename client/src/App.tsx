import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home-page/HomePage.component';
import PreferenceHome from './pages/service/preference-page/PreferenceHome.component';
import ServiceStartPage from './pages/service/ServiceStartPage.component';
import TeamHome from './pages/team-page/TeamPage.component';
import RegionalHome from './pages/service/regional-page/regional-home/RegionalHome.component';
import RegionalShopsPage from './pages/service/regional-page/regionalshops/RegionalShopsPage.component';
import RegionalReportPage from './pages/service/regional-page/regional-report/RegionalReportPage.components';
import GraphContainer from './components/UI/Graphs/Graph';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/service' element={<ServiceStartPage />} />
        <Route path='/service/regional' element={<RegionalHome />} />
        <Route
          path='/service/regional/report'
          element={<RegionalReportPage />}
        />
        <Route path='/service/preference' element={<PreferenceHome />} />
        <Route path='/team' element={<TeamHome />} />
        <Route path='/team/1' element={<GraphContainer />} />
        <Route
          path='/service/reginal/shop_list'
          element={<RegionalShopsPage />}
        />
      </Routes>
    </>
  );
};

export default App;
