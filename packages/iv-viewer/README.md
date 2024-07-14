# iv-viewer
[![All Contributors](https://img.shields.io/badge/all_contributors-4-orange.svg?style=flat-square)](#contributors-)
A zooming and panning plugin inspired by google photos for your web images.

### Features
<ul>
    <li>Smooth dragging and panning of images.</li>
    <li>Support touch devices.</li>
    <li>Double tap to zoom in/zoom out.</li>
    <li>Pinch in/out to control zoom.</li>
    <li>Snap view for better panning and zooming experience.</li>
    <li>Allow quick display of loaded image then loading of high quality image progressively.</li>
    <li>Exposed API to control zoom programmatically.</li>
    <li>Custom Events to listen for the state changes.</li>
</ul>

![alt tag](assets/imageviewer.jpg)

### Install
Through npm
```
npm install iv-viewer --save
```

Or get compiled development and production version (css and js) from ./dist

### Usage
Import ImageViewer and it's style.
```js
import ImageViewer from 'iv-viewer';

// or
const ImageViewer = require('iv-viewer').default; 

// Import css
import 'iv-viewer/dist/iv-viewer.css';
```
You can choose to import css file inside your scss/less files.

You can also use the standalone UMD build by including dist/iv-viewer.js and dist/iv-viewer.css in your page.
```html
<script src="https://unpkg.com/iv-viewer/dist/iv-viewer.js"></script>

<link rel="stylesheet" href="https://unpkg.com/iv-viewer/dist/iv-viewer.css">
```

### Three different modes

#### Full-Screen Mode
If you want to show images in full screen, with predefined styles. You can use FullScreenViewer. 
```js
import { FullScreenViewer } from 'iv-viewer';

const viewer = new FullScreenViewer(options); // check options section for supported options

viewer.show('images/low-res-img', 'images/hi-res-img'); //second option is optional. Check better image loading section
```

#### Container Mode
If you have your own container to show images (you might have custom layout or gallery), you can use image-viewer in a container mode.

```html
<div id="image-container"></div>
```

```js
import ImageViewer from 'iv-viewer';

const container = document.querySelector('#image-container');
const viewer = new ImageViewer(container, options); //check options section for supported options

viewer.load('images/low-res-img', 'images/hi-res-img'); //second option is optional. Check better image loading section
```

#### Image Mode
If you just want to add zoom and pan gesture to your images in a image-viewer style, you can use image-viewer in image mode.
```html
<img id="image" src="image.png" data-high-res-src="hi-res-image.png" />
```

```js
import ImageViewer from 'iv-viewer';

const image = document.querySelector('#image');
const viewer = new ImageViewer(image, options); // check options section for supported options
```

### Options
| Option        | Allowed Value           | Default  | Description |
| ------------- |-------------| -----| -------- |
| zoomValue | number in percentage | 100 | It defines the initial zoom value of the image. |
| maxZoom | number in percentage | 500 | It defines the max limit for the zoom value of the image. |
| snapView | boolean | true | If true will show snap view. |
| refreshOnResize | boolean | true | Defines whether to refresh the viewer on resize of window. This is available only for Container and Image mode. On FullScreen mode it will refresh on window resize by default.|
| zoomOnMouseWheel | boolean | true | Defines weather to allow zoom with mouse scroll or not. |
| hasZoomButtons | boolean | true | Defines weather to add zoom buttons or not |
| zoomStep | number | 50 | The number of which the zoom should increase/decrease when the buttons are clicked |
| listeners | object | null | multiple useful callbacks that could use in-order to get the current state of the viewer|

### The Listeners
There are multiple listeners you can register with each viewer instance
```js
import ImageViewer from 'iv-viewer';

const viewer = new ImageViewer(element, { 
  listeners: { 
    onInit: callback(data), // called when the instance is initiated 
    onDestroy: callback(), // called when the instance is destroyed
    onImageLoaded: callback(data), // called on image load
    onZoomChange: callback(data), // called on zoom in/out
  } 
});
```
### Callback Data
The data passed to each callback is very useful, it contains the current instance with more info that you can use to react to the instance state

| Option        | dataType |  Description |
| ------------- |-------------|  -------- |
| container | HTMLElement | The current container of the viewer |
| snapView | HTMLElement  | The snap view element in the viewer |
| zoomValue | Number | The current zoom value |
| reachedMin | boolean | A boolean value that determine if the zoom value reached the initial zoom.|
| reachedMax | boolean | A boolean value that determine if the zoom value reached the maximum zoom.  |
| instance | ImageViewer | The current instance which contains all other info if needed |

### API (ImageViewer)

Creating an instance

```js
import ImageViewer from 'iv-viewer';

const viewer = new ImageViewer(element, options);
```
Here the first argument is the element, which can be container where viewer will be loaded, or it can be a image in which case viewer will be initialized in a image mode.

You can also pass a selector directly instead of a DOM element.
```js
const viewer = new ImageViewer('#element', options);
```

Second argument is to provide configuration options for the ImageViewer. This argument is optional.

#### Instance methods
**load(imgSrc, highResImg)**

Load an image to the viewer. You can pass two different resolution of the image as first and second argument (optional). See why do you need it at [better image loading](#better-image-loading) section. 

```js
viewer.load('image.png', 'hi-res-image.png');
```
Note that this is just required for the container mode, as in image mode you can just use `src` and `data-high-res-src` attribute and the image will load by itself. See [image mode](#image-mode) example

**zoom(zoomValue, point)**

zoomValue: A percentage value to which you want to zoom the image.

point(optional): Point {x, y} is the coordinate of the container which would act as the center for the zoom. If not defined, it will take the center of the container as the zooming point.

```js
viewer.zoom(300, { x: 500, y: 500 });
```

**resetZoom()**

Reset zoom to the default or provided initial zoomValue.

```js
viewer.resetZoom();
```

**refresh()**

Method to manually refresh the viewer. It will reset the zoom and pan. It will also recalculate the dimension of container, window and image in case if that is changed.
```js
viewer.refresh();
```

**destroy()**

Destroys the plugin instance and unbind all events. It will also reset the container or the image(if ImageViewer is used in image mode). It returns null which you should assign to viewer variable to completely free up memory.
```js
viewer = viewer.destroy();
```

### API (FullScreenViewer)
FullScreenViewer is extended from ImageViewer. So it shares the same ImageViewer api along with some FullScreenViewer API.

Creating an instance

```js
import { FullScreenViewer } from 'iv-viewer';

const viewer = new FullScreenViewer(options);
```
Unlike ImageViewer you don't have to pass container for the viewer as it will be initialized in pre-defined full screen container.

First argument is to provide configuration options for the FullScreenViewer. This argument is optional.

#### Instance methods (FullScreenViewer)
FullScreenViewer inherits all the instance method of ImageViewer. In additional to that it has following methods.

**show(imgSrc, highResImg)**

Show the full screen viewer with passed image on the show method. You can pass two different resolution of the image as first and second argument (optional). See why do you need it at [better image loading](#better-image-loading) section. 

```js
viewer.show('image.png', 'hi-res-image.png');
```

**hide()**

Hide/Close the fullScreen viewer. 
```js
viewer.hide();
```

### Better image loading
To improve the perceived experience, it is always recommended to show the already loaded image or the low quality image on the viewer and let the ImageViewer load high quality image in parallel. 

It will also try to preview the high quality image while it's loading so it will give a progressive loading effect.

ImageViewer provides api to do this. 
Container mode
```js
viewer.load('image.png', 'hi-res-image.png');
```

FullScreen mode
```js
viewer.show('image.png', 'hi-res-image.png');
```

Image Mode
```html
<img id="image" src="image.png" data-high-res-src="hi-res-image.png" />
```

In all of the above example it will first try to display the first image and then load the second image (if passed) in parallel.

The second image is optional, which you should pass when you feel you can improve the image loading experience by first showing low quality image and then progressively update it with high quality image.

### Demo
codesandbox preview link: [https://8ypwzryom0.codesandbox.io/](https://8ypwzryom0.codesandbox.io/)

codesandbox link: [https://codesandbox.io/s/8ypwzryom0](https://codesandbox.io/s/8ypwzryom0)


[See full documentation of iv-viewer](https://s-yadav.github.io/iv-viewer/docs/category/iv-viewer) 
