import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const btnAttr = css`
  background-color: #fd7555;
`;

const linkCSS = css`
  ${btnAttr}
  color: white;
  text-decoration: none;
  border-radius: 4px;
  padding: 8px 20px;
  height: 70%;
`;

export const LogoContainer = styled(Link)`
  height: 80%;
  width: 40px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #f35434;
  align-items: center;
`;

export const RegionalLink = styled(Link)`
  ${linkCSS}
`;

export const PreferenceLink = styled(Link)`
  ${linkCSS}
`;

export const TeamLink = styled(Link)`
  ${linkCSS}
`;
