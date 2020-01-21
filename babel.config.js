module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
  plugins: [
    '@babel/plugin-proposal-export-namespace-from',
    'add-module-exports',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          'lodash/fp': 'fp',
          '^lib/dist/(.+)': 'lib/dist/\\1',
          '^lib/(.+)': 'lib/dist/\\1',
        },
      },
    ],
  ],
  ignore: ['node_modules'].concat(process.env.NODE_ENV === 'production' ? ['**/*.test.js', '__mocks__'] : []),
  sourceMap: 'inline',
  retainLines: true,
}
