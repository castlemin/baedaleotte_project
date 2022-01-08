import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

interface Props {
  serviceStatic?: boolean;
}

const linkCSS = css`
  background-color: #fd7555;
  color: white;
  text-decoration: none;
  font-size: 16px;
  border-radius: 4px;
  padding: 12px 20px;
  border: none;
  cursor: pointer;

  &:hover {
    transition: ease-in-out 200ms;
    padding: 11px 18px;
    font-weight: bold;
    font-size: 17px;
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
  top: 0;
  z-index: 100;
`;

export const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  height: 100%;
  text-decoration: none;
  > svg {
    height: 40px;
  }
`;

export const LogoTitle = styled.div`
  color: white;
  margin-left: 5px;
  font-size: 23px;
  font-weight: bold;
`;

/* 해당 링크 페이지에 따라 밑줄 위치가 이동하는 식으로 구현한다. */
export const LinkContainer = styled.div``;

export const LeaderLink = styled.button`
  ${linkCSS}
`;

export const FrontendLink = styled.button`
  ${linkCSS}
`;

export const BackendLink = styled.button`
  ${linkCSS}
`;
export const DA1Link = styled.button`
  ${linkCSS}
`;
export const DA2Link = styled.button`
  ${linkCSS}
`;
