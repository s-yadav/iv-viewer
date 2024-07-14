---
sidebar_position: 1
title: 'Introduction'
description: "iv-viewer is a zooming and panning plugin inspired by Google Photos for your web images. It provides a smooth and intuitive way to view images with features like full-screen mode, touch device support, and high-resolution image loading."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Getting Started
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

<Tabs
  defaultValue="npm"
  values={[
    {label: 'npm', value: 'npm'},
    {label: 'yarn', value: 'yarn'},
  ]}>

  <TabItem value="npm">

    <div>
      ```bash
      npm install iv-viewer --save
      ```
    </div>
  </TabItem>
  <TabItem value="yarn">
    <div>
      ```bash
      yarn add iv-viewer
      ```
    </div>
    </TabItem>
</Tabs>

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

Click [Options](./api.md) to get the list of options.