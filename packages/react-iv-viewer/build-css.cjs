const fs = require('fs');
const util = require('util');
const sass = require('sass');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('postcss');

const writeFile = util.promisify(fs.writeFile);

const css = sass.compile('./src/style.scss').css;

async function compileCss() {
    const unminifiedCssPromise = postcss([autoprefixer]).process(css, { from: undefined });
    const minifiedCssPromise = postcss([cssnano(), autoprefixer()]).process(css, { from: undefined });
    const [unminifiedCss, minifiedCss] = await Promise.all([unminifiedCssPromise, minifiedCssPromise]);

    const distUnminified = writeFile('./dist/react-iv-viewer.css', unminifiedCss.css);
    const distMinified = writeFile('./dist/react-iv-viewer.min.css', minifiedCss.css);

    return Promise.all([distUnminified, distMinified]);
}

compileCss()
    .then(() => console.log('CSS compiled successfully!'))
    .catch(error => console.error('Error compiling CSS:', error));
