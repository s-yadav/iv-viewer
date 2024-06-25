---
sidebar_position: 3
title: "iv-functions"
---

# iv-viewer Functions and Methods
___

## Creating an Instance

To create an instance of `ImageViewer`, you need to provide an element and optional configuration options. The element can be a container where the viewer will be loaded, or an image element for initializing in image mode.

```js
import ImageViewer from 'iv-viewer';

const viewer = new ImageViewer(element, options);
```
You can also pass a selector directly instead of a DOM element.

```js
const viewer = new ImageViewer('#element', options);
```

## Instance Methods
### `load(imgSrc, highResImg)`
Load an image into the viewer. You can pass two different resolutions of the image as the first and second arguments (optional).
```js
viewer.load('image.png', 'hi-res-image.png');
```

### `zoom(zoomValue, point)`
Zoom the image to a specific value.

- **zoomValue**: A percentage value to which you want to zoom the image.
- **point (optional)**: Coordinates x and y in the container to act as the center for the zoom. If not defined, the center of the container is used.
```js
viewer.zoom(300, { x: 500, y: 500 });
```

### `resetZoom()`
Reset the zoom to the default or provided initial 'zoomValue'.

```js
viewer.refresh();
```

### `refresh()`
Manually refresh the viewer. This resets the zoom and pan, and recalculates the dimensions of the container, window, and image.
```js
viewer.refresh();
```

### `destroy()`
Destroy the plugin instance and unbind all events. It also resets the container or the image (if `ImageViewer` is used in image mode). Returns `null`, which you should assign to the viewer variable to free up memory.
```js
viewer = viewer.destroy();
```

## FullScreenViewer Methods
`FullScreenViewer` extends from `ImageViewer`, so it inherits all instance methods of `ImageViewer` and adds additional methods for full-screen mode.

### `show(imgSrc, highResImg)`
Show the full-screen viewer with the specified image. You can pass two different resolutions of the image as the first and second arguments (optional).

```js
viewer.show('image.png', 'hi-res-image.png');
```

### `hide()`
Hide or close the full-screen viewer.
```js
viewer.hide();
```


This Markdown provides a comprehensive overview of the functions and methods available in `iv-viewer`, covering instance creation, method usage, options, listeners, and callback data.