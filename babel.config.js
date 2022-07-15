module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@assets': './src/assets',
          '@core': './src/core',
          '@navigators': './src/navigators',
          '@pages': './src/pages',
          '@theme': './src/theme',
        },
      },
    ],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    'babel-plugin-parameter-decorator',
    '@babel/plugin-transform-flow-strip-types',
    '@babel/plugin-proposal-class-properties',
  ],
};
