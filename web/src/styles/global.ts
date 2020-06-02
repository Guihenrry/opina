import { createGlobalStyle, css } from 'styled-components';

export default createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 100%;
  }

  body {
    -webkit-font-smoothing: antialiased;

    ${({ theme }) => css`
      color: ${theme.colors.text};
      background: ${theme.colors.background};
    `}
  }

  body, input, button, textarea {

    ${({ theme }) => css`
      font-family: ${theme.fonts.body};
      font-size: ${theme.sizes.sm};
    `}
  }

  button {
    cursor: pointer;
  }

  img {
    display: block;
    max-width: 100%;
  }

  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
  }
`;
