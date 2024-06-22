---
sidebar_position: 1
title: Props
---

# Props

```ts
interface FullscreenImageViewer {
    img: string;
    hiResImg?: string;
    width?: string;
    height?: string;
    defaultZoom: number;
    maxZoom?: number;
    snapView?: boolean;
    refreshOnResize?: boolean;
    zoomOnMouseWheel?: boolean;
    hasZoomButtons?: boolean;
    zoomStep?: number;
  }
```

### img `Image URL`

**default**: `null`

The URL of the image to display.

```jsx
import { ImageViewer } from 'react-iv-viewer';

<ImageViewer img="https://example.com/image.jpg" />;
```

### hiResImg `Image URL`
**default**: `null`

The URL of the high-resolution image to display when zoomed in.

```jsx
import { ImageViewer } from 'react-iv-viewer';

<ImageViewer img="https://example.com/image.jpg" hiResImg="https://example.com/high-res-image.jpg" />;
```

### width `String`
**default**: `"100%"`

The width of the image viewer.

```jsx
import { ImageViewer } from 'react-iv-viewer';

<ImageViewer img="https://example.com/image.jpg" width="500px" />;
```
### height `String`
**default**: `"100%"`

The height of the image viewer.

```jsx
import { ImageViewer } from 'react-iv-viewer';

<ImageViewer img="https://example.com/image.jpg" height="400px" />;
```

### maxZoom `Number`
**default**: `500`

The maximum zoom level allowed.

```jsx
import { ImageViewer } from 'react-iv-viewer';

<ImageViewer img="https://example.com/image.jpg" maxZoom={300} />;
```

### defaultZoom `Number`
**default**: `100`

The default zoom level when the viewer is initialized.

```jsx
import { ImageViewer } from 'react-iv-viewer';

<ImageViewer img="https://example.com/image.jpg" defaultZoom={120} />;
```
### snapView `Boolean`
**default**: `true`

Whether to enable the snap view feature for easier navigation within the image.
```jsx
import { ImageViewer } from 'react-iv-viewer';

<ImageViewer img="https://example.com/image.jpg" snapView={true} />;
```

### refreshOnResize `Boolean`
**default**: `true`

Whether to refresh the viewer when the window is resized.
```jsx
import { ImageViewer } from 'react-iv-viewer';

<ImageViewer img="https://example.com/image.jpg" refreshOnResize={false} />;
```

### zoomOnMouseWheel `Boolean`
**default**: `true`

Whether to allow zooming using the mouse wheel.
```jsx
import { ImageViewer } from 'react-iv-viewer';

<ImageViewer img="https://example.com/image.jpg" zoomOnMouseWheel={false} />;
```

### hasZoomButtons `Boolean`
**default**: `true`

Whether to display zoom buttons on the viewer.
```jsx
import { ImageViewer } from 'react-iv-viewer';

<ImageViewer img="https://example.com/image.jpg" hasZoomButtons={false} />;
```

### zoomStep `Number`
**default**: `10`

The increment step for zooming in or out.
```jsx
import { ImageViewer } from 'react-iv-viewer';

<ImageViewer img="https://example.com/image.jpg" zoomStep={5} />;
```