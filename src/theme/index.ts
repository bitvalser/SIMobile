export interface AppTheme {
  pallette: {
    primary: `#${string}`;
    secondary: `#${string}`;
    background: `#${string}`;
    highlight: `#${string}`;
    white: `#${string}`;
    black: `#${string}`;
    gray: `#${string}`;
    danger: `#${string}`;
    secondaryBackground: `#${string}`;
    thirdBackground: `#${string}`;
    secondaryHighlight: `#${string}`;
  };
  fonts: {
    primary: string;
    secondary: string;
    third: string;
  }
}

export const defaultTheme: AppTheme = {
  pallette: {
    primary: '#ffe682',
    background: '#505DD4',
    secondary: '#897831',
    secondaryBackground: '#283395',
    highlight: '#98b9ff',
    secondaryHighlight: '#00fefe',
    danger: '#8b0000',
    white: '#fff',
    black: '#000',
    gray: '#E0E0E0',
    thirdBackground: '#D8E0FF'
  },
  fonts: {
    primary: 'SI',
    secondary: 'Clefs',
    third: 'Ruda',
  },
};
