import styled, { css } from 'styled-components';

export const Wrapper = styled.button`
  border: none;
  position: relative;

  ${({ theme }) => css`
    width: ${theme.sizes.lg};
    height: ${theme.sizes.m};
    border-radius: ${theme.sizes.xs};
    background: ${theme.colors.backgroundMedium};
  `}
`;

export const Circle = styled.div`
  border-radius: 50%;
  transition: all 0.3s;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  ${({ theme }) => css`
    width: ${theme.sizes.sm};
    height: ${theme.sizes.sm};
    left: ${theme.title === 'light' ? '4px' : 'calc(100% - 20px)'};
    background: ${theme.title === 'light'
      ? theme.colors.textMedium
      : theme.colors.primary};
  `}
`;
