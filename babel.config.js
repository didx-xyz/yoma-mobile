module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['transform-inline-environment-variables'],
    [
      'module-resolver',
      {
        root: ['./src'],
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
  ],
};
