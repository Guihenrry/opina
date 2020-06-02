import styled, { css } from 'styled-components';

interface ContainerProps {
  draging: number;
  preview: string;
  small: number;
}

export const Container = styled.label<ContainerProps>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s;
  cursor: pointer;
  background-size: cover;

  input {
    display: none;
  }

  &:hover {
    opacity: 0.7;
  }

  ${({ theme, draging, preview, small }) => css`
    border: 2px dashed
      ${draging ? theme.colors.primary : theme.colors.textMedium};
    border-radius: ${theme.sizes.sm};
    background: url(${preview}) no-repeat center center;
    padding: ${theme.sizes.m};
    height: ${small ? 128 : 540}px;

    @media screen and (max-width: 560px) {
      height: ${small ? 128 : 340}px;
    }

    > div {
      display: ${preview ? 'none' : 'flex'};
      flex-direction: column;
      align-items: center;
      pointer-events: none;
    }

    svg {
      width: ${small ? 24 : 140}px;
      height: ${small ? 24 : 140}px;
      color: ${draging ? theme.colors.primary : theme.colors.muted};
    }

    p {
      text-align: center;
      display: ${small ? 'none' : 'block'};
      margin-top: ${theme.sizes.m};
      color: ${draging ? theme.colors.primary : theme.colors.text};
    }
  `}
`;
