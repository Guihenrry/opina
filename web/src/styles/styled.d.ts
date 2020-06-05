import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;

    colors: {
      primary: string;
      background: string;
      backgroundMedium: string;
      text: string;
      textLight: string;
      textMedium: string;
      muted: string;
      danger: string;
      success: string;
    };

    fonts: {
      logo: string;
      body: string;
      heading: string;
    };

    sizes: {
      container: string;
      containerWidthPadding: string;
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
