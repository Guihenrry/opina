import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Container = styled.div`
  margin: 0 auto;
  display: flex;

  ${({ theme }) => css`
    max-width: ${theme.sizes.container};
    padding: ${theme.sizes.xlg} ${theme.sizes.m};
  `}

  @media screen and (max-width: 900px) {
    flex-direction: column;
  }
`;

export const Navigation = styled.nav`
  ${({ theme }) => css`
    margin-right: ${theme.sizes.xlg};
    padding-right: ${theme.sizes.xlg};
    border-right: 1px solid ${theme.colors.muted};

    @media screen and (max-width: 900px) {
      border-right: 0;
      border-bottom: 1px solid ${theme.colors.muted};
      margin: 0 0 ${theme.sizes.md};
      padding: 0 0 ${theme.sizes.md};
    }
  `}
`;

export const NavigationList = styled.ul``;

export const NavigationItem = styled.li`
  ${({ theme }) => css`
    & + li {
      margin-top: ${theme.sizes.xs};
    }
  `}
`;

export const NavigationLink = styled(NavLink)`
  max-width: 100%;
  width: 280px;
  font-weight: 700;
  display: flex;
  justify-content: space-between;

  ${({ theme }) => css`
    border-radius: ${theme.sizes.xxs};
    padding: ${theme.sizes.sm};
    background: ${theme.colors.backgroundMedium};
    border-left: 4px solid ${theme.colors.backgroundMedium};
    color: ${theme.colors.textMedium};

    &.active {
      border-left-color: ${theme.colors.primary};
    }
  `};

  @media screen and (max-width: 900px) {
    width: 100%;
  }
`;

export const SignOutButton = styled.button`
  max-width: 100%;
  width: 280px;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  border: none;

  ${({ theme }) => css`
    border-radius: ${theme.sizes.xxs};
    padding: ${theme.sizes.sm};
    background: ${theme.colors.backgroundMedium};
    border-left: 4px solid ${theme.colors.backgroundMedium};
    color: ${theme.colors.danger};
  `};

  @media screen and (max-width: 900px) {
    width: 100%;
  }
`;

export const Content = styled.main`
  flex: 1;
`;
