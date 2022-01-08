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

interface Props {
  serviceStatic?: boolean;
  viewHeight?: any;
}

const Header: React.FC<Props> = ({ serviceStatic, viewHeight }) => {
  // const handleScroll = (position: number) => {
  //   window.scrollTo({ top: position, behavior: 'smooth' });
  // };
  return (
    <HeaderContainer serviceStatic={serviceStatic}>
      <div>
        <LogoContainer to='/'>
          <Logo />
          <div>배달어때</div>
        </LogoContainer>
      </div>
      <LinkContainer>
        <RegionalLink
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          메인
        </RegionalLink>
        <PreferenceLink
          onClick={() => {
            window.scrollTo({ top: viewHeight, behavior: 'smooth' });
          }}
        >
          서비스 소개
        </PreferenceLink>
        <TeamLink
          onClick={() => {
            window.scrollTo({ top: viewHeight * 2, behavior: 'smooth' });
          }}
        >
          팀 소개
        </TeamLink>
      </LinkContainer>
    </HeaderContainer>
  );
};

export default Header;
