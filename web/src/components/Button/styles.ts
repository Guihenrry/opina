import styled, { css, keyframes } from 'styled-components';

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

interface ButtonProps {
  secondary: number;
}

export const Button = styled.button<ButtonProps>`
  border: none;
  font-weight: bold;
  transition: opacity 0.3s;
  :hover {
    opacity: 0.9;
  }
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ theme, secondary }) => css`
    border-radius: ${theme.sizes.xs};
    padding: ${theme.sizes.sm};
    color: ${secondary ? theme.colors.primary : theme.colors.textLight};
    background: ${secondary ? 'transparent' : theme.colors.primary};
    &:disabled {
      background: ${theme.colors.backgroundMedium};
      color: ${theme.colors.textMedium};
    }
  `}

  svg {
    animation: ${rotate} 2s linear infinite;
  }
`;
