const fs = require('fs');
const util = require('util');
const sass = require('sass');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('postcss');
const path = require('path'); // Include path module for resolving paths

const writeFile = util.promisify(fs.writeFile);

// Custom importer to handle node_modules imports
const customImporter = (url, prev) => {
    if (url.startsWith('~')) {
        const modulePath = url.substring(1);
        const filePath = require.resolve(modulePath, { paths: [path.dirname(prev)] });
        return { file: filePath };
    }
    return null; // Continue with default import handling
};

// Sass file to compile
const filePath = './src/style.scss';

// Compile Sass and get the CSS result
const sassResult = sass.renderSync({
    file: filePath,
    importer: customImporter,
});

// CSS output from Sass compilation
const css = sassResult.css.toString();

async function compileCss() {
    // Process CSS with PostCSS plugins
    const unminifiedCssPromise = postcss([autoprefixer]).process(css, { from: undefined });
    const minifiedCssPromise = postcss([cssnano(), autoprefixer()]).process(css, { from: undefined });
    const [unminifiedCss, minifiedCss] = await Promise.all([unminifiedCssPromise, minifiedCssPromise]);

    // Write processed CSS to output files
    const distUnminified = writeFile('./dist/react-iv-viewer.css', unminifiedCss.css);
    const distMinified = writeFile('./dist/react-iv-viewer.min.css', minifiedCss.css);

    return Promise.all([distUnminified, distMinified]);
}

compileCss()
    .then(() => {
        console.log('CSS compiled successfully!');
    })
    .catch(error => {
        console.error('Error compiling CSS:', error);
    });
