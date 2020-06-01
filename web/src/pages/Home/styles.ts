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

export const Space = styled.div`
  height: 1000px;
`;
