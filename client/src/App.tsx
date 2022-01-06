import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home-page/HomePage.component';
import PreferenceHome from './pages/service-page/preference-page/PreferenceHome.component';
import ServiceStartPage from './pages/service-page/start-page/ServiceStartPage.component';
import TeamHome from './pages/home-page/team-page/TeamPage.component';
import RegionalHome from './pages/service-page/regional-page/regional-home/RegionalHome.component';
import RegionalShopsPage from './pages/service-page/regional-page/regional-shops/RegionalShopsPage.component';
import RegionalReportPage from './pages/service-page/regional-page/regional-report/RegionalReportPage.components';
import RegionalCategoryPage from './pages/service-page/regional-page/regional-category/RegionalCategoryPage.component';
import Error404 from './components/UI/Error/404.error';

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
        <Route
          path='/service/regional/categories'
          element={<RegionalCategoryPage />}
        />
        <Route
          path='/service/regional/shop_list'
          element={<RegionalShopsPage />}
        />
        <Route path='/service/preference' element={<PreferenceHome />} />
        <Route path='/team' element={<TeamHome />} />
        <Route path='/*' element={<Error404 />} />
      </Routes>
    </>
  );
};

export default App;
