import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';

import Button from '../../components/Button';
import signBackgroundImg from '../../assets/sign-background.jpg';

export const Wrapper = styled.section`
  height: calc(100vh - 100px);
  background: url(${signBackgroundImg}) no-repeat right;
  background-size: 50%;

  ${({ theme }) => css`
    padding: ${theme.sizes.m};
  `}
`;

export const Container = styled.div`
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${({ theme }) => css`
    max-width: ${theme.sizes.container};
  `}
`;

export const Title = styled.h1`
  ${({ theme }) => css`
    font-family: ${theme.fonts.heading};
    font-size: ${theme.sizes.md};
    margin-bottom: ${theme.sizes.xs};
  `}
`;

export const Subtitle = styled.p`
  font-weight: 300;

  ${({ theme }) => css`
    margin-bottom: ${theme.sizes.lg};
  `}
`;

export const Navigation = styled.div`
  display: flex;
  max-width: 384px;

  ${({ theme }) => css`
    border-bottom: 2px solid ${theme.colors.muted};
    margin-bottom: ${theme.sizes.m};
  `}
`;

export const NavigationLink = styled(NavLink)`
  display: block;
  padding-bottom: 8px;
  margin-bottom: -2px;

  & + a {
    margin-left: ${(props) => props.theme.sizes.m};
  }

  &.active {
    border-bottom: 2px solid ${(props) => props.theme.colors.primary};
  }

  ${({ theme }) => css`
    color: ${theme.colors.text};
  `}
`;

export const Form = styled.form`
  width: 100%;
  max-width: 384px;
`;

export const SubmitButton = styled(Button)`
  width: 100%;

  ${({ theme }) => css`
    margin-top: ${theme.sizes.m};
  `}
`;
