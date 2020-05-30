import styled, { css, keyframes } from 'styled-components';

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Button = styled.button`
  border: none;
  font-weight: bold;
  transition: opacity 0.3s;
  :hover {
    opacity: 0.9;
  }
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ theme }) => css`
    border-radius: ${theme.sizes.xs};
    padding: ${theme.sizes.sm};
    color: ${theme.colors.textLight};
    background: ${theme.colors.primary};
  `}

  svg {
    animation: ${rotate} 2s linear infinite;
  }
`;
