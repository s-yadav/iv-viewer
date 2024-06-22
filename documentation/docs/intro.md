---
sidebar_position: 1
title: 'Introduction'
---

## react-iv-viewer
___

`react-iv-viewer` is a React-based library for viewing images with advanced features like zooming, high-resolution image support, and full-screen viewing. It provides an easy way to integrate image viewing functionality into your React applications.

### Features

- Zooming with mouse wheel or buttons
- High-resolution image support
- Full-screen image viewing
- Customizable viewer dimensions
- Event handlers for zoom and load events
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

This Markdown provides a clear and concise introduction to `iv-viewer`, its features, installation instructions, and usage examples for both normal and fullscreen viewers in an ES6 environment.

Click [Options](./props.md) to get the list of options.