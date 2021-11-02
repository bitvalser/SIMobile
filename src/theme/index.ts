export interface AppTheme {
  pallette: {
    primary: `#${string}`;
    background: `#${string}`;
    highlight: `#${string}`;
    white: `#${string}`;
    black: `#${string}`;
    gray: `#${string}`;
    secondaryBackground: `#${string}`;
  };
}

export const defaultTheme: AppTheme = {
  pallette: {
    primary: '#ffe682',
    background: '#5a95e2',
    secondaryBackground: '#c0cff4',
    highlight: '#98b9ff',
    white: '#fff',
    black: '#000',
    gray: '#E0E0E0',
  },
};
