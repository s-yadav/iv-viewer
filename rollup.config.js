import fs from 'fs';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import fileSize from 'rollup-plugin-filesize';
import license from 'rollup-plugin-license';

import PACKAGE from './package.json';
const fullYear = new Date().getFullYear();

const banner = `${PACKAGE.name} - ${PACKAGE.version}
  Author : ${PACKAGE.author}
  Copyright (c) ${(fullYear !== 2019 ? '2019,' : '')} ${fullYear} to ${PACKAGE.author}, released under the ${PACKAGE.license} license.
  ${PACKAGE.repository.url}`;

const babelConfig = JSON.parse(fs.readFileSync('.babelrc'));

const defaultConfig = {
  input: 'src/index.js',
  output: [{
    file: 'dist/img-viewer.es.js',
    format: 'esm',
    exports: 'named',
  }, {
    file: 'dist/img-viewer.js',
    format: 'umd',
    name: 'ImageViewer',
    exports: 'named',
  }],
  external: ['react', 'react-dom'],
  plugins: [
    babel({
      babelrc: false,
      ...babelConfig,
    }),
    fileSize(),
    license({
      banner,
    }),
  ],
};

const minConfig = {
  ...defaultConfig,
  output: {
    file: 'dist/img-viewer.min.js',
    format: 'umd',
    name: 'ImageViewer',
    exports: 'named',
  },
  plugins: [
    ...defaultConfig.plugins,
    uglify(),
  ],
};

export default [defaultConfig, minConfig];
