import styled, { css, keyframes } from 'styled-components';

const dots = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(30px);
  }
`;

export const Circle = styled.div`
  border-radius: 50%;
  animation: ${dots} 0.6s cubic-bezier(0.6, 0.1, 1, 0.4) infinite alternate;

  ${({ theme }) => css`
    & + div {
      margin-left: ${theme.sizes.xs};
    }
    width: ${theme.sizes.xs};
    height: ${theme.sizes.xs};
    background: ${theme.colors.primary};
  `}
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;

  ${({ theme }) => css`
    margin: ${theme.sizes.xlg};
  `}

  ${Circle}:nth-child(1) {
    animation-delay: 0.1s;
  }
  ${Circle}:nth-child(2) {
    animation-delay: 0.2s;
  }
  ${Circle}:nth-child(3) {
    animation-delay: 0.3s;
  }
  ${Circle}:nth-child(4) {
    animation-delay: 0.4s;
  }
`;
