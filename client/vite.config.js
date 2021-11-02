import { defineConfig } from 'vite';
import babel from '@rollup/plugin-babel';
import { minifyHtml, injectHtml } from 'vite-plugin-html';

const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  mode: isProduction ? 'production' : 'development',
  base: './',
  server: {
    host: 'sc-frontend',
    port: 3000,
  },
  plugins: [
    minifyHtml(),
    injectHtml({
      injectData: {
        htmlWebpackPlugin: {
          options: {
            isVite: !isProduction,
          },
        },
      },
    }),
  ],
  build: {
    minify: 'esbuild',
    target: 'esnext',
    brotliSize: true,
    outDir: 'build/elements',
    lib: {
      entry: './elements/sc-site-layout.js',
      formats: ['es'],
    },
    rollupOptions: {
      external: /^lit/,
      output: {
        format: 'esm',
      },
    },
    plugins: [
      babel({
        plugins: [
          ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
          ['@babel/plugin-transform-runtime'],
          ['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }],
          ['@babel/plugin-proposal-function-bind'],
          ['@babel/plugin-proposal-do-expressions'],
          ['@babel/plugin-proposal-throw-expressions'],
          ['@babel/plugin-proposal-async-do-expressions'],
        ],
      }),
    ],
  },
});
