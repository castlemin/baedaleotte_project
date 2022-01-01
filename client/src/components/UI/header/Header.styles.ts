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
  border: none;
  cursor: pointer;
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
    font-size: 23px;
    font-weight: bold;
  }
`;

export const HeaderContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  background-color: #fd7555;
  align-items: center;
  height: 65px;
  width: 100vw;
  position: fixed;
  z-index: 100;
`;

/* 해당 링크 페이지에 따라 밑줄 위치가 이동하는 식으로 구현한다. */
export const LinkContainer = styled.div``;

export const RegionalLink = styled.button`
  ${linkCSS}
`;

export const PreferenceLink = styled.button`
  ${linkCSS}
`;

export const TeamLink = styled.button`
  ${linkCSS}
`;
