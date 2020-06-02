import styled, { css } from 'styled-components';

import Button from '../../../components/Button';

export const Title = styled.h1`
  ${({ theme }) => css`
    font-family: ${theme.fonts.heading};
    font-size: ${theme.sizes.md};
    margin-bottom: ${theme.sizes.lg};
  `}

  @media screen and (max-width: 900px) {
    text-align: center;
  }
`;

export const AvatarUpload = styled.label`
  position: relative;
  width: 177px;
  height: 177px;
  display: block;
  cursor: pointer;

  ${({ theme }) => css`
    margin-bottom: ${theme.sizes.md};
  `}

  @media screen and (max-width: 900px) {
    margin-left: auto;
    margin-right: auto;
  }

  input {
    display: none;
  }
`;

export const Avatar = styled.img`
  border-radius: 50%;
`;

export const AvatarNullState = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transition: opacity 0.3s;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.6;
  }

  ${({ theme }) => css`
    border: 2px dashed ${theme.colors.textMedium};

    svg {
      width: ${theme.sizes.m};
      height: ${theme.sizes.m};
      color: ${theme.colors.textMedium};
    }
  `}
`;

export const AvatarIconCameraWrapper = styled.div`
  width: 40px;
  height: 40px;
  position: absolute;
  bottom: 0;
  right: 0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ theme }) => css`
    background: ${theme.colors.primary};
    color: ${theme.colors.textLight};
  `}
`;

export const Form = styled.form`
  max-width: 384px;

  ${({ theme }) => css`
    input[placeholder='E-mail'] {
      margin-bottom: ${theme.sizes.m};
    }
  `}

  @media screen and (max-width: 900px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

export const SubmitButton = styled(Button)`
  width: 100%;

  ${({ theme }) => css`
    margin-top: ${theme.sizes.m};
  `}
`;
