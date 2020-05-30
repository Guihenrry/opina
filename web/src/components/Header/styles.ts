import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export const Header = styled.header`
  ${({ theme }) => css`
    border-bottom: 1px solid ${theme.colors.muted};
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

  @media screen and (max-width: 370px) {
    flex-direction: column;
  }
`;

export const LogoLink = styled(Link)`
  font-weight: 400;

  ${({ theme }) => css`
    font-family: ${theme.fonts.logo};
    color: ${theme.colors.primary};
    font-size: ${theme.sizes.m};
  `}

  @media screen and (max-width: 370px) {
    ${({ theme }) => css`
      margin-bottom: ${theme.sizes.xs};
    `}
  }
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
`;

export const SignWrrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const SignInLink = styled(Link)`
  font-weight: 700;
  transition: opacity 0.3s;
  :hover {
    opacity: 0.8;
  }

  ${({ theme }) => css`
    color: ${theme.colors.text};
    margin-right: ${theme.sizes.m};
    margin-left: ${theme.sizes.m};
  `}
`;
