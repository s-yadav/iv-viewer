import fs from 'fs';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import fileSize from 'rollup-plugin-filesize';
import license from 'rollup-plugin-license';

import PACKAGE from './package.json' assert { type: 'json' };
const fullYear = new Date().getFullYear();

const banner = `${PACKAGE.name} - ${PACKAGE.version}
  Author : ${PACKAGE.author}
  Copyright (c) ${(fullYear !== 2019 ? '2019,' : '')} ${fullYear} to ${PACKAGE.author}, released under the ${PACKAGE.license} license.
  ${PACKAGE.repository.url}`;

const babelConfig = JSON.parse(fs.readFileSync('.babelrc'));

const defaultConfig = {
  input: 'src/dist.js',
  output: {
    file: 'dist/iv-viewer.js',
    format: 'umd',
    name: 'ImageViewer',
    exports: 'default',
  },
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
    ...defaultConfig.output,
    file: 'dist/iv-viewer.min.js',
  },
  plugins: [
    ...defaultConfig.plugins,
    uglify(),
  ],
};

const moduleConfig = {
  ...defaultConfig,
  input: 'src/index.js',
  output: {
    file: 'dist/iv-viewer.es.js',
    format: 'esm',
  },
};

export default [defaultConfig, minConfig, moduleConfig];
