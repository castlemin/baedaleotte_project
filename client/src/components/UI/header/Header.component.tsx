import React from 'react';
import {
  HeaderContainer,
  RegionalLink,
  PreferenceLink,
  TeamLink,
  LogoContainer,
  LinkContainer,
} from './Header.styles';
import { ReactComponent as Logo } from '../../../assets/delivery.svg';

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <div>
        <LogoContainer to='/'>
          <Logo />
          <div>배달어때</div>
        </LogoContainer>
      </div>
      <LinkContainer>
        <RegionalLink to='/regional'>지역별</RegionalLink>
        <PreferenceLink to='/preference'>성향별</PreferenceLink>
        <TeamLink to='/team'>팀 소개</TeamLink>
      </LinkContainer>
    </HeaderContainer>
  );
};

export default Header;
