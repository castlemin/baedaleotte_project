import React from 'react';
import Header from '../../components/UI/header/Header.component';
import { TitleContainer } from './PreferencePage.styles';

const PreferenceHome: React.FC = () => {
  return (
    <div>
      <Header />
      <TitleContainer>성향별 테스트 페이지입니다.</TitleContainer>
    </div>
  );
};

export default PreferenceHome;
