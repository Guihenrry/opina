import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: number;
  isFilled: number;
}

export const Container = styled.div<ContainerProps>`
  position: relative;

  & + div {
    margin-top: ${(props) => props.theme.sizes.xs};
  }

  > svg {
    position: absolute;
    left: 16px;
    top: 16px;
    width: 20px;
    height: 20px;
    color: ${(props) => props.theme.colors.textMedium};
    pointer-events: none;
  }

  svg ~ input {
    padding-left: 52px;
  }

  ${(props) =>
    (props.isFocused || props.isFilled) &&
    css`
      svg {
        color: ${props.theme.colors.primary};
      }
    `}
`;

interface InputProps {
  isErrored: string;
}

export const Input = styled.input<InputProps>`
  width: 100%;

  ${({ theme }) => css`
    padding: ${theme.sizes.sm};

    border-radius: ${theme.sizes.xs};
    background: ${theme.colors.backgroundMedium};
    border: 2px solid ${theme.colors.backgroundMedium};
    color: ${theme.colors.text};

    &::placeholder {
      color: ${theme.colors.textMedium};
    }
    &:focus {
      border-color: ${theme.colors.primary};
    }
  `}

  ${(props) =>
    props.isErrored &&
    css`
      padding-right: ${props.theme.sizes.lg};
    `}
`;

export const Error = styled.div`
  position: absolute;
  right: 16px;
  top: 16px;

  > svg {
    width: 20px;
    height: 20px;
    color: ${(props) => props.theme.colors.danger};
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;

export const ErrorTooltip = styled.span`
  position: absolute;
  left: 50%;
  width: 160px;
  transform: translateX(-50%);
  text-align: center;
  transition: opacity 0.3s;
  opacity: 0;
  visibility: hidden;

  ${({ theme }) => css`
    background: ${theme.colors.danger};
    padding: ${theme.sizes.xs};
    border-radius: ${theme.sizes.xs};
    bottom: calc(100% + ${theme.sizes.xs});
    color: ${theme.colors.textLight};
  `}

  &::before {
    content: '';
    border-style: solid;
    border-color: ${(props) => props.theme.colors.danger} transparent;
    border-width: 6px 6px 0 6px;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
  }
`;
