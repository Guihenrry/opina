import styled, { css } from 'styled-components';

export const Container = styled.article`
  ${({ theme }) => css`
    position: relative;
    display: grid;
    grid-template-columns: ${theme.sizes.md} 1fr;
    gap: ${theme.sizes.xs};

    padding-top: ${theme.sizes.sm};

    & + article {
      margin-top: ${theme.sizes.sm};
      border-top: 1px solid ${theme.colors.muted};
    }
  `}
`;

export const Info = styled.div`
  display: grid;
  ${({ theme }) => css`
    gap: ${theme.sizes.sm};
  `}
`;

export const Username = styled.strong`
  ${({ theme }) => css`
    font-weight: 400;
  `}
`;

export const Text = styled.p`
  width: 90%;
  font-size: 0.875rem;
  line-height: 1.7;
`;

export const DateCreated = styled.time`
  ${({ theme }) => css`
    font-size: 0.75rem;
    color: ${theme.colors.textMedium};
  `}
`;

export const ActionsContainer = styled.div`
  ${({ theme }) => css`
    position: absolute;
    top: ${theme.sizes.sm};
    right: 0;
  `}
`;

export const ActionsButton = styled.button`
  ${({ theme }) => css`
    width: ${theme.sizes.m};
    height: ${theme.sizes.m};
    display: flex;
    align-items: center;
    border: none;
    background: none;

    > svg {
      width: ${theme.sizes.m};
      height: ${theme.sizes.m};
      color: ${theme.colors.textMedium};
    }
  `}
`;

interface ActionsProps {
  show: number;
}

export const Actions = styled.div<ActionsProps>`
  ${({ theme, show }) => css`
    position: absolute;
    right: 0;
    top: calc(100% + ${theme.sizes.xxs});
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3);
    background: ${theme.colors.background};
    transition: opacity 0.3s;
    opacity: ${show ? 1 : 0};
    visibility: ${show ? 'visible' : 'hidden'};
  `}
`;

export const Action = styled.button`
  ${({ theme }) => css`
    background: none;
    border: none;
    display: flex;
    color: ${theme.colors.textMedium};
    padding: ${theme.sizes.xs};

    transition: color 0.3s;

    &:hover {
      color: ${theme.colors.text};
    }

    &:first-child {
      padding-bottom: ${theme.sizes.xxs};
    }

    & + button {
      padding-top: ${theme.sizes.xxs};
    }

    svg {
      margin-right: ${theme.sizes.xs};
    }
  `}
`;

export const EditForm = styled.form``;

export const EditTextarea = styled.textarea`
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
    margin-bottom: ${theme.sizes.xs};

    &:focus {
      border-color: ${theme.colors.primary};
    }
  `}
`;

export const EditActions = styled.div`
  display: flex;
  justify-content: flex-end;
`;
