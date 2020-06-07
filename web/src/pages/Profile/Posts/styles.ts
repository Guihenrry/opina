import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export const Title = styled.h1`
  ${({ theme }) => css`
    font-family: ${theme.fonts.heading};
    font-size: ${theme.sizes.md};
    margin-bottom: ${theme.sizes.lg};
  `}
`;

export const Post = styled.article`
  display: flex;

  & + article {
    ${({ theme }) => css`
      margin-top: ${theme.sizes.md};
      padding-top: ${theme.sizes.md};
      border-top: 1px solid ${theme.colors.muted};
    `}
  }

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

export const PostLink = styled(Link)`
  width: 50%;
  align-self: flex-start;
  ${({ theme }) => css`
    margin-right: ${theme.sizes.md};
  `}

  @media screen and (max-width: 600px) {
    width: 100%;
    margin-right: 0;

    ${({ theme }) => css`
      margin-bottom: ${theme.sizes.sm};
    `}
  }
`;

export const PostImage = styled.img`
  width: 100%;

  ${({ theme }) => css`
    border-radius: ${theme.sizes.sm};
  `}
`;

export const PostInfo = styled.div`
  position: relative;
  flex: 1;
`;

export const PostTitle = styled.h1`
  line-height: 1;
  ${({ theme }) => css`
    font-family: ${theme.fonts.heading};
    font-size: ${theme.sizes.m};
    margin-bottom: ${theme.sizes.xxs};
  `}
`;

export const Category = styled.span`
  font-size: 0.687rem;
  ${({ theme }) => css`
    margin-bottom: ${theme.sizes.md};
    display: block;
    color: ${theme.colors.textMedium};

    @media screen and (max-width: 600px) {
      margin-bottom: ${theme.sizes.sm};
    }
  `}
`;

export const Description = styled.p`
  font-size: 0.875rem;
  line-height: 1.5;

  ${({ theme }) => css`
    color: ${theme.colors.textMedium};
    margin-bottom: ${theme.sizes.sm};
  `}
`;

export const CreatedAt = styled.time`
  font-size: 0.687rem;

  ${({ theme }) => css`
    color: ${theme.colors.textMedium};
  `}
`;

export const DeleteButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  border: none;
  background: none;

  ${({ theme }) => css`
    color: ${theme.colors.textMedium};
    width: ${theme.sizes.m};
    height: ${theme.sizes.m};
  `}
`;

export const TextNullstate = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.textMedium};
  `}
`;
