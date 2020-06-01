import styled, { css } from 'styled-components';

export const Title = styled.h1`
  ${({ theme }) => css`
    font-family: ${theme.fonts.heading};
    font-size: ${theme.sizes.md};
  `}
`;
