module.exports = function (api) {
  api.cache(false);
  const presets = ['module:metro-react-native-babel-preset'];
  const plugins = [
    ['transform-inline-environment-variables'],
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '~': './src',
          'tests': './tests'
        },
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.json',
        ],
      },
    ],
  ]
  return {
    presets,
    plugins
  }
};
