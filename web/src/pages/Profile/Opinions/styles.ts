import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export const Title = styled.h1`
  ${({ theme }) => css`
    font-family: ${theme.fonts.heading};
    font-size: ${theme.sizes.md};
    margin-bottom: ${theme.sizes.lg};
  `}
`;

export const Opinion = styled.article`
  ${({ theme }) => css`
    display: grid;
    align-items: start;
    grid-template-columns: 1fr 1fr;
    gap: ${theme.sizes.md};
    & + article {
      margin-top: ${theme.sizes.md};
      padding-top: ${theme.sizes.md};
      border-top: 1px solid ${theme.colors.muted};
    }

    @media screen and (max-width: 600px) {
      grid-template-columns: 1fr;
      gap: ${theme.sizes.m};
    }
  `}
`;

export const PostLink = styled(Link)``;

export const PostImage = styled.img`
  ${({ theme }) => css`
    border-radius: ${theme.sizes.sm};
  `}
`;

export const OpinionInfo = styled.div`
  ${({ theme }) => css`
    display: grid;
    gap: ${theme.sizes.sm};
  `}
`;

export const PostTitle = styled.h2`
  ${({ theme }) => css`
    font-family: ${theme.fonts.heading};
    font-size: ${theme.sizes.m};
  `}
`;

export const OpinionText = styled.p`
  font-size: 0.875rem;
  line-height: 1.5;
`;

export const OpinionCreatedAt = styled.time`
  font-size: 0.687rem;

  ${({ theme }) => css`
    color: ${theme.colors.textMedium};
  `}
`;

export const TextNullstate = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.textMedium};
  `}
`;
