import styled, {
  css,
  keyframes,
  DefaultTheme,
  Keyframes,
} from 'styled-components';

import introBackgroundImg from '../../assets/intro-background.jpg';
import { hexToRGB } from '../../utils/colors';

function animationBlinkCursor(theme: DefaultTheme): Keyframes {
  return keyframes`
    from {
      border-right-color: ${hexToRGB(theme.colors.primary, 0.75)};
    }
    to {
      border-right-color: transparent;
    }
  `;
}

const animationHideCursor = keyframes`
  0% {
    border-right-color: transparent;
  }
  100% {
    border-right-color: transparent;
  }
`;

const animationTyping = keyframes`
  from {
    width: 0;
  }
  to {
    width: 58vw;
  }
`;
const animationColors = keyframes`
  0% {
    background-position: 0 50%
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

export const Intro = styled.section`
  position: relative;
  width: 100%;
  height: calc(100vh - 91px);
  background: #e8abfb url(${introBackgroundImg}) no-repeat center center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ theme }) => css`
    padding: ${theme.sizes.xs};
  `}

  &::before {
    content: '';
    display: block;
    background: linear-gradient(45deg, #3c5aa3, #ad91f2, #f0abfb, #c75af3);
    background-size: 300% 300%;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.5;
    pointer-events: none;
    animation: ${animationColors} 7s ease infinite;
  }
`;

export const IntroContent = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${({ theme }) => css`
    color: ${theme.colors.primary};
    margin-bottom: ${theme.sizes.xlg};
  `}
`;

export const IntroTitle = styled.h1`
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;

  ${({ theme }) => css`
    font-size: max(${theme.sizes.md}, 5vw);
    margin-bottom: ${theme.sizes.sm};
    border-right: 3px solid ${hexToRGB(theme.colors.primary, 0.75)};
    animation: ${animationBlinkCursor(theme)} 500ms steps(60) infinite normal,
      ${animationTyping} 4s steps(60) 0.6s normal both,
      ${animationHideCursor} 500ms 6s forwards;
  `}

  @media screen and (max-width: 660px) {
    animation: none;
    white-space: normal;
    overflow: inherit;
    border-right: none;
  }
`;

export const IntroLogo = styled.span`
  ${({ theme }) => css`
    font-family: ${theme.fonts.logo};
  `}
`;

export const IntroText = styled.p`
  max-width: max(500px, 40vw);
  text-align: center;

  ${({ theme }) => css`
    margin-bottom: ${theme.sizes.sm};
    font-size: max(${theme.sizes.sm}, 1.5vw);
  `}
`;

export const Filters = styled.section`
  max-width: 840px;
  margin: 0 auto;
  display: grid;
  grid-auto-flow: column;

  ${({ theme }) => css`
    gap: ${theme.sizes.xs};
    padding: ${theme.sizes.lg} ${theme.sizes.m};
  `}

  @media screen and (max-width: 730px) {
    grid-auto-flow: row;
    grid-template-columns: 1fr 1fr;

    > form {
      grid-column: 1/3;
    }
  }
  @media screen and (max-width: 400px) {
    grid-template-columns: 1fr;

    > form {
      grid-column: 1/2;
    }
  }
`;

interface CategoryButtonProps {
  active: number;
}

export const CategoryButton = styled.button<CategoryButtonProps>`
  border: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  ${({ theme, active }) => css`
    background: ${theme.colors.backgroundMedium};
    color: ${theme.colors.text};
    padding: ${theme.sizes.sm};
    border-radius: ${theme.sizes.xs};

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

export const Posts = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 0 auto;

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (max-width: 500px) {
    grid-template-columns: 1fr;
  }

  ${({ theme }) => css`
    max-width: ${theme.sizes.containerWidthPadding};
    gap: ${theme.sizes.md};
    padding: 0 ${theme.sizes.m} ${theme.sizes.lg} ${theme.sizes.m};
  `}
`;

export const Post = styled.article``;

export const PostInfo = styled.div`
  position: relative;

  &:hover > div {
    opacity: 1;
  }

  ${({ theme }) => css`
    margin-bottom: ${theme.sizes.xs};
  `}
`;

interface PostImageProps {
  image: string;
}

export const PostImage = styled.div<PostImageProps>`
  height: 290px;
  background: url('${(props) => props.image}') no-repeat center center;
  background-size: cover;

  ${({ theme }) => css`
    border-radius: ${theme.sizes.sm};
  `}
`;

export const PostDetail = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.4));
  transition: opacity 0.3s;
  opacity: 0;

  ${({ theme }) => css`
    padding: ${theme.sizes.sm};
    border-radius: 0 0 ${theme.sizes.sm} ${theme.sizes.sm};
  `}
`;

export const PostUser = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;

  ${({ theme }) => css`
    > span {
      color: ${theme.colors.textLight};
      margin-left: ${theme.sizes.xs};
    }
  `}
`;

export const PostOpinions = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;

  ${({ theme }) => css`
    color: ${theme.colors.textLight};
    > svg {
      margin-right: ${theme.sizes.xs};
    }
  `}
`;

export const PostTitle = styled.h1`
  font-weight: 400;

  ${({ theme }) => css`
    font-size: ${theme.sizes.sm};
    color: ${theme.colors.text};
  `}
`;

export const TextNullstate = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.textMedium};
    text-align: center;
    margin-bottom: ${theme.sizes.xlg};
  `}
`;
