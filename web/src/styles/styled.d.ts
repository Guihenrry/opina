import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;

    colors: {
      main: string;
      background: string;

      text: string;
      textLight: string;
      textMedium: string;

      border: string;
    };

    sizes: {
      container: string;
      xxs: string;
      xs: string;
      sm: string;
      m: string;
      md: string;
      lg: string;
      xlg: string;
    };
  }
}
