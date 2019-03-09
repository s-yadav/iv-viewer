const fs = require('fs');
const util = require('util');
const sass = require('sass');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('postcss');

const writeFile = util.promisify(fs.writeFile);

// build css
const filePath = './src/ImageViewer.scss';
const css = sass.renderSync({ file: filePath }).css.toString();

async function compileCss () {
  const unminifiedCssPromise = postcss([autoprefixer]).process(css, { from: undefined });
  const minifiedCssPromise = postcss([cssnano, autoprefixer]).process(css, { from: undefined });
  const [unminifiedCss, minifiedCss] = await Promise.all([unminifiedCssPromise, minifiedCssPromise]);
  const distUnminified = writeFile('./dist/iv-viewer.css', unminifiedCss);
  const distMinified = writeFile('./dist/iv-viewer.min.css', minifiedCss);

  return Promise.all([distUnminified, distMinified]);
}

compileCss();
