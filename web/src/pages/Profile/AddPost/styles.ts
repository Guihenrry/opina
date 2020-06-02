import styled, { css } from 'styled-components';

import Button from '../../../components/Button';

export const Title = styled.h1`
  ${({ theme }) => css`
    font-family: ${theme.fonts.heading};
    font-size: ${theme.sizes.md};
    margin-bottom: ${theme.sizes.lg};
  `}
`;

export const UploadContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  ${({ theme }) => css`
    gap: ${theme.sizes.md};
    margin-bottom: ${theme.sizes.lg};
  `}

  label:first-child {
    grid-column: 1/5;
  }

  @media screen and (max-width: 560px) {
    grid-template-columns: repeat(2, 1fr);
    label:first-child {
      grid-column: 1/3;
    }
  }
`;

export const Form = styled.form`
  max-width: 385px;
`;

export const Label = styled.label`
  font-weight: 700;
  display: block;

  ${({ theme }) => css`
    margin-bottom: ${theme.sizes.xs};
    margin-top: ${theme.sizes.sm};
  `}
`;

export const CategoriesList = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

export const Category = styled.li`
  ${({ theme }) => css`
    margin-right: ${theme.sizes.xs};
    margin-bottom: ${theme.sizes.xs};
  `}
`;

interface CategoryButtonProps {
  active?: number;
}

export const CategoryButton = styled.button<CategoryButtonProps>`
  ${({ theme, active }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    padding: ${theme.sizes.sm};
    background: ${theme.colors.backgroundMedium};
    border-radius: ${theme.sizes.xs};
    color: ${theme.colors.text};

    &::before {
      content: '';
      display: block;
      width: ${theme.sizes.xs};
      height: ${theme.sizes.xs};
      margin-right: ${theme.sizes.xs};
      border-radius: 50%;
      border: 2px solid ${theme.colors.text};
      background: ${active
        ? theme.colors.primary
        : theme.colors.backgroundMedium};
    }
  `}
`;

export const TextArea = styled.textarea`
  resize: none;
  ${({ theme }) => css`
    height: 150px;
    max-width: 100%;
    width: 100%;
    padding: ${theme.sizes.sm};
    border-radius: ${theme.sizes.xs};
    background: ${theme.colors.backgroundMedium};
    border: 2px solid ${theme.colors.backgroundMedium};
    color: ${theme.colors.text};

    &:focus {
      border-color: ${theme.colors.primary};
    }
  `}
`;

export const SubmitButton = styled(Button)`
  width: 100%;
  ${({ theme }) => css`
    margin-top: ${theme.sizes.m};
  `}
`;
