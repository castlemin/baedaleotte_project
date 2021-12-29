import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const linkCSS = css`
  background-color: #f35434;
  color: white;
  text-decoration: none;
  font-size: 16px;
  border-radius: 4px;
  padding: 12px 20px;
  margin: 0 12px 0 0;
  box-shadow: 1px 2px 1px 1px crimson;
`;

export const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  height: 100%;
  text-decoration: none;
  > svg {
    height: 40px;
  }

  > div {
    color: white;
    margin-left: 5px;
    font-size: 20px;
    font-weight: bold;
  }
`;

export const HeaderContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  background-color: #fd7555;
  align-items: center;
  height: 60px;
`;

export const LinkContainer = styled.div``;

export const RegionalLink = styled(Link)`
  ${linkCSS}
`;

export const PreferenceLink = styled(Link)`
  ${linkCSS}
`;

export const TeamLink = styled(Link)`
  ${linkCSS}
`;
