/*
    ImageViewer v 1.1.3
    Author: Sudhanshu Yadav
    Copyright (c) 2015-2016 to Sudhanshu Yadav - ignitersworld.com , released under the MIT license.
    Demo on: http://ignitersworld.com/lab/imageViewer.html
*/
/*** picture view plugin ****/
(function(window, document, undefined) {
  'use strict';

  //an empty function
  var noop = function() {};

  // Event listeners
  var eventNamespaces = {
    container: {},
    document: {},
    imageWrap: {},
    window: {}
  };

  // Object.assign polyfill from mozilla
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
  if (typeof Object.assign != 'function') {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
      value: function assign(target, varArgs) { // .length of function is 2
        'use strict';
        if (target == null) { // TypeError if undefined or null
          throw new TypeError('Cannot convert undefined or null to object');
        }

        var to = Object(target);

        for (var index = 1; index < arguments.length; index++) {
          var nextSource = arguments[index];

          if (nextSource != null) { // Skip over if undefined or null
            for (var nextKey in nextSource) {
              // Avoid bugs when hasOwnProperty is shadowed
              if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
        return to;
      },
      writable: true,
      configurable: true
    });
  }

  // Create elements
  function createElement(options) {
    let elem = document.createElement(options.tagName)
    if (options.id) elem.id = options.id
    if (options.html) elem.innerHTML = options.html
    if (options.className) elem.className = options.className
    if (options.src) elem.src = options.src
    if (options.style) elem.style.cssText = options.style
    if (options.child) elem.appendChild(options.child)

    // Insert before
    if (options.insertBefore) {
      options.parent.insertBefore(elem, options.insertBefore)
    }
    // Standard append
    else {
      options.parent.appendChild(elem)
    }
    return elem
  }

  //constants
  var ZOOM_CONSTANT = 15; //increase or decrease value for zoom on mouse wheel
  var MOUSE_WHEEL_COUNT = 5; //A mouse delta after which it should stop preventing default behaviour of mouse wheel

  //ease out method
  /*
      t : current time,
      b : intial value,
      c : changed value,
      d : duration
  */
  function easeOutQuart(t, b, c, d) {
    t /= d;
    t--;
    return -c * (t * t * t * t - 1) + b;
  }

  // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
  // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

  // requestAnimationFrame polyfill by Erik Möller
  // fixes from Paul Irish and Tino Zijdel

  (function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
      window.cancelAnimationFrame =
        window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
      window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() {
          callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };

    if (!window.cancelAnimationFrame)
      window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
      };
  })();

  //function to check if image is loaded
  function imageLoaded(img) {
    return img.complete && (typeof img.naturalWidth === 'undefined' || img.naturalWidth !== 0);
  }

  var imageViewHtml =
    '<div class="iv-loader"></div> <div class="iv-snap-view">' +
    '<div class="iv-snap-image-wrap">' +
    '<div class="iv-snap-handle"></div>' +
    '</div>' +
    '<div class="iv-zoom-slider"><div class="iv-zoom-handle"></div></div></div>' +
    '<div class="iv-image-view" ><div class="iv-image-wrap" ></div></div>';

  //add a full screen view
  document.addEventListener('DOMContentLoaded', function() {
    createElement({
      tagName: 'div',
      id: 'iv-container',
      html: imageViewHtml + '<div class="iv-close"></div>',
      parent: document.body
    })
  });

  function Slider(container, options) {
    this.container = container;
    this.onStart = options.onStart || noop;
    this.onMove = options.onMove || noop;
    this.onEnd = options.onEnd || noop;
    this.sliderId = options.sliderId || 'slider' + Math.ceil(Math.random() * 1000000);
  }

  Slider.prototype.init = function() {
    var self = this,
      container = this.container;

    //assign event on snap image wrap
    eventNamespaces.container.touchMouse = function(eOrginal) {
      eOrginal.preventDefault();

      var touchMove = eOrginal.type == 'touchstart' ? 'touchmove' : 'mousemove',
        touchEnd = eOrginal.type == 'touchstart' ? 'touchend' : 'mouseup',
        eOrginal = eOrginal,
        sx = eOrginal.clientX || eOrginal.touches[0].clientX,
        sy = eOrginal.clientY || eOrginal.touches[0].clientY;

      var start = self.onStart(eOrginal, {
        x: sx,
        y: sy
      });

      if (start === false) return;

      var moveListener = function(eOrginal) {
        eOrginal.preventDefault();

        //get the cordinates
        var mx = eOrginal.clientX || eOrginal.touches[0].clientX,
          my = eOrginal.clientY || eOrginal.touches[0].clientY;

        self.onMove(eOrginal, {
          dx: mx - sx,
          dy: my - sy,
          mx: mx,
          my: my
        });
      };

      var endListener = function() {
        document.removeEventListener(touchMove, moveListener);
        document.removeEventListener(touchEnd, endListener);
        self.onEnd();
      };

      document.addEventListener(touchMove, moveListener);
      document.addEventListener(touchEnd, endListener);
    };
    ['touchstart', 'mousedown'].forEach(function(evt) {
      self.container.addEventListener(evt, eventNamespaces.container.touchMouse);
    });

    return this;
  };

  function ImageViewer(container, options) {
    var self = this;

    if (container.id === 'iv-container') {
      self._fullPage = true;
    }

    self.container = container;
    options = self.options = Object.assign({}, ImageViewer.defaults, options);

    self.zoomValue = 100;

    // #TODO is this required?
    if (!container.querySelector('.iv-snap-view')) {
      createElement({
        tagName: 'div',
        html: imageViewHtml,
        insertBefore: container.firstChild,
        parent: container
      })
    }

    container.classList.add('iv-container');

    if (getComputedStyle(container)['position'] === 'static') container.style.position = 'relative';

    self.snapView = container.querySelector('.iv-snap-view');
    self.snapImageWrap = container.querySelector('.iv-snap-image-wrap');
    self.imageWrap = container.querySelector('.iv-image-wrap');
    self.snapHandle = container.querySelector('.iv-snap-handle');
    self.zoomHandle = container.querySelector('.iv-zoom-handle');
    self._viewerId = 'iv' + Math.floor(Math.random() * 1000000);
  }

  ImageViewer.prototype = {
    constructor: ImageViewer,
    _init: function() {
      var viewer = this,
        options = viewer.options,
        zooming = false, // tell weather we are zooming trough touch
        container = this.container;

      //cache dom refrence
      var snapHandle = this.snapHandle;
      var snapImgWrap = this.snapImageWrap;
      var imageWrap = this.imageWrap;

      var snapSlider = new Slider(snapImgWrap, {
        sliderId: viewer._viewerId,
        onStart: function() {
          if (!viewer.loaded) return false;

          var handleStyle = snapHandle.style;

          this.curHandleTop = parseFloat(handleStyle.top);
          this.curHandleLeft = parseFloat(handleStyle.left);
          this.handleWidth = parseFloat(handleStyle.width);
          this.handleHeight = parseFloat(handleStyle.height);
          this.width = parseInt(getComputedStyle(snapImgWrap)['width'], 10);
          this.height = parseInt(getComputedStyle(snapImgWrap)['height'], 10);

          //stop momentum on image
          clearInterval(imageSlider.slideMomentumCheck);
          cancelAnimationFrame(imageSlider.sliderMomentumFrame);
        },
        onMove: function(e, position) {
          var xPerc = this.curHandleLeft + position.dx * 100 / this.width,
            yPerc = this.curHandleTop + position.dy * 100 / this.height;

          xPerc = Math.max(0, xPerc);
          xPerc = Math.min(100 - this.handleWidth, xPerc);

          yPerc = Math.max(0, yPerc);
          yPerc = Math.min(100 - this.handleHeight, yPerc);

          var containerDim = viewer.containerDim,
            imgWidth = viewer.imageDim.w * (viewer.zoomValue / 100),
            imgHeight = viewer.imageDim.h * (viewer.zoomValue / 100),
            imgLeft = imgWidth < containerDim.w ? (containerDim.w - imgWidth) / 2 : -imgWidth * xPerc / 100,
            imgTop = imgHeight < containerDim.h ? (containerDim.h - imgHeight) / 2 : -imgHeight * yPerc / 100;

          snapHandle.style.top = yPerc + '%';
          snapHandle.style.left = xPerc + '%';

          viewer.currentImg.style.left = imgLeft + 'px';
          viewer.currentImg.style.top = imgTop + 'px';
        }
      }).init();

      /*Add slide interaction to image*/
      var imageSlider = (viewer._imageSlider = new Slider(imageWrap, {
        sliderId: viewer._viewerId,
        onStart: function(e, position) {
          if (!viewer.loaded) return false;
          if (zooming) return;
          var self = this;
          snapSlider.onStart();
          self.imgWidth = viewer.imageDim.w * viewer.zoomValue / 100;
          self.imgHeight = viewer.imageDim.h * viewer.zoomValue / 100;
          self.positions = [position, position];
          self.startPosition = position;

          //clear all animation frame and interval
          viewer._clearFrames();

          self.slideMomentumCheck = setInterval(function() {
            if (!self.currentPos) return;
            self.positions.shift();
            self.positions.push({
              x: self.currentPos.mx,
              y: self.currentPos.my
            });
          }, 50);
        },
        onMove: function(e, position) {
          if (zooming) return;
          this.currentPos = position;

          snapSlider.onMove(e, {
            dx: -position.dx * snapSlider.width / this.imgWidth,
            dy: -position.dy * snapSlider.height / this.imgHeight
          });
        },
        onEnd: function() {
          if (zooming) return;
          var self = this;

          var xDiff = this.positions[1].x - this.positions[0].x,
            yDiff = this.positions[1].y - this.positions[0].y;

          function momentum() {
            if (step <= 60) {
              self.sliderMomentumFrame = requestAnimationFrame(momentum);
            }

            positionX = positionX + easeOutQuart(step, xDiff / 3, -xDiff / 3, 60);
            positionY = positionY + easeOutQuart(step, yDiff / 3, -yDiff / 3, 60);

            snapSlider.onMove(null, {
              dx: -(positionX * snapSlider.width / self.imgWidth),
              dy: -(positionY * snapSlider.height / self.imgHeight)
            });
            step++;
          }

          if (Math.abs(xDiff) > 30 || Math.abs(yDiff) > 30) {
            var step = 1,
              positionX = self.currentPos.dx,
              positionY = self.currentPos.dy;

            momentum();
          }
        }
      }).init());

      /*Add zoom interation in mouse wheel*/
      var changedDelta = 0;
      eventNamespaces.imageWrap.mouseWheel = function(e) {
        if (!options.zoomOnMouseWheel) return;

        if (!viewer.loaded) return;

        //clear all animation frame and interval
        viewer._clearFrames();

        // cross-browser wheel delta
        var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail)),
          zoomValue = viewer.zoomValue * (100 + delta * ZOOM_CONSTANT) / 100;

        if (!(zoomValue >= 100 && zoomValue <= options.maxZoom)) {
          changedDelta += Math.abs(delta);
        } else {
          changedDelta = 0;
        }

        if (changedDelta > MOUSE_WHEEL_COUNT) return;

        e.preventDefault();

        var contOffset = container.getBoundingClientRect(),
          x = (e.pageX || e.pageX) - (contOffset.left + document.body.scrollLeft),
          y = (e.pageY || e.pageY) - (contOffset.top + document.body.scrollTop);

        viewer.zoom(zoomValue, {
          x: x,
          y: y
        });

        //show the snap viewer
        showSnapView();
      };
      ['mousewheel', 'DOMMouseScroll'].forEach(function(evt) {
        imageWrap.addEventListener(evt, eventNamespaces.imageWrap.mouseWheel);
      });

      //apply pinch and zoom feature
      eventNamespaces.imageWrap.touchStart = function(estart) {
        if (!viewer.loaded) return;
        var touch0 = estart.touches[0],
          touch1 = estart.touches[1];

        if (!(touch0 && touch1)) {
          return;
        }

        zooming = true;

        var contOffset = container.getBoundingClientRect();

        var startdist = Math.sqrt(Math.pow(touch1.pageX - touch0.pageX, 2) + Math.pow(touch1.pageY - touch0.pageY, 2)),
          startZoom = viewer.zoomValue,
          center = {
            x: (touch1.pageX + touch0.pageX) / 2 - (contOffset.left + document.body.scrollLeft),
            y: (touch1.pageY + touch0.pageY) / 2 - (contOffset.top + document.body.scrollTop)
          };

        var moveListener = function(emove) {
          emove.preventDefault();

          var touch0 = emove.touches[0],
            touch1 = emove.touches[1],
            newDist = Math.sqrt(Math.pow(touch1.pageX - touch0.pageX, 2) + Math.pow(touch1.pageY - touch0.pageY, 2)),
            zoomValue = startZoom + (newDist - startdist) / 2;

          viewer.zoom(zoomValue, center);
        };

        var endListener = function() {
          document.removeEventListener('touchmove', moveListener);
          document.removeEventListener('touchend', endListener);
          zooming = false;
        };

        document.addEventListener('touchmove', moveListener);
        document.addEventListener('touchend', endListener);
      };
      imageWrap.addEventListener('touchstart', eventNamespaces.imageWrap.touchStart);

      //handle double tap for zoom in and zoom out
      var touchtime = 0,
        point;
      eventNamespaces.imageWrap.click = function(e) {
        if (touchtime == 0) {
          touchtime = Date.now();
          point = {
            x: e.pageX,
            y: e.pageY
          };
        } else {
          if (Date.now() - touchtime < 500 && Math.abs(e.pageX - point.x) < 50 && Math.abs(e.pageY - point.y) < 50) {
            if (viewer.zoomValue == options.zoomValue) {
              viewer.zoom(200);
            } else {
              viewer.resetZoom();
            }
            touchtime = 0;
          } else {
            touchtime = 0;
          }
        }
      };
      imageWrap.addEventListener('click', eventNamespaces.imageWrap.click);

      //zoom in zoom out using zoom handle
      var slider = viewer.snapView.querySelector('.iv-zoom-slider');
      var zoomSlider = new Slider(slider, {
        sliderId: viewer._viewerId,
        onStart: function(eStart) {
          if (!viewer.loaded) return false;

          this.leftOffset = slider.getBoundingClientRect().left + document.body.scrollLeft;
          this.handleWidth = parseInt(getComputedStyle(viewer.zoomHandle)['width'], 10);
          this.onMove(eStart);
        },
        onMove: function(e, position) {
          var newLeft = (e.pageX || e.touches[0].pageX) - this.leftOffset - this.handleWidth / 2;

          newLeft = Math.max(0, newLeft);
          newLeft = Math.min(viewer._zoomSliderLength, newLeft);

          var zoomValue = 100 + (options.maxZoom - 100) * newLeft / viewer._zoomSliderLength;

          viewer.zoom(zoomValue);
        }
      }).init();

      //display snapView on interaction
      var snapViewTimeout, snapViewVisible;

      function showSnapView(noTimeout) {
        if (!options.snapView) return;

        if (snapViewVisible || viewer.zoomValue <= 100 || !viewer.loaded) return;
        clearTimeout(snapViewTimeout);
        snapViewVisible = true;
        viewer.snapView.style.opacity = 1;
        if (!noTimeout) {
          snapViewTimeout = setTimeout(function() {
            viewer.snapView.style.opacity = 0;
            snapViewVisible = false;
          }, 4000);
        }
      }

      eventNamespaces.imageWrap.touchMouseMove = function(e) {
        showSnapView();
      };
      ['touchMove', 'mouseMove'].forEach(function(evt) {
        imageWrap.addEventListener(evt, eventNamespaces.imageWrap.touchMouseMove);
      });

      eventNamespaces.imageWrap.mouseEnter = function(e) {
        snapViewVisible = false;
        showSnapView(true);
      };
      ['mouseEnter', 'touchStart'].forEach(function(evt) {
        imageWrap.addEventListener(evt, eventNamespaces.imageWrap.mouseEnter);
      });

      eventNamespaces.imageWrap.mouseLeave = function(e) {
        snapViewVisible = false;
        showSnapView();
      };
      ['mouseleave', 'touchend'].forEach(function(evt) {
        imageWrap.addEventListener(evt, eventNamespaces.imageWrap.mouseLeave);
      });

      //calculate elments size on window resize
      if (options.refreshOnResize) {
        eventNamespaces.window.windowResize = function() {
          viewer.refresh();
        };
        window.addEventListener('resize', eventNamespaces.window.windowResize);
      }

      if (viewer._fullPage) {
        //prevent scrolling the backside if container if fixed positioned
        eventNamespaces.container.prevDef = function(e) {
          e.preventDefault();
        };
        ['touchmove', 'mousewheel', 'DOMMouseScroll'].forEach(function(evt) {
          container.addEventListener(evt, eventNamespaces.container.prevDef);
        });

        //assign event on close button
        eventNamespaces.container.ivCloseClick = function() {
          viewer.hide();
        };
        container.querySelector('.iv-close').addEventListener('click', eventNamespaces.container.ivCloseClick);
      }
    },

    //method to zoom images
    zoom: function(perc, point) {
      perc = Math.round(Math.max(100, perc));
      perc = Math.min(this.options.maxZoom, perc);

      point = point || {
        x: this.containerDim.w / 2,
        y: this.containerDim.h / 2
      };

      var self = this,
        maxZoom = this.options.maxZoom,
        curPerc = this.zoomValue,
        curImg = this.currentImg,
        containerDim = this.containerDim,
        curLeft = parseFloat(getComputedStyle(curImg)['left']),
        curTop = parseFloat(getComputedStyle(curImg)['top']);

      self._clearFrames();

      var step = 0;

      //calculate base top,left,bottom,right
      var containerDim = self.containerDim,
        imageDim = self.imageDim;
      var baseLeft = (containerDim.w - imageDim.w) / 2,
        baseTop = (containerDim.h - imageDim.h) / 2,
        baseRight = containerDim.w - baseLeft,
        baseBottom = containerDim.h - baseTop;

      function zoom() {
        step++;

        if (step < 20) {
          self._zoomFrame = requestAnimationFrame(zoom);
        }

        var tickZoom = easeOutQuart(step, curPerc, perc - curPerc, 20);

        var ratio = tickZoom / curPerc,
          imgWidth = self.imageDim.w * tickZoom / 100,
          imgHeight = self.imageDim.h * tickZoom / 100,
          newLeft = -((point.x - curLeft) * ratio - point.x),
          newTop = -((point.y - curTop) * ratio - point.y);

        //fix for left and top
        newLeft = Math.min(newLeft, baseLeft);
        newTop = Math.min(newTop, baseTop);

        //fix for right and bottom
        if (newLeft + imgWidth < baseRight) {
          newLeft = baseRight - imgWidth; //newLeft - (newLeft + imgWidth - baseRight)
        }

        if (newTop + imgHeight < baseBottom) {
          newTop = baseBottom - imgHeight; //newTop + (newTop + imgHeight - baseBottom)
        }

        curImg.style.height = imgHeight + 'px';
        curImg.style.width = imgWidth + 'px';
        curImg.style.left = newLeft + 'px';
        curImg.style.top = newTop + 'px';
        self.zoomValue = tickZoom;
        self._resizeHandle(imgWidth, imgHeight, newLeft, newTop);

        //update zoom handle position
        self.zoomHandle.style.left = (tickZoom - 100) * self._zoomSliderLength / (maxZoom - 100) + 'px';
      }

      zoom();
    },
    _clearFrames: function() {
      clearInterval(this._imageSlider.slideMomentumCheck);
      cancelAnimationFrame(this._imageSlider.sliderMomentumFrame);
      cancelAnimationFrame(this._zoomFrame);
    },
    resetZoom: function() {
      this.zoom(this.options.zoomValue);
    },
    //calculate dimensions of image, container and reset the image
    _calculateDimensions: function() {
      //calculate content width of image and snap image
      var self = this,
        curImg = self.currentImg,
        container = self.container,
        snapView = self.snapView,
        imageWidth = parseInt(getComputedStyle(curImg)['width'], 10),
        imageHeight = parseInt(getComputedStyle(curImg)['height'], 10),
        contWidth = parseInt(getComputedStyle(container)['width'], 10),
        contHeight = parseInt(getComputedStyle(container)['height'], 10),
        snapViewWidth = snapView.clientWidth,
        snapViewHeight = snapView.clientHeight;

      //set the container dimension
      self.containerDim = {
        w: contWidth,
        h: contHeight
      };

      //set the image dimension
      var imgWidth,
        imgHeight,
        ratio = imageWidth / imageHeight;

      imgWidth =
        (imageWidth > imageHeight && contHeight >= contWidth) || ratio * contHeight > contWidth
          ? contWidth
          : ratio * contHeight;

      imgHeight = imgWidth / ratio;

      self.imageDim = {
        w: imgWidth,
        h: imgHeight
      };

      //reset image position and zoom
      curImg.style.width = imgWidth + 'px';
      curImg.style.height = imgHeight + 'px';
      curImg.style.left = (contWidth - imgWidth) / 2 + 'px';
      curImg.style.top = (contHeight - imgHeight) / 2 + 'px';
      curImg.style.maxWidth = 'none';
      curImg.style.maxHeight = 'none';

      //set the snap Image dimension
      var snapWidth = imgWidth > imgHeight ? snapViewWidth : imgWidth * snapViewHeight / imgHeight,
        snapHeight = imgHeight > imgWidth ? snapViewHeight : imgHeight * snapViewWidth / imgWidth;

      self.snapImg.style.width = snapWidth + 'px';
      self.snapImg.style.height = snapHeight + 'px';

      //calculate zoom slider area
      self._zoomSliderLength = snapViewWidth - self.zoomHandle.offsetWidth;
    },
    refresh: function() {
      if (!this.loaded) return;
      this._calculateDimensions();
      this.resetZoom();
    },
    _resizeHandle: function(imgWidth, imgHeight, imgLeft, imgTop) {
      var curImg = this.currentImg,
        imageWidth = imgWidth || this.imageDim.w * this.zoomValue / 100,
        imageHeight = imgHeight || this.imageDim.h * this.zoomValue / 100,
        left = Math.max(-(imgLeft || parseFloat(getComputedStyle(curImg)['left'])) * 100 / imageWidth, 0),
        top = Math.max(-(imgTop || parseFloat(getComputedStyle(curImg)['top'])) * 100 / imageHeight, 0),
        handleWidth = Math.min(this.containerDim.w * 100 / imageWidth, 100),
        handleHeight = Math.min(this.containerDim.h * 100 / imageHeight, 100);

      this.snapHandle.style.top = top + '%';
      this.snapHandle.style.left = left + '%';
      this.snapHandle.style.width = handleWidth + '%';
      this.snapHandle.style.height = handleHeight + '%';
    },
    show: function(image, hiResImg) {
      var self = this;
      if (this._fullPage) {
        this.container.style.display = 'block';
        if (image) this.load(image, hiResImg);
        //press escape to close
        eventNamespaces.document.escape = function(e) {
          if (e.keyCode === 27 || e.key === 'Escape') self.hide();
        };
        document.addEventListener('keyup', eventNamespaces.document.escape);
      }
    },
    hide: function() {
      if (this._fullPage) {
        this.container.style.display = 'none';
        document.removeEventListener('keyup', eventNamespaces.document.escape);
      }
    },
    options: function(key, value) {
      if (!value) return this.options[key];

      this.options[key] = value;
    },
    destroy: function(key, value) {
      if (this._fullPage) {
        container
          .querySelector('.iv-close')
          .removeEventListener('click', eventNamespaces.container.ivCloseClick)
          [('touchmove', 'mousewheel', 'DOMMouseScroll')].forEach(function(evt) {
            container.removeEventListener(evt, eventNamespaces.container.prevDef);
          });
        ['touchstart', 'mousedown'].forEach(function(evt) {
          container.removeEventListener(evt, eventNamespaces.container.touchMouse);
        });
        ['mousewheel', 'DOMMouseScroll'].forEach(function(evt) {
          imageWrap.removeEventListener(evt, eventNamespaces.imageWrap.mouseWheel);
        });
        ['touchMove', 'mouseMove'].forEach(function(evt) {
          imageWrap.removeEventListener(evt, eventNamespaces.imageWrap.touchMouseMove);
        });
        ['mouseEnter', 'touchStart'].forEach(function(evt) {
          imageWrap.removeEventListener(evt, eventNamespaces.imageWrap.mouseEnter);
        });
        ['mouseleave', 'touchend'].forEach(function(evt) {
          imageWrap.removeEventListener(evt, eventNamespaces.imageWrap.mouseLeave);
        });
        imageWrap.removeEventListener('touchstart', eventNamespaces.imageWrap.touchStart);
      } else {
        this.container.remove('[class^="iv"]');
      }
      window.removeEventListener('resize', eventNamespaces.window.windowResize);
      return null;
    },
    load: function(image, hiResImg) {
      var self = this,
        container = this.container;

      container.querySelectorAll('.iv-snap-image,.iv-large-image').forEach(function(elem) {
        elem.parentNode.removeChild(elem);
      });

      var snapImageWrap = this.container.querySelector('.iv-snap-image-wrap');
      createElement({
        tagName: 'img',
        className: 'iv-snap-image',
        src: image,
        insertBefore: snapImageWrap.firstChild,
        parent: snapImageWrap
      })
      createElement({
        tagName: 'img',
        className: 'iv-large-image',
        src: hiResImg || image,
        insertBefore: this.imageWrap.firstChild,
        parent: this.imageWrap
      })

      var currentImg = (this.currentImg = this.container.querySelector('.iv-large-image'));
      this.snapImg = this.container.querySelector('.iv-snap-image');
      self.loaded = false;

      //show loader
      container.querySelector('.iv-loader').style.display = 'block';
      currentImg.style.display = 'none';
      self.snapImg.style.display = 'none';

      //refresh the view
      function refreshView() {
        self.loaded = true;
        self.zoomValue = 100;

        //reset zoom of images
        currentImg.style.display = 'block';
        self.snapImg.style.display = 'inline';
        self.refresh();
        self.resetZoom();

        //hide loader
        container.querySelector('.iv-loader').style.display = 'none';
      }

      if (imageLoaded(currentImg)) {
        refreshView();
      } else {
        currentImg.addEventListener('load', refreshView);
      }
    }
  };

  ImageViewer.defaults = {
    zoomValue: 100,
    snapView: true,
    maxZoom: 500,
    refreshOnResize: true,
    zoomOnMouseWheel: true
  };

  window.ImageViewer = function(container, options) {
    var imgElm, imgSrc, hiResImg;
    if (
      !(container && (typeof container == 'string' || container instanceof Element || container[0] instanceof Element))
    ) {
      options = container;
      container = document.querySelector('#iv-container');
    }
    if (typeof container === 'string') container = document.querySelector(container);

    if (container.tagName === 'IMG') {
      imgElm = container;
      imgSrc = imgElm.src;
      hiResImg = imgElm.getAttribute('high-res-src') || imgElm.getAttribute('data-high-res-src');
      var parent = imgElm.parentNode;
      parent.removeChild(imgElm);
      imgElm.style.opacity = 0;
      imgElm.style.position = 'relative';
      imgElm.style.zIndex = -1;

      container = createElement({
        tagName: 'div',
        className: 'iv-container',
        style: 'display:inline-block;overflow:hidden;',
        child: imgElm,
        parent: parent,
      })
    } else {
      imgSrc = container.getAttribute('src') || container.getAttribute('data-src');
      hiResImg = container.getAttribute('high-res-src') || container.getAttribute('data-high-res-src');
    }

    var viewer = new ImageViewer(container, options);
    viewer._init();

    if (imgSrc) viewer.load(imgSrc, hiResImg);

    return viewer;
  };

  if (typeof $ !== 'undefined') {
    $.fn.ImageViewer = function (options) {
        return this.each(function () {
            var $this = $(this);
            var viewer = window.ImageViewer($this, options);
            $this.data('ImageViewer', viewer);
        });
    }
  }

})(window, document);
