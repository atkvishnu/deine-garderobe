import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavigationContainer = styled.div`
    height: 100px;
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

export const LogoContainer = styled(Link)`
    background: none;
    height: 100px;
    width: 100px;
    padding: 25px;
    &:hover {
      cursor: pointer;
      -webkit-animation:spin 0.5s linear infinite;
      -moz-animation:spin 0.5s linear infinite;
      animation:spin 0.5s linear infinite;
      @-moz-keyframes spin { 100% { -moz-transform: rotate(-360deg); } }
      @-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
      @keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
    }
`;

export const NavLinks = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 10px;
`;

export const NavLink = styled(Link)`
    padding: 20px 25px;
    cursor: pointer;
    user-select: none;
`;