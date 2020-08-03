import {
  createElement,
  addClass,
  removeClass,
  css,
  removeCss,
  wrap,
  unwrap,
  remove,
  easeOutQuart,
  imageLoaded,
  clamp,
  assignEvent,
  getTouchPointsDistance,
  ZOOM_CONSTANT,
  MOUSE_WHEEL_COUNT,
} from './util';

import Slider from './Slider';

const imageViewHtml = `
  <div class="iv-loader"></div>
  <div class="iv-snap-view">
    <div class="iv-snap-image-wrap">
      <div class="iv-snap-handle"></div>
    </div>
    <div class="iv-zoom-slider">
      <div class="iv-zoom-handle"></div>
    </div>
  </div>
  <div class="iv-image-view" >
    <div class="iv-image-wrap" ></div>
  </div>
`;

class ImageViewer {
  constructor (element, options = {}) {
    const { container, domElement, imageSrc, hiResImageSrc } = this._findContainerAndImageSrc(element, options);

    // containers for elements
    this._elements = {
      container,
      domElement,
    };

    this._options = { ...ImageViewer.defaults, ...options };

    // container for all events
    this._events = {

    };

    // container for all timeout and frames
    this._frames = {

    };

    // container for all sliders
    this._sliders = {

    };

    // maintain current state
    this._state = {
      zoomValue: this._options.zoomValue,
    };

    this._images = {
      imageSrc,
      hiResImageSrc,
    };

    this._init();

    if (imageSrc) {
      this._loadImages();
    }

    // store reference of imageViewer in domElement
    domElement._imageViewer = this;
  }

  _findContainerAndImageSrc (element) {
    let domElement = element;
    let imageSrc, hiResImageSrc;

    if (typeof element === 'string') {
      domElement = document.querySelector(element);
    }

    // throw error if imageViewer is already assigned
    if (domElement._imageViewer) {
      throw new Error('An image viewer is already being initiated on the element.');
    }

    let container = element;

    if (domElement.tagName === 'IMG') {
      imageSrc = domElement.src;
      hiResImageSrc = domElement.getAttribute('high-res-src') || domElement.getAttribute('data-high-res-src');

      // wrap the image with iv-container div
      container = wrap(domElement, { className: 'iv-container iv-image-mode', style: { display: 'inline-block', overflow: 'hidden' } });

      // hide the image and add iv-original-img class
      css(domElement, {
        opacity: 0,
        position: 'relative',
        zIndex: -1,
      });
    } else {
      imageSrc = domElement.getAttribute('src') || domElement.getAttribute('data-src');
      hiResImageSrc = domElement.getAttribute('high-res-src') || domElement.getAttribute('data-high-res-src');
    }

    return {
      container,
      domElement,
      imageSrc,
      hiResImageSrc,
    };
  }

  _init () {
    // initialize the dom elements
    this._initDom();

    // initialize slider
    this._initImageSlider();
    this._initSnapSlider();
    this._initZoomSlider();

    // enable pinch and zoom feature for touch screens
    this._pinchAndZoom();

    // enable scroll zoom interaction
    this._scrollZoom();

    // enable double tap to zoom interaction
    this._doubleTapToZoom();

    // initialize events
    this._initEvents();
  }

  _initDom () {
    const { container } = this._elements;

    // add image-viewer layout elements
    createElement({
      tagName: 'div',
      className: 'iv-wrap',
      html: imageViewHtml,
      parent: container,
    });

    // add container class on the container
    addClass(container, 'iv-container');

    // if the element is static position, position it relatively
    if (css(container, 'position') === 'static') {
      css(container, { position: 'relative' });
    }

    // save references for later use
    this._elements = {
      ...this._elements,
      snapView: container.querySelector('.iv-snap-view'),
      snapImageWrap: container.querySelector('.iv-snap-image-wrap'),
      imageWrap: container.querySelector('.iv-image-wrap'),
      snapHandle: container.querySelector('.iv-snap-handle'),
      zoomHandle: container.querySelector('.iv-zoom-handle'),
    };
  }

  _initImageSlider () {
    const {
      _elements,
    } = this;

    const { imageWrap } = _elements;

    let positions, currentPos;

    /* Add slide interaction to image */
    const imageSlider = new Slider(imageWrap, {
      isSliderEnabled: () => {
        const { loaded, zooming, zoomValue } = this._state;
        return loaded && !zooming && zoomValue > 100;
      },
      onStart: (e, position) => {
        const { snapSlider } = this._sliders;

        // clear all animation frame and interval
        this._clearFrames();

        snapSlider.onStart();

        // reset positions
        positions = [position, position];
        currentPos = undefined;

        this._frames.slideMomentumCheck = setInterval(() => {
          if (!currentPos) return;

          positions.shift();
          positions.push({
            x: currentPos.mx,
            y: currentPos.my,
          });
        }, 50);
      },
      onMove: (e, position) => {
        const { snapImageDim } = this._state;
        const { snapSlider } = this._sliders;
        const imageCurrentDim = this._getImageCurrentDim();
        currentPos = position;

        snapSlider.onMove(e, {
          dx: -position.dx * snapImageDim.w / imageCurrentDim.w,
          dy: -position.dy * snapImageDim.h / imageCurrentDim.h,
        });
      },
      onEnd: () => {
        const { snapImageDim } = this._state;
        const { snapSlider } = this._sliders;
        const imageCurrentDim = this._getImageCurrentDim();

        // clear all animation frame and interval
        this._clearFrames();

        let step, positionX, positionY;

        const xDiff = positions[1].x - positions[0].x;
        const yDiff = positions[1].y - positions[0].y;

        const momentum = () => {
          if (step <= 60) {
            this._frames.sliderMomentumFrame = requestAnimationFrame(momentum);
          }

          positionX += easeOutQuart(step, xDiff / 3, -xDiff / 3, 60);
          positionY += easeOutQuart(step, yDiff / 3, -yDiff / 3, 60);

          snapSlider.onMove(null, {
            dx: -(positionX * snapImageDim.w / imageCurrentDim.w),
            dy: -(positionY * snapImageDim.h / imageCurrentDim.h),
          });

          step++;
        };

        if (Math.abs(xDiff) > 30 || Math.abs(yDiff) > 30) {
          step = 1;
          positionX = currentPos.dx;
          positionY = currentPos.dy;

          momentum();
        }
      },
    });

    imageSlider.init();

    this._sliders.imageSlider = imageSlider;
  }

  _initSnapSlider () {
    const {
      snapHandle,
    } = this._elements;

    let startHandleTop, startHandleLeft;

    const snapSlider = new Slider(snapHandle, {
      isSliderEnabled: () => {
        return this._state.loaded;
      },
      onStart: () => {
        const { slideMomentumCheck, sliderMomentumFrame } = this._frames;

        startHandleTop = parseFloat(css(snapHandle, 'top'));
        startHandleLeft = parseFloat(css(snapHandle, 'left'));

        // stop momentum on image
        clearInterval(slideMomentumCheck);
        cancelAnimationFrame(sliderMomentumFrame);
      },
      onMove: (e, position) => {
        const { snapHandleDim, snapImageDim } = this._state;
        const { image } = this._elements;

        const imageCurrentDim = this._getImageCurrentDim();

        // find handle left and top and make sure they lay between the snap image
        const maxLeft = Math.max(snapImageDim.w - snapHandleDim.w, startHandleLeft);
        const maxTop = Math.max(snapImageDim.h - snapHandleDim.h, startHandleTop);
        const minLeft = Math.min(0, startHandleLeft);
        const minTop = Math.min(0, startHandleTop);

        let left = clamp(startHandleLeft + position.dx, minLeft, maxLeft);
        let top = clamp(startHandleTop + position.dy, minTop, maxTop);

        const imgLeft = -left * imageCurrentDim.w / snapImageDim.w;
        const imgTop = -top * imageCurrentDim.h / snapImageDim.h;

        css(snapHandle, {
          left: `${left}px`,
          top: `${top}px`,
        });

        css(image, {
          left: `${imgLeft}px`,
          top: `${imgTop}px`,
        });
      },
    });

    snapSlider.init();

    this._sliders.snapSlider = snapSlider;
  }

  _initZoomSlider () {
    const { snapView, zoomHandle } = this._elements;

    // zoom in zoom out using zoom handle
    const sliderElm = snapView.querySelector('.iv-zoom-slider');

    let leftOffset, handleWidth;

    // on zoom slider we have to follow the mouse and set the handle to its position.
    const zoomSlider = new Slider(sliderElm, {
      isSliderEnabled: () => {
        return this._state.loaded;
      },
      onStart: (eStart) => {
        const { zoomSlider: slider } = this._sliders;

        leftOffset = sliderElm.getBoundingClientRect().left + document.body.scrollLeft;
        handleWidth = parseInt(css(zoomHandle, 'width'), 10);

        // move the handle to current mouse position
        slider.onMove(eStart);
      },
      onMove: (e) => {
        const { maxZoom } = this._options;
        const { zoomSliderLength } = this._state;

        const pageX = e.pageX !== undefined ? e.pageX : e.touches[0].pageX;

        const newLeft = clamp(pageX - leftOffset - handleWidth / 2, 0, zoomSliderLength);

        const zoomValue = 100 + ((maxZoom - 100) * newLeft / zoomSliderLength);

        this.zoom(zoomValue);
      },
    });

    zoomSlider.init();
    this._sliders.zoomSlider = zoomSlider;
  }

  _initEvents () {
    this._snapViewEvents();

    // handle window resize
    if (this._options.refreshOnResize) {
      this._events.onWindowResize = assignEvent(window, 'resize', this.refresh);
    }
  }

  _snapViewEvents () {
    const { imageWrap, snapView } = this._elements;

    // show snapView on mouse move
    this._events.snapViewOnMouseMove = assignEvent(imageWrap, ['touchmove', 'mousemove'], () => {
      this.showSnapView();
    });

    // keep showing snapView if on hover over it without any timeout
    this._events.mouseEnterSnapView = assignEvent(snapView, ['mouseenter', 'touchstart'], () => {
      this._state.snapViewVisible = false;
      this.showSnapView(true);
    });

    // on mouse leave set timeout to hide snapView
    this._events.mouseLeaveSnapView = assignEvent(snapView, ['mouseleave', 'touchend'], () => {
      this._state.snapViewVisible = false;
      this.showSnapView();
    });
  }

  _pinchAndZoom () {
    const { imageWrap, container } = this._elements;

    // apply pinch and zoom feature
    const onPinchStart = (eStart) => {
      const { loaded, zoomValue: startZoomValue } = this._state;
      const { _events: events } = this;

      if (!loaded) return;

      const touch0 = eStart.touches[0];
      const touch1 = eStart.touches[1];

      if (!(touch0 && touch1)) {
        return;
      }

      this._state.zooming = true;

      const contOffset = container.getBoundingClientRect();

      // find distance between two touch points
      const startDist = getTouchPointsDistance(eStart.touches);

      // find the center for the zoom
      const center = {
        x: (touch1.pageX + touch0.pageX) / 2 - (contOffset.left + document.body.scrollLeft),
        y: (touch1.pageY + touch0.pageY) / 2 - (contOffset.top + document.body.scrollTop),
      };

      const moveListener = (eMove) => {
        // eMove.preventDefault();

        const newDist = getTouchPointsDistance(eMove.touches);

        const zoomValue = startZoomValue + (newDist - startDist) / 2;

        this.zoom(zoomValue, center);
      };

      const endListener = (eEnd) => {
        // unbind events
        events.pinchMove();
        events.pinchEnd();
        this._state.zooming = false;
        // properly resume move event if one finger remains
        if (eEnd.touches.length === 1) {
          this._sliders.imageSlider.startHandler(eEnd);
        }
      };

      // remove events if already assigned
      if (events.pinchMove) events.pinchMove();
      if (events.pinchEnd) events.pinchEnd();

      // assign events
      events.pinchMove = assignEvent(document, 'touchmove', moveListener);
      events.pinchEnd = assignEvent(document, 'touchend', endListener);
    };

    this._events.pinchStart = assignEvent(imageWrap, 'touchstart', onPinchStart);
  }

  _scrollZoom () {
    /* Add zoom interaction in mouse wheel */
    const { _options } = this;
    const { container, imageWrap } = this._elements;

    let changedDelta = 0;

    const onMouseWheel = (e) => {
      const { loaded, zoomValue } = this._state;

      if (!_options.zoomOnMouseWheel || !loaded) return;

      // clear all animation frame and interval
      this._clearFrames();

      // cross-browser wheel delta
      const delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail || -e.deltaY));

      var newZoomValue = zoomValue * (100 + delta * ZOOM_CONSTANT) / 100;

      if ((zoomValue == _options.maxZoom && delta > 0) || (zoomValue == 100 && delta <0)) {
        changedDelta += Math.abs(delta);
      } else if ( newZoomValue > _options.maxZoom ) {
        newZoomValue = _options.maxZoom;
        changedDelta = 0;
      } else if ( newZoomValue < 100 ) {
        newZoomValue = 100;
        changedDelta = 0;
      } else {
        changedDelta = 0;
      }

      e.preventDefault();

      if (changedDelta > MOUSE_WHEEL_COUNT) return;

      const contOffset = container.getBoundingClientRect();

      const x = (e.pageX || e.pageX) - (contOffset.left + document.body.scrollLeft);
      const y = (e.pageY || e.pageY) - (contOffset.top + document.body.scrollTop);

      this.zoom(newZoomValue, {
        x,
        y,
      });

      // show the snap viewer
      this.showSnapView();
    };

    this._ev = assignEvent(imageWrap, 'wheel', onMouseWheel);
  }

  _doubleTapToZoom () {
    const { imageWrap } = this._elements;
    // handle double tap for zoom in and zoom out

    let touchTime = 0;

    let point;

    const onDoubleTap = (e) => {
      if (touchTime === 0) {
        touchTime = Date.now();
        point = {
          x: e.pageX,
          y: e.pageY,
        };
      } else if (Date.now() - touchTime < 500 && Math.abs(e.pageX - point.x) < 50 && Math.abs(e.pageY - point.y) < 50) {
        if (this._state.zoomValue === this._options.zoomValue) {
          this.zoom(200);
        } else {
          this.resetZoom();
        }
        touchTime = 0;
      } else {
        touchTime = 0;
      }
    };

    assignEvent(imageWrap, 'click', onDoubleTap);
  }

  _getImageCurrentDim () {
    const { zoomValue, imageDim } = this._state;
    return {
      w: imageDim.w * (zoomValue / 100),
      h: imageDim.h * (zoomValue / 100),
    };
  }

  _loadImages () {
    const { _images, _elements } = this;
    const { imageSrc, hiResImageSrc } = _images;
    const { container, snapImageWrap, imageWrap } = _elements;

    const ivLoader = container.querySelector('.iv-loader');

    // remove old images
    remove(container.querySelectorAll('.iv-snap-image, .iv-image'));

    // add snapView image
    const snapImage = createElement({
      tagName: 'img',
      className: 'iv-snap-image',
      src: imageSrc,
      insertBefore: snapImageWrap.firstChild,
      parent: snapImageWrap,
    });

    // add image
    const image = createElement({
      tagName: 'img',
      className: 'iv-image iv-small-image',
      src: imageSrc,
      parent: imageWrap,
    });

    this._state.loaded = false;

    // store image reference in _elements
    this._elements.image = image;
    this._elements.snapImage = snapImage;

    css(ivLoader, { display: 'block' });

    // keep visibility hidden until image is loaded
    css(image, { visibility: 'hidden' });

    // hide snap view if open
    this.hideSnapView();

    const onImageLoad = () => {
      // hide the iv loader
      css(ivLoader, { display: 'none' });

      // show the image
      css(image, { visibility: 'visible' });

      // load high resolution image if provided
      if (hiResImageSrc) {
        this._loadHighResImage(hiResImageSrc);
      }

      // set loaded flag to true
      this._state.loaded = true;

      // calculate the dimension
      this._calculateDimensions();

      // reset the zoom
      this.resetZoom();
    };

    if (imageLoaded(image)) {
      onImageLoad();
    } else {
      this._events.imageLoad = assignEvent(image, 'load', onImageLoad);
    }
  }
  _loadHighResImage (hiResImageSrc) {
    const { imageWrap, container } = this._elements;

    const lowResImg = this._elements.image;

    const hiResImage = createElement({
      tagName: 'img',
      className: 'iv-image iv-large-image',
      src: hiResImageSrc,
      parent: imageWrap,
      style: lowResImg.style.cssText,
    });

    // add all the style attributes from lowResImg to highResImg
    hiResImage.style.cssText = lowResImg.style.cssText;

    this._elements.image = container.querySelectorAll('.iv-image');

    const onHighResImageLoad = () => {
      // remove the low size image and set this image as default image
      remove(lowResImg);
      this._elements.image = hiResImage;
      // this._calculateDimensions();
    };

    if (imageLoaded(hiResImage)) {
      onHighResImageLoad();
    } else {
      this._events.hiResImageLoad = assignEvent(hiResImage, 'load', onHighResImageLoad);
    }
  }
  _calculateDimensions () {
    const { image, container, snapView, snapImage, zoomHandle } = this._elements;

    // calculate content width of image and snap image
    const imageWidth = parseInt(css(image, 'width'), 10);
    const imageHeight = parseInt(css(image, 'height'), 10);

    const contWidth = parseInt(css(container, 'width'), 10);
    const contHeight = parseInt(css(container, 'height'), 10);

    const snapViewWidth = snapView.clientWidth;
    const snapViewHeight = snapView.clientHeight;

    // set the container dimension
    this._state.containerDim = {
      w: contWidth,
      h: contHeight,
    };

    // set the image dimension
    let imgWidth;
    let imgHeight;

    const ratio = imageWidth / imageHeight;

    imgWidth = (imageWidth > imageHeight && contHeight >= contWidth) || ratio * contHeight > contWidth
      ? contWidth
      : ratio * contHeight;

    imgHeight = imgWidth / ratio;

    this._state.imageDim = {
      w: imgWidth,
      h: imgHeight,
    };

    // reset image position and zoom
    css(image, {
      width: `${imgWidth}px`,
      height: `${imgHeight}px`,
      left: `${(contWidth - imgWidth) / 2}px`,
      top: `${(contHeight - imgHeight) / 2}px`,
      maxWidth: 'none',
      maxHeight: 'none',
    });

    // set the snap Image dimension
    const snapWidth = imgWidth > imgHeight ? snapViewWidth : imgWidth * snapViewHeight / imgHeight;
    const snapHeight = imgHeight > imgWidth ? snapViewHeight : imgHeight * snapViewWidth / imgWidth;

    this._state.snapImageDim = {
      w: snapWidth,
      h: snapHeight,
    };

    css(snapImage, {
      width: `${snapWidth}px`,
      height: `${snapHeight}px`,
    });

    // calculate zoom slider area
    this._state.zoomSliderLength = snapViewWidth - zoomHandle.offsetWidth;
  }
  resetZoom (animate = true) {
    const { zoomValue } = this._options;

    if (!animate) {
      this._state.zoomValue = zoomValue;
    }

    this.zoom(zoomValue);
  }
  zoom = (perc, point) => {
    const { _options, _elements, _state } = this;
    const { zoomValue: curPerc, imageDim, containerDim, zoomSliderLength } = _state;
    const { image, zoomHandle } = _elements;
    const { maxZoom } = _options;

    perc = Math.round(Math.max(100, perc));
    perc = Math.min(maxZoom, perc);

    point = point || {
      x: containerDim.w / 2,
      y: containerDim.h / 2,
    };

    const curLeft = parseFloat(css(image, 'left'));
    const curTop = parseFloat(css(image, 'top'));

    // clear any panning frames
    this._clearFrames();

    let step = 0;

    const baseLeft = (containerDim.w - imageDim.w) / 2;
    const baseTop = (containerDim.h - imageDim.h) / 2;
    const baseRight = containerDim.w - baseLeft;
    const baseBottom = containerDim.h - baseTop;

    const zoom = () => {
      step++;

      if (step < 16) {
        this._frames.zoomFrame = requestAnimationFrame(zoom);
      }

      const tickZoom = easeOutQuart(step, curPerc, perc - curPerc, 16);
      const ratio = tickZoom / curPerc;

      const imgWidth = imageDim.w * tickZoom / 100;
      const imgHeight = imageDim.h * tickZoom / 100;

      let newLeft = -((point.x - curLeft) * ratio - point.x);
      let newTop = -((point.y - curTop) * ratio - point.y);

      // fix for left and top
      newLeft = Math.min(newLeft, baseLeft);
      newTop = Math.min(newTop, baseTop);

      // fix for right and bottom
      if (newLeft + imgWidth < baseRight) {
        newLeft = baseRight - imgWidth; // newLeft - (newLeft + imgWidth - baseRight)
      }

      if (newTop + imgHeight < baseBottom) {
        newTop = baseBottom - imgHeight; // newTop + (newTop + imgHeight - baseBottom)
      }

      css(image, {
        height: `${imgHeight}px`,
        width: `${imgWidth}px`,
        left: `${newLeft}px`,
        top: `${newTop}px`,
      });

      this._state.zoomValue = tickZoom;

      this._resizeSnapHandle(imgWidth, imgHeight, newLeft, newTop);

      // update zoom handle position
      css(zoomHandle, {
        left: `${(tickZoom - 100) * zoomSliderLength / (maxZoom - 100)}px`,
      });
    };

    zoom();
  }
  _clearFrames = () => {
    const { slideMomentumCheck, sliderMomentumFrame, zoomFrame } = this._frames;
    clearInterval(slideMomentumCheck);
    cancelAnimationFrame(sliderMomentumFrame);
    cancelAnimationFrame(zoomFrame);
  }

  _resizeSnapHandle = (imgWidth, imgHeight, imgLeft, imgTop) => {
    const { _elements, _state } = this;
    const { snapHandle, image } = _elements;
    const { imageDim, containerDim, zoomValue, snapImageDim } = _state;

    const imageWidth = imgWidth || imageDim.w * zoomValue / 100;
    const imageHeight = imgHeight || imageDim.h * zoomValue / 100;
    const imageLeft = imgLeft || parseFloat(css(image, 'left'));
    const imageTop = imgTop || parseFloat(css(image, 'top'));

    const left = -imageLeft * snapImageDim.w / imageWidth;
    const top = -imageTop * snapImageDim.h / imageHeight;

    const handleWidth = (containerDim.w * snapImageDim.w) / imageWidth;
    const handleHeight = (containerDim.h * snapImageDim.h) / imageHeight;

    css(snapHandle, {
      top: `${top}px`,
      left: `${left}px`,
      width: `${handleWidth}px`,
      height: `${handleHeight}px`,
    });

    this._state.snapHandleDim = {
      w: handleWidth,
      h: handleHeight,
    };
  }
  showSnapView = (noTimeout) => {
    const { snapViewVisible, zoomValue, loaded } = this._state;
    const { snapView } = this._elements;

    if (!this._options.snapView) return;

    if (snapViewVisible || zoomValue <= 100 || !loaded) return;

    clearTimeout(this._frames.snapViewTimeout);

    this._state.snapViewVisible = true;

    css(snapView, { opacity: 1, pointerEvents: 'inherit' });

    if (!noTimeout) {
      this._frames.snapViewTimeout = setTimeout(this.hideSnapView, 1500);
    }
  }
  hideSnapView = () => {
    const { snapView } = this._elements;
    css(snapView, { opacity: 0, pointerEvents: 'none' });
    this._state.snapViewVisible = false;
  }
  refresh = () => {
    this._calculateDimensions();
    this.resetZoom();
  }
  load (imageSrc, hiResImageSrc) {
    this._images = {
      imageSrc,
      hiResImageSrc,
    };

    this._loadImages();
  }
  destroy () {
    const { container, domElement } = this._elements;
    // destroy all the sliders
    Object.entries(this._sliders).forEach(([key, slider]) => {
      slider.destroy();
    });

    // unbind all events
    Object.entries(this._events).forEach(([key, unbindEvent]) => {
      unbindEvent();
    });

    // clear all the frames
    this._clearFrames();

    // remove html from the container
    remove(container.querySelector('.iv-wrap'));

    // remove iv-container class from container
    removeClass(container, 'iv-container');

    // remove added style from container
    removeCss(document.querySelector('html'), 'relative');

    // if container has original image, unwrap the image and remove the class
    // which will happen when domElement is not the container
    if (domElement !== container) {
      unwrap(domElement);
    }

    // remove imageViewer reference from dom element
    domElement._imageViewer = null;
  }
}

ImageViewer.defaults = {
  zoomValue: 100,
  snapView: true,
  maxZoom: 500,
  refreshOnResize: true,
  zoomOnMouseWheel: true,
};

export default ImageViewer;
