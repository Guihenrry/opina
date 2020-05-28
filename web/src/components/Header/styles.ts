import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export const Header = styled.header`
  ${({ theme }) => css`
    border-bottom: 1px solid ${theme.colors.border};
    background: ${theme.colors.background};
    padding: ${theme.sizes.m};
  `}
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;

  max-width: ${(props) => props.theme.sizes.container};
`;

export const Logo = styled.h1`
  font-family: Pacifico;
  font-weight: 400;

  ${({ theme }) => css`
    color: ${theme.colors.main};
    font-size: ${theme.sizes.m};
  `}
`;

export const SignWrrapper = styled.div``;

export const SignInLink = styled(Link)`
  font-weight: 700;
  transition: opacity 0.3s;
  :hover {
    opacity: 0.8;
  }

  ${({ theme }) => css`
    color: ${theme.colors.text};
    margin-right: ${theme.sizes.m};
  `}
`;
