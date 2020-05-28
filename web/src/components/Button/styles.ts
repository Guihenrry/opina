import styled, { css } from 'styled-components';

interface ButtonProps {
  fullWidth: number;
}

export const Button = styled.button<ButtonProps>`
  border: none;
  font-weight: bold;
  transition: opacity 0.3s;
  :hover {
    opacity: 0.9;
  }

  ${({ theme }) => css`
    border-radius: ${theme.sizes.xs};
    padding: ${theme.sizes.sm};
    color: ${theme.colors.textLight};
    background: ${theme.colors.main};
  `}

  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
    `}
`;
