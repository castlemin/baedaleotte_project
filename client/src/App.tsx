import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home-page/HomePage.component';
import PreferenceHome from './pages/service-page/preference-page/PreferenceHome.component';
import ServiceStartPage from './pages/service-page/start-page/ServiceStartPage.component';
import TeamHome from './pages/home-page/team-page/TeamPage.component';
import RegionalHome from './pages/service-page/regional-page/regional-home/RegionalHome.component';
import RegionalDeliveryShopsPage from './pages/service-page/regional-page/regional-shops/regional-delivery/delivery-shops/RegionalDeliveryShopsPage.component';
import RegionalEatOutShopsPage from './pages/service-page/regional-page/regional-shops/regional-eatout/eatout-shops/RegionalEatOutShopsPage.component';
import RegionalReportPage from './pages/service-page/regional-page/regional-report/RegionalReportPage.components';
import RegionalDeliveryCategoryPage from './pages/service-page/regional-page/regional-shops/regional-delivery/regional-delivery-category/RegionalDeliveryCategoryPage.component';
import RegionalEatOutCategoryPage from './pages/service-page/regional-page/regional-shops/regional-eatout/regional-eatout-category/RegionalEatOutCategory.component';
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
          path='/service/regional/delivery_categories'
          element={<RegionalDeliveryCategoryPage />}
        />
        <Route
          path='/service/regional/delivery_shop_list'
          element={<RegionalDeliveryShopsPage />}
        />
        <Route
          path='/service/regional/eatout_categories'
          element={<RegionalEatOutCategoryPage />}
        />
        <Route
          path='/service/regional/eatout_shop_list'
          element={<RegionalEatOutShopsPage />}
        />
        <Route path='/service/preference' element={<PreferenceHome />} />
        <Route path='/team' element={<TeamHome />} />
        <Route path='/*' element={<Error404 />} />
      </Routes>
    </>
  );
};

export default App;
