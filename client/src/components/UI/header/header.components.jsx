import {
  HeaderContainer,
  RegionalLink,
  PreferenceLink,
  TeamLink,
  LogoContainer,
} from './header.styles';
import { ReactComponent as Logo } from '../../../assets/delivery.svg';

const Header = () => {
  return (
    <HeaderContainer>
      <LogoContainer to='/'>
        <Logo />
      </LogoContainer>
      배달어때?
      <RegionalLink to='/regional'>지역별</RegionalLink>
      <PreferenceLink to='/preference'>성향별</PreferenceLink>
      <TeamLink to='/team'>팀소개</TeamLink>
    </HeaderContainer>
  );
};

export default Header;
