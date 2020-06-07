import styled, { css } from 'styled-components';

import Avatar from '../../components/Avatar';

export const Container = styled.main``;

export const Header = styled.header`
  ${({ theme }) => css`
    border-bottom: 1px solid ${theme.colors.muted};
  `}
`;

export const HeaderContainer = styled.div`
  max-width: 848px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  ${({ theme }) => css`
    padding: ${theme.sizes.xlg} ${theme.sizes.m} ${theme.sizes.sm}
      ${theme.sizes.m};
  `}
`;

export const UserAvatar = styled(Avatar)`
  ${({ theme }) => css`
    width: ${theme.sizes.lg};
    height: ${theme.sizes.lg};
    margin-right: ${theme.sizes.sm};
  `}
`;

export const Title = styled.h1`
  ${({ theme }) => css`
    font-size: ${theme.sizes.m};
    font-family: ${theme.fonts.heading};
  `}
`;

export const Username = styled.p`
  font-weight: 300;
  ${({ theme }) => css`
    color: ${theme.colors.textMedium};
  `}
`;

export const Images = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  max-width: 848px;
  margin: 0 auto;

  img:nth-child(1) {
    grid-column: 1/5;
  }

  ${({ theme }) => css`
    padding: ${theme.sizes.m};
    gap: ${theme.sizes.md};
  `}

  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
    img:nth-child(1) {
      grid-column: 1/3;
    }
    ${({ theme }) => css`
      gap: ${theme.sizes.sm};
    `}
  }
`;

export const Image = styled.img`
  width: 100%;
  max-height: 540px;
  object-fit: contain;
  ${({ theme }) => css`
    border-radius: ${theme.sizes.sm};
  `}
`;

export const Content = styled.div`
  max-width: 848px;
  margin: 0 auto;
  display: flex;
  ${({ theme }) => css`
    padding: ${theme.sizes.m};
    margin-bottom: ${theme.sizes.lg};
  `}

  @media screen and (max-width: 740px) {
    flex-direction: column;
  }
`;

export const Comments = styled.section`
  flex: 1;
  ${({ theme }) => css`
    padding-right: ${theme.sizes.md};

    @media screen and (max-width: 740px) {
      padding-right: 0;
      order: 2;

      padding-top: ${theme.sizes.m};
      margin-top: ${theme.sizes.m};
      border-top: 1px solid ${theme.colors.muted};
    }

    > h2 {
      margin-bottom: ${theme.sizes.sm};
    }
  `}
`;

export const AddComment = styled.form`
  display: flex;

  ${({ theme }) => css`
    > div {
      flex: 1;
      margin-left: ${theme.sizes.xs};
    }

    margin-bottom: ${theme.sizes.sm};
  `}
`;

export const AddCommentTextarea = styled.textarea`
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

    & ~ button {
      margin-left: auto;
      margin-top: ${theme.sizes.xs};
    }
  `}
`;

export const Comment = styled.article`
  display: flex;

  ${({ theme }) => css`
    & + & {
      margin-top: ${theme.sizes.sm};
      padding-top: ${theme.sizes.sm};
      border-top: 1px solid ${theme.colors.muted};
    }

    > div {
      flex: 1;
      margin-left: ${theme.sizes.xs};
    }
  `}
`;

export const CommentAvatar = styled(Avatar)``;

export const CommentTitle = styled.h1`
  font-weight: 400;

  ${({ theme }) => css`
    font-size: ${theme.sizes.sm};
    margin-bottom: ${theme.sizes.sm};
  `}
`;

export const CommentText = styled.p`
  max-width: 90%;

  font-size: 0.875rem;
  line-height: 1.5rem;

  ${({ theme }) => css`
    margin-bottom: ${theme.sizes.sm};
  `}
`;

export const CommentDate = styled.time`
  font-size: 0.75rem;

  ${({ theme }) => css`
    color: ${theme.colors.textMedium};
  `}
`;

export const Aside = styled.aside`
  max-width: 280px;

  @media screen and (max-width: 740px) {
    max-width: 100%;
  }
`;

export const Subtitle = styled.h2`
  ${({ theme }) => css`
    font-family: ${theme.fonts.heading};
    font-size: ${theme.sizes.m};
    margin-bottom: ${theme.sizes.xs};
  `}
`;

export const Description = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.textMedium};
    line-height: ${theme.sizes.m};
  `}
`;
