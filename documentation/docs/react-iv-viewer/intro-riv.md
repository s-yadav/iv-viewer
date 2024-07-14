---
sidebar_position: 1
title: 'Introduction'
description: "react-iv-viewer is a React-based library for viewing images with advanced features like zooming, high-resolution image support, and full-screen viewing. It provides an easy way to integrate image viewing functionality into your React applications."
---


import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Getting Started

---

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
- Event handlers for zoom and load events
- TypeScript support

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
      npm install react-iv-viewer
      ```
    </div>
  </TabItem>
  <TabItem value="yarn">
    <div>
      ```bash
      yarn add react-iv-viewer
      ```
    </div>
    </TabItem>
</Tabs>

#### Import its style

```js
// Import css
import 'react-iv-viewer/dist/react-iv-viewer.css';
```
You can choose to import css file inside your scss/less files.

### Usage

#### Image Viewer
If you just want to add zoom and pan gesture to your images in a image-viewer style, you can use ImageViewer in image mode.

```jsx
import { ImageViewer } from 'react-iv-viewer';
```

#### Fullscreen Image Viewer
If you want to show images in full screen, with predefined styles. You can use FullScreenImageViewer.

```jsx
import { FullScreenImageViewer } from 'react-iv-viewer';
```