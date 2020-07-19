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
    [
      'module-resolver',
      {
        alias: {
          '@config': './src/config',
          '@models': './src/models',
          '@services': './src/services',
          '@common': './src/common',
          '@controllers': './src/api/controllers',
          '@middlewares': './src/api/middlewares',
          '@routers': './src/api/routers',
        },
      },
    ],
  ],
  ignore: ['**/*.spec.ts'],
};
