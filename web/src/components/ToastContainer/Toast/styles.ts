import styled, { css, keyframes } from 'styled-components';
import { hexToRGB } from '../../../utils/colors';

const progressAnimation = keyframes`
  0% {
    width: 100%;
  }
  100% {
    width: 0%;
  }
`;

const appearFromRight = keyframes`
  0% {
    transform: translateX(376px);
  }
  100% {
    transform: translateX(0);
  }
`;

interface ContainerProps {
  type: 'info' | 'success' | 'error';
}

export const Container = styled.li<ContainerProps>`
  position: relative;
  display: flex;
  align-items: center;
  max-width: 376px;
  box-shadow: 0px 16px 32px rgba(0, 0, 0, 0.08);
  animation: ${appearFromRight} 0.3s;

  ${({ theme }) => css`
    background: ${theme.colors.background};
    padding: ${theme.sizes.m};

    & + li {
      margin-top: ${theme.sizes.sm};
    }
  `}

  svg {
    color: ${({ type, theme }) => {
      switch (type) {
        case 'error':
          return theme.colors.danger;
        case 'info':
          return theme.colors.primary;
        case 'success':
          return theme.colors.success;
        default:
          return theme.colors.primary;
      }
    }};
    width: 32px;
    height: 32px;
  }

  &::before {
    content: '';
    display: block;
    width: 100%;
    height: 4px;
    background: ${({ type, theme }) => {
      switch (type) {
        case 'error':
          return hexToRGB(theme.colors.danger, 0.2);
        case 'info':
          return hexToRGB(theme.colors.primary, 0.2);
        case 'success':
          return hexToRGB(theme.colors.success, 0.2);
        default:
          return hexToRGB(theme.colors.primary, 0.2);
      }
    }};
    position: absolute;
    bottom: 0;
    left: 0;
  }
  &::after {
    content: '';
    animation: ${progressAnimation} 3s linear forwards;
    display: block;
    width: 100%;
    height: 4px;
    background: ${({ type, theme }) => {
      switch (type) {
        case 'error':
          return theme.colors.danger;
        case 'info':
          return theme.colors.primary;
        case 'success':
          return theme.colors.success;
        default:
          return theme.colors.primary;
      }
    }};
    position: absolute;
    bottom: 0;
    left: 0;
  }
`;

export const Content = styled.div`
  ${({ theme }) => css`
    margin-left: ${theme.sizes.sm};
    padding-left: ${theme.sizes.sm};
    border-left: 1px solid ${theme.colors.muted};
  `}
`;

export const Title = styled.strong`
  display: block;

  ${({ theme }) => css`
    margin-bottom: ${theme.sizes.xs};
    font-family: ${theme.fonts.heading};
  `}
`;

export const Description = styled.p``;

export const ButtonClose = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;

  ${({ theme }) => css`
    svg {
      width: ${theme.sizes.sm};
      height: ${theme.sizes.sm};
      color: ${theme.colors.textMedium};
    }
  `}
`;
