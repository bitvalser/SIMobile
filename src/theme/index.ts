export interface AppTheme {
  pallette: {
    primary: `#${string}`;
    background: `#${string}`;
    highlight: `#${string}`;
    white: `#${string}`;
    black: `#${string}`;
  };
}

export const defaultTheme: AppTheme = {
  pallette: {
    primary: '#ffe682',
    background: '#5a95e2',
    highlight: '#98b9ff',
    white: '#fff',
    black: '#000',
  },
};
