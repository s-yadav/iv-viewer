const fs = require('fs');
const util = require('util');
const sass = require('sass');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('postcss');

const writeFile = util.promisify(fs.writeFile);

// build css
const filePath = './src/scss/build.scss';
const css = sass.compile(filePath).css;

async function compileCss () {
  const unminifiedCssPromise = postcss([autoprefixer]).process(css, { from: undefined });
  const minifiedCssPromise = postcss([cssnano, autoprefixer]).process(css, { from: undefined });
  const [unminifiedCss, minifiedCss] = await Promise.all([unminifiedCssPromise, minifiedCssPromise]);
<<<<<<<< HEAD:packages/iv-viewer/build-css.js
  const distUnminified = writeFile('./dist/iv-viewer.css', unminifiedCss.css);
  const distMinified = writeFile('./dist/iv-viewer.min.css', minifiedCss.css);
========
  const distUnminified = writeFile('./dist/iv-viewer.css', unminifiedCss.toString());
  const distMinified = writeFile('./dist/iv-viewer.min.css', minifiedCss.toString());
  const libUnminified = writeFile('./lib/image-viewer.css', unminifiedCss.toString());
>>>>>>>> upstream/master:build-css.cjs

  return Promise.all([distUnminified, distMinified, libUnminified]);
}

compileCss();