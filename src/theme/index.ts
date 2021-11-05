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
  };
}

export const defaultTheme: AppTheme = {
  pallette: {
    primary: '#ffe682',
    background: '#5a95e2',
    secondary: '#897831',
    secondaryBackground: '#c0cff4',
    highlight: '#98b9ff',
    danger: '#8b0000',
    white: '#fff',
    black: '#000',
    gray: '#E0E0E0',
  },
};
