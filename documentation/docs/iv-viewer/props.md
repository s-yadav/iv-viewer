---
sidebar_position: 2
title: props
---

# Props
___

Option that are used in the fullscreen mode and inlined mode.

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
