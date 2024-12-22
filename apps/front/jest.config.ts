export default {
  displayName: 'front',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': [
      'babel-jest',
      {
        presets: ['@nx/next/babel'],
        plugins: [
          ['@babel/plugin-proposal-decorators', { version: 'legacy' }],
          ['@babel/plugin-proposal-class-properties', { loose: true }],
        ],
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/apps/front',
};
