
# iv-viewer
___

A zooming and panning plugin inspired by Google Photos for your web images. It comes in two different variants. First, a react-based zooming and panning component and 2nd vanilla JS-based zooming and panning library.

## react-iv-viewer

`react-iv-viewer` is a React-based library for viewing images with advanced features like zooming, high-resolution image support, and full-screen viewing. It provides an easy way to integrate image viewing functionality into your React applications.

### Features

- Smooth dragging and panning of images
- Support for touch devices
- Double tap to zoom in/zoom out
- Pinch in/out to control zoom
- Zooming with mouse wheel or buttons
- High-resolution image support
- Full-screen image viewing
- Customizable viewer dimensions
- TypeScript support

### Demos

See the many DEMO sections in the documentation.

### Install

using `npm`
```bash
npm install react-iv-viewer
```

using `yarn`
```bash
yarn add react-iv-viewer
```

#### ES6

Image Viewer
```jsx
import { ImageViewer } from 'react-iv-viewer';
```

Fullscreen Viewer
```jsx
import { FullScreenImageViewer } from 'react-iv-viewer';
```

## iv-viewer
___

`iv-viewer` is a zooming and panning plugin inspired by Google Photos for your web images. It provides a smooth and intuitive way to view images with features like full-screen mode, touch device support, and high-resolution image loading.

### Features

- Smooth dragging and panning of images
- Support for touch devices
- Double tap to zoom in/zoom out
- Pinch in/out to control zoom
- Snap view for better panning and zooming experience
- Quick display of loaded images with progressive loading of high-quality images
- Exposed API to control zoom programmatically
- Custom events to listen for state changes

### Install

Using `npm`
```bash
npm install iv-viewer --save
```
Using `yarn`
```bash
yarn add iv-viewer
```

## Usage
### ES6 
Image Viewer
```jsx
import ImageViewer from 'iv-viewer';
import 'iv-viewer/dist/iv-viewer.css';

const container = document.querySelector('#image-container');
const viewer = new ImageViewer(container, options);

viewer.load('images/low-res-img', 'images/hi-res-img');
```
Fullscreen Viewer
```jsx
import { FullScreenViewer } from 'iv-viewer';
import 'iv-viewer/dist/iv-viewer.css';

const viewer = new FullScreenViewer(options);

viewer.show('images/low-res-img', 'images/hi-res-img');
```

[See full documentation of iv-viewer](https://github.com/s-yadav/iv-viewer/tree/master/packages/iv-viewer#readme) 

### Like this
[:star: this repo](https://github.com/s-yadav/iv-viewer)

### Major updates

#### v2.2.0

- Includes TypeScript type declarations
- Bugfixing

#### v2.1.0

- It's a complete rewrite of ImageViewer with no jQuery requirement in ES6.
- While the options and instance method are same the way you use a ImageViewer and FullScreenView is changed. The v1 API will no longer be supported.
- Published on the npm. V1 was not available on npm.
- Changed the package name to iv-viewer. image-viewer name was not available on npm. 
- Added some listeners
- Added zoom in/out buttons
- Some SCSS variable for easier overrides.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://mozillians.org/en-US/u/ruchikabgosain/"><img src="https://avatars2.githubusercontent.com/u/30324532?v=4" width="100px;" alt="Ruchika"/><br /><sub><b>Ruchika</b></sub></a><br /><a href="https://github.com/s-yadav/iv-viewer/commits?author=ruchikabgosain" title="Documentation">📖</a></td>
    <td align="center"><a href="https://twitter.com/_syadav"><img src="https://avatars1.githubusercontent.com/u/3096766?v=4" width="100px;" alt="Sudhanshu Yadav"/><br /><sub><b>Sudhanshu Yadav</b></sub></a><br /><a href="https://github.com/s-yadav/iv-viewer/commits?author=s-yadav" title="Documentation">📖</a></td>
    <td align="center"><a href="https://hockeycommunity.com"><img src="https://avatars0.githubusercontent.com/u/2039539?v=4" width="100px;" alt="Amrit Kahlon"/><br /><sub><b>Amrit Kahlon</b></sub></a><br /><a href="https://github.com/s-yadav/iv-viewer/commits?author=amritk" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/10000"><img src="https://avatars2.githubusercontent.com/u/3347256?v=4" width="100px;" alt="10000"/><br /><sub><b>10000</b></sub></a><br /><a href="https://github.com/s-yadav/iv-viewer/commits?author=10000" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
