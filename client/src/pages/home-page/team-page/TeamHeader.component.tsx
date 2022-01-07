import React from 'react';
import {
  HeaderContainer,
  RegionalLink,
  PreferenceLink,
  TeamLink,
  LogoContainer,
  LinkContainer,
} from './TeamHeader.styles';
import { ReactComponent as Logo } from '../../../assets/delivery.svg';

interface Props {
  serviceStatic?: boolean;
  viewHeight?: any;
}

const TeamHeader: React.FC<Props> = ({ serviceStatic, viewHeight }) => {
  // const handleScroll = (position: number) => {
  //   window.scrollTo({ top: position, behavior: 'smooth' });
  // };
  return (
    <HeaderContainer>
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
          팀 리더
        </RegionalLink>
        <PreferenceLink
          onClick={() => {
            window.scrollTo({ top: viewHeight, behavior: 'smooth' });
          }}
        >
          프론트엔드 개발자
        </PreferenceLink>
        <TeamLink
          onClick={() => {
            window.scrollTo({ top: viewHeight * 2, behavior: 'smooth' });
          }}
        >
          백엔드 개발자
        </TeamLink>
        <TeamLink
          onClick={() => {
            window.scrollTo({ top: viewHeight * 3, behavior: 'smooth' });
          }}
        >
          데이터 분석가
        </TeamLink>
      </LinkContainer>
    </HeaderContainer>
  );
};

export default TeamHeader;
