/**
 * iv-viewer - 2.2.0
 * Author : Sudhanshu Yadav
 * Copyright (c) 2019, 2024 to Sudhanshu Yadav, released under the MIT license.
 * git+https://github.com/s-yadav/iv-viewer.git
 */

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
function _assertThisInitialized(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function _callSuper(t, o, e) {
  return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}
function _get() {
  return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) {
    var p = _superPropBase(e, t);
    if (p) {
      var n = Object.getOwnPropertyDescriptor(p, t);
      return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value;
    }
  }, _get.apply(null, arguments);
}
function _getPrototypeOf(t) {
  return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, _getPrototypeOf(t);
}
function _inherits(t, e) {
  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && _setPrototypeOf(t, e);
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch (t) {}
  return (_isNativeReflectConstruct = function () {
    return !!t;
  })();
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _possibleConstructorReturn(t, e) {
  if (e && ("object" == typeof e || "function" == typeof e)) return e;
  if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
  return _assertThisInitialized(t);
}
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
    return t.__proto__ = e, t;
  }, _setPrototypeOf(t, e);
}
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _superPropBase(t, o) {
  for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t)););
  return t;
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

// constants
var ZOOM_CONSTANT = 15; // increase or decrease value for zoom on mouse wheel
var MOUSE_WHEEL_COUNT = 5; // A mouse delta after which it should stop preventing default behaviour of mouse wheel

function noop() {}

// ease out method
/*
    t : current time,
    b : initial value,
    c : changed value,
    d : duration
*/
function easeOutQuart(t, b, c, d) {
  t /= d;
  t -= 1;
  return -c * (t * t * t * t - 1) + b;
}
function createElement(options) {
  var elem = document.createElement(options.tagName);
  if (options.id) elem.id = options.id;
  if (options.html) elem.innerHTML = options.html;
  if (options.className) elem.className = options.className;
  if (options.src) elem.src = options.src;
  if (options.style) elem.style.cssText = options.style;
  if (options.child) elem.appendChild(options.child);

  // Insert before
  if (options.insertBefore) {
    options.parent.insertBefore(elem, options.insertBefore);

    // Standard append
  } else {
    options.parent.appendChild(elem);
  }
  return elem;
}

// method to add class
function addClass(el, className) {
  var classNameAry = className.split(' ');
  if (classNameAry.length > 1) {
    classNameAry.forEach(function (classItem) {
      return addClass(el, classItem);
    });
  } else if (el.classList) {
    el.classList.add(className);
  } else {
    el.className += " ".concat(className); // eslint-disable-line no-param-reassign
  }
}

// method to remove class
function removeClass(el, className) {
  var classNameAry = className.split(' ');
  if (classNameAry.length > 1) {
    classNameAry.forEach(function (classItem) {
      return removeClass(el, classItem);
    });
  } else if (el.classList) {
    el.classList.remove(className);
  } else {
    el.className = el.className.replace(new RegExp("(^|\\b)".concat(className.split(' ').join('|'), "(\\b|$)"), 'gi'), ' '); // eslint-disable-line no-param-reassign
  }
}

// function to check if image is loaded
function imageLoaded(img) {
  return img.complete && (typeof img.naturalWidth === 'undefined' || img.naturalWidth !== 0);
}
function toArray(list) {
  if (!(list instanceof NodeList || list instanceof HTMLCollection)) return [list];
  return Array.prototype.slice.call(list);
}
function css(elements, properties) {
  var elmArray = toArray(elements);
  if (typeof properties === 'string') {
    return window.getComputedStyle(elmArray[0])[properties];
  }
  elmArray.forEach(function (element) {
    Object.keys(properties).forEach(function (key) {
      var value = properties[key];
      element.style[key] = value; // eslint-disable-line no-param-reassign
    });
  });

  return undefined;
}
function removeCss(element, property) {
  element.style.removeProperty(property);
}
function wrap(element, _ref) {
  var _ref$tag = _ref.tag,
    tag = _ref$tag === void 0 ? 'div' : _ref$tag,
    className = _ref.className,
    id = _ref.id,
    style = _ref.style;
  var wrapper = document.createElement(tag);
  if (className) wrapper.className = className;
  if (id) wrapper.id = id;
  if (style) wrapper.style = style;
  element.parentNode.insertBefore(wrapper, element);
  element.parentNode.removeChild(element);
  wrapper.appendChild(element);
  return wrapper;
}
function unwrap(element) {
  var parent = element.parentNode;
  if (parent !== document.body) {
    parent.parentNode.insertBefore(element, parent);
    parent.parentNode.removeChild(parent);
  }
}
function remove(elements) {
  var elmArray = toArray(elements);
  elmArray.forEach(function (element) {
    element.parentNode.removeChild(element);
  });
}
function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}
function assignEvent(element, events, handler) {
  if (typeof events === 'string') events = [events];
  events.forEach(function (event) {
    element.addEventListener(event, handler);
  });
  return function () {
    events.forEach(function (event) {
      element.removeEventListener(event, handler);
    });
  };
}
function getTouchPointsDistance(touches) {
  var touch0 = touches[0];
  var touch1 = touches[1];
  return Math.sqrt(Math.pow(touch1.pageX - touch0.pageX, 2) + Math.pow(touch1.pageY - touch0.pageY, 2));
}

var Slider = /*#__PURE__*/function () {
  function Slider(container, _ref) {
    var _this = this;
    var _onStart = _ref.onStart,
      _onMove = _ref.onMove,
      onEnd = _ref.onEnd,
      isSliderEnabled = _ref.isSliderEnabled;
    _classCallCheck(this, Slider);
    _defineProperty(this, "startHandler", function (eStart) {
      if (!_this.isSliderEnabled()) return;
      _this.removeListeners();
      eStart.preventDefault();
      var moveHandler = _this.moveHandler,
        endHandler = _this.endHandler,
        onStart = _this.onStart;
      var isTouchEvent = eStart.type === 'touchstart' || eStart.type === 'touchend';
      _this.touchMoveEvent = isTouchEvent ? 'touchmove' : 'mousemove';
      _this.touchEndEvent = isTouchEvent ? 'touchend' : 'mouseup';
      _this.sx = isTouchEvent ? eStart.touches[0].clientX : eStart.clientX;
      _this.sy = isTouchEvent ? eStart.touches[0].clientY : eStart.clientY;
      onStart(eStart, {
        x: _this.sx,
        y: _this.sy
      });

      // add listeners
      document.addEventListener(_this.touchMoveEvent, moveHandler);
      document.addEventListener(_this.touchEndEvent, endHandler);
      /*
        add end handler in context menu as well.
        As mouseup event is not trigger on context menu open
        https://bugs.chromium.org/p/chromium/issues/detail?id=506801
      */
      document.addEventListener('contextmenu', endHandler);
    });
    _defineProperty(this, "moveHandler", function (eMove) {
      if (!_this.isSliderEnabled()) return;
      eMove.preventDefault();
      var sx = _this.sx,
        sy = _this.sy,
        onMove = _this.onMove;
      var isTouchEvent = _this.touchMoveEvent === 'touchmove';

      // get the coordinates
      var mx = isTouchEvent ? eMove.touches[0].clientX : eMove.clientX;
      var my = isTouchEvent ? eMove.touches[0].clientY : eMove.clientY;
      onMove(eMove, {
        dx: mx - sx,
        dy: my - sy,
        mx: mx,
        my: my
      });
    });
    _defineProperty(this, "endHandler", function () {
      if (!_this.isSliderEnabled()) return;
      _this.removeListeners();
      _this.onEnd();
    });
    this.container = container;
    this.isSliderEnabled = isSliderEnabled;
    this.onStart = _onStart || noop;
    this.onMove = _onMove || noop;
    this.onEnd = onEnd || noop;
  }
  return _createClass(Slider, [{
    key: "removeListeners",
    value:
    // remove previous events if its not removed
    // - Case when while sliding mouse moved out of document and released there
    function removeListeners() {
      if (!this.touchMoveEvent) return;
      document.removeEventListener(this.touchMoveEvent, this.moveHandler);
      document.removeEventListener(this.touchEndEvent, this.endHandler);
      document.removeEventListener('contextmenu', this.endHandler);
    }
  }, {
    key: "init",
    value: function init() {
      var _this2 = this;
      ['touchstart', 'mousedown'].forEach(function (evt) {
        _this2.container.addEventListener(evt, _this2.startHandler);
      });
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this3 = this;
      ['touchstart', 'mousedown'].forEach(function (evt) {
        _this3.container.removeEventListener(evt, _this3.startHandler);
      });
      this.removeListeners();
    }
  }]);
}();

var ImageViewer = /*#__PURE__*/function () {
  function ImageViewer(element) {
    var _this = this;
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, ImageViewer);
    _defineProperty(this, "zoom", function (perc, point) {
      var _options = _this._options,
        _elements = _this._elements,
        _state = _this._state;
      var curPerc = _state.zoomValue,
        imageDim = _state.imageDim,
        containerDim = _state.containerDim,
        zoomSliderLength = _state.zoomSliderLength;
      var image = _elements.image,
        zoomHandle = _elements.zoomHandle;
      var maxZoom = _options.maxZoom;
      perc = Math.round(Math.max(100, perc));
      perc = Math.min(maxZoom, perc);
      point = point || {
        x: containerDim.w / 2,
        y: containerDim.h / 2
      };
      var curLeft = parseFloat(css(image, 'left'));
      var curTop = parseFloat(css(image, 'top'));

      // clear any panning frames
      _this._clearFrames();
      var step = 0;
      var baseLeft = (containerDim.w - imageDim.w) / 2;
      var baseTop = (containerDim.h - imageDim.h) / 2;
      var baseRight = containerDim.w - baseLeft;
      var baseBottom = containerDim.h - baseTop;
      var zoom = function zoom() {
        step++;
        if (step < 16) {
          _this._frames.zoomFrame = requestAnimationFrame(zoom);
        }
        var tickZoom = easeOutQuart(step, curPerc, perc - curPerc, 16);
        // snap in at the last percent to more often land at the exact value
        // only do that at the target percent value to make the animation as smooth as possible
        if (Math.abs(perc - tickZoom) < 1) {
          tickZoom = perc;
        }
        var ratio = tickZoom / curPerc;
        var imgWidth = imageDim.w * tickZoom / 100;
        var imgHeight = imageDim.h * tickZoom / 100;
        var newLeft = -((point.x - curLeft) * ratio - point.x);
        var newTop = -((point.y - curTop) * ratio - point.y);

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
          height: "".concat(imgHeight, "px"),
          width: "".concat(imgWidth, "px"),
          left: "".concat(newLeft, "px"),
          top: "".concat(newTop, "px")
        });
        _this._state.zoomValue = tickZoom;
        _this._resizeSnapHandle(imgWidth, imgHeight, newLeft, newTop);

        // update zoom handle position
        css(zoomHandle, {
          left: "".concat((tickZoom - 100) * zoomSliderLength / (maxZoom - 100), "px")
        });

        // dispatch zoom changed event
        if (_this._listeners.onZoomChange) {
          _this._listeners.onZoomChange(_this._callbackData);
        }
      };
      zoom();
    });
    _defineProperty(this, "_clearFrames", function () {
      var _this$_frames = _this._frames,
        slideMomentumCheck = _this$_frames.slideMomentumCheck,
        sliderMomentumFrame = _this$_frames.sliderMomentumFrame,
        zoomFrame = _this$_frames.zoomFrame;
      clearInterval(slideMomentumCheck);
      cancelAnimationFrame(sliderMomentumFrame);
      cancelAnimationFrame(zoomFrame);
    });
    _defineProperty(this, "_resizeSnapHandle", function (imgWidth, imgHeight, imgLeft, imgTop) {
      var _elements = _this._elements,
        _state = _this._state;
      var snapHandle = _elements.snapHandle,
        image = _elements.image;
      var imageDim = _state.imageDim,
        containerDim = _state.containerDim,
        zoomValue = _state.zoomValue,
        snapImageDim = _state.snapImageDim;
      var imageWidth = imgWidth || imageDim.w * zoomValue / 100;
      var imageHeight = imgHeight || imageDim.h * zoomValue / 100;
      var imageLeft = imgLeft || parseFloat(css(image, 'left'));
      var imageTop = imgTop || parseFloat(css(image, 'top'));
      var left = -imageLeft * snapImageDim.w / imageWidth;
      var top = -imageTop * snapImageDim.h / imageHeight;
      var handleWidth = containerDim.w * snapImageDim.w / imageWidth;
      var handleHeight = containerDim.h * snapImageDim.h / imageHeight;
      css(snapHandle, {
        top: "".concat(top, "px"),
        left: "".concat(left, "px"),
        width: "".concat(handleWidth, "px"),
        height: "".concat(handleHeight, "px")
      });
      _this._state.snapHandleDim = {
        w: handleWidth,
        h: handleHeight
      };
    });
    _defineProperty(this, "showSnapView", function (noTimeout) {
      var _this$_state = _this._state,
        snapViewVisible = _this$_state.snapViewVisible,
        zoomValue = _this$_state.zoomValue,
        loaded = _this$_state.loaded;
      var snapView = _this._elements.snapView;
      if (!_this._options.snapView) return;
      if (snapViewVisible || zoomValue <= 100 || !loaded) return;
      clearTimeout(_this._frames.snapViewTimeout);
      _this._state.snapViewVisible = true;
      css(snapView, {
        opacity: 1,
        pointerEvents: 'inherit'
      });
      if (!noTimeout) {
        _this._frames.snapViewTimeout = setTimeout(_this.hideSnapView, 1500);
      }
    });
    _defineProperty(this, "hideSnapView", function () {
      var snapView = _this._elements.snapView;
      css(snapView, {
        opacity: 0,
        pointerEvents: 'none'
      });
      _this._state.snapViewVisible = false;
    });
    _defineProperty(this, "refresh", function () {
      var animate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      _this._calculateDimensions();
      _this.resetZoom();
    });
    var _this$_findContainerA = this._findContainerAndImageSrc(element, options),
      container = _this$_findContainerA.container,
      domElement = _this$_findContainerA.domElement,
      imageSrc = _this$_findContainerA.imageSrc,
      hiResImageSrc = _this$_findContainerA.hiResImageSrc;

    // containers for elements
    this._elements = {
      container: container,
      domElement: domElement
    };
    this._options = _objectSpread2(_objectSpread2({}, ImageViewer.defaults), options);

    // container for all events
    this._events = {};
    this._listeners = this._options.listeners || {};

    // container for all timeout and frames
    this._frames = {};

    // container for all sliders
    this._sliders = {};

    // maintain current state
    this._state = {
      zoomValue: this._options.zoomValue
    };
    this._images = {
      imageSrc: imageSrc,
      hiResImageSrc: hiResImageSrc
    };
    this._init();
    if (imageSrc) {
      this._loadImages();
    }

    // store reference of imageViewer in domElement
    domElement._imageViewer = this;
  }
  return _createClass(ImageViewer, [{
    key: "zoomInButton",
    get: function get() {
      return this._options.hasZoomButtons ? "<div class=\"iv-button-zoom--in\" role=\"button\"></div>" : '';
    }
  }, {
    key: "zoomOutButton",
    get: function get() {
      return this._options.hasZoomButtons ? "<div class=\"iv-button-zoom--out\" role=\"button\"></div>" : '';
    }
  }, {
    key: "imageViewHtml",
    get: function get() {
      return "\n    <div class=\"iv-loader\"></div>\n    <div class=\"iv-snap-view\">\n      <div class=\"iv-snap-image-wrap\">\n        <div class=\"iv-snap-handle\"></div>\n      </div>\n      <div class=\"iv-zoom-actions ".concat(this._options.hasZoomButtons ? 'iv-zoom-actions--has-buttons' : '', "\">\n        ").concat(this.zoomInButton, "\n        <div class=\"iv-zoom-slider\">\n          <div class=\"iv-zoom-handle\"></div>\n        </div>\n        ").concat(this.zoomOutButton, "\n      </div>\n    </div>\n    <div class=\"iv-image-view\" >\n      <div class=\"iv-image-wrap\" ></div>\n    </div>\n  ");
    }
  }, {
    key: "_findContainerAndImageSrc",
    value: function _findContainerAndImageSrc(element) {
      var domElement = element;
      var imageSrc, hiResImageSrc;
      if (typeof element === 'string') {
        domElement = document.querySelector(element);
      }

      // throw error if imageViewer is already assigned
      if (domElement._imageViewer) {
        throw new Error('An image viewer is already being initiated on the element.');
      }
      var container = element;
      if (domElement.tagName === 'IMG') {
        imageSrc = domElement.src;
        hiResImageSrc = domElement.getAttribute('high-res-src') || domElement.getAttribute('data-high-res-src');

        // wrap the image with iv-container div
        container = wrap(domElement, {
          className: 'iv-container iv-image-mode',
          style: {
            display: 'inline-block',
            overflow: 'hidden'
          }
        });

        // hide the image and add iv-original-img class
        css(domElement, {
          opacity: 0,
          position: 'relative',
          zIndex: -1
        });
      } else {
        imageSrc = domElement.getAttribute('src') || domElement.getAttribute('data-src');
        hiResImageSrc = domElement.getAttribute('high-res-src') || domElement.getAttribute('data-high-res-src');
      }
      return {
        container: container,
        domElement: domElement,
        imageSrc: imageSrc,
        hiResImageSrc: hiResImageSrc
      };
    }
  }, {
    key: "_init",
    value: function _init() {
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
  }, {
    key: "_initDom",
    value: function _initDom() {
      var container = this._elements.container;

      // add image-viewer layout elements
      createElement({
        tagName: 'div',
        className: 'iv-wrap',
        html: this.imageViewHtml,
        parent: container
      });

      // add container class on the container
      addClass(container, 'iv-container');

      // if the element is static position, position it relatively
      if (css(container, 'position') === 'static') {
        css(container, {
          position: 'relative'
        });
      }

      // save references for later use
      this._elements = _objectSpread2(_objectSpread2({}, this._elements), {}, {
        snapView: container.querySelector('.iv-snap-view'),
        snapImageWrap: container.querySelector('.iv-snap-image-wrap'),
        imageWrap: container.querySelector('.iv-image-wrap'),
        snapHandle: container.querySelector('.iv-snap-handle'),
        zoomHandle: container.querySelector('.iv-zoom-handle'),
        zoomIn: container.querySelector('.iv-button-zoom--in'),
        zoomOut: container.querySelector('.iv-button-zoom--out')
      });
      if (this._listeners.onInit) {
        this._listeners.onInit(this._callbackData);
      }
    }
  }, {
    key: "_initImageSlider",
    value: function _initImageSlider() {
      var _this2 = this;
      var _elements = this._elements;
      var imageWrap = _elements.imageWrap;
      var positions, currentPos;

      /* Add slide interaction to image */
      var imageSlider = new Slider(imageWrap, {
        isSliderEnabled: function isSliderEnabled() {
          var _this2$_state = _this2._state,
            loaded = _this2$_state.loaded,
            zooming = _this2$_state.zooming,
            zoomValue = _this2$_state.zoomValue;
          return loaded && !zooming && zoomValue > 100;
        },
        onStart: function onStart(e, position) {
          var snapSlider = _this2._sliders.snapSlider;

          // clear all animation frame and interval
          _this2._clearFrames();
          snapSlider.onStart();

          // reset positions
          positions = [position, position];
          currentPos = undefined;
          _this2._frames.slideMomentumCheck = setInterval(function () {
            if (!currentPos) return;
            positions.shift();
            positions.push({
              x: currentPos.mx,
              y: currentPos.my
            });
          }, 50);
        },
        onMove: function onMove(e, position) {
          var snapImageDim = _this2._state.snapImageDim;
          var snapSlider = _this2._sliders.snapSlider;
          var imageCurrentDim = _this2._getImageCurrentDim();
          currentPos = position;
          snapSlider.onMove(e, {
            dx: -position.dx * snapImageDim.w / imageCurrentDim.w,
            dy: -position.dy * snapImageDim.h / imageCurrentDim.h
          });
        },
        onEnd: function onEnd() {
          var snapImageDim = _this2._state.snapImageDim;
          var snapSlider = _this2._sliders.snapSlider;
          var imageCurrentDim = _this2._getImageCurrentDim();

          // clear all animation frame and interval
          _this2._clearFrames();
          var step, positionX, positionY;
          var xDiff = positions[1].x - positions[0].x;
          var yDiff = positions[1].y - positions[0].y;
          var momentum = function momentum() {
            if (step <= 60) {
              _this2._frames.sliderMomentumFrame = requestAnimationFrame(momentum);
            }
            positionX += easeOutQuart(step, xDiff / 3, -xDiff / 3, 60);
            positionY += easeOutQuart(step, yDiff / 3, -yDiff / 3, 60);
            snapSlider.onMove(null, {
              dx: -(positionX * snapImageDim.w / imageCurrentDim.w),
              dy: -(positionY * snapImageDim.h / imageCurrentDim.h)
            });
            step++;
          };
          if (Math.abs(xDiff) > 30 || Math.abs(yDiff) > 30) {
            step = 1;
            positionX = currentPos.dx;
            positionY = currentPos.dy;
            momentum();
          }
        }
      });
      imageSlider.init();
      this._sliders.imageSlider = imageSlider;
    }
  }, {
    key: "_initSnapSlider",
    value: function _initSnapSlider() {
      var _this3 = this;
      var snapHandle = this._elements.snapHandle;
      var startHandleTop, startHandleLeft;
      var snapSlider = new Slider(snapHandle, {
        isSliderEnabled: function isSliderEnabled() {
          return _this3._state.loaded;
        },
        onStart: function onStart() {
          var _this3$_frames = _this3._frames,
            slideMomentumCheck = _this3$_frames.slideMomentumCheck,
            sliderMomentumFrame = _this3$_frames.sliderMomentumFrame;
          startHandleTop = parseFloat(css(snapHandle, 'top'));
          startHandleLeft = parseFloat(css(snapHandle, 'left'));

          // stop momentum on image
          clearInterval(slideMomentumCheck);
          cancelAnimationFrame(sliderMomentumFrame);
        },
        onMove: function onMove(e, position) {
          var _this3$_state = _this3._state,
            snapHandleDim = _this3$_state.snapHandleDim,
            snapImageDim = _this3$_state.snapImageDim;
          var image = _this3._elements.image;
          var imageCurrentDim = _this3._getImageCurrentDim();

          // find handle left and top and make sure they lay between the snap image
          var maxLeft = Math.max(snapImageDim.w - snapHandleDim.w, startHandleLeft);
          var maxTop = Math.max(snapImageDim.h - snapHandleDim.h, startHandleTop);
          var minLeft = Math.min(0, startHandleLeft);
          var minTop = Math.min(0, startHandleTop);
          var left = clamp(startHandleLeft + position.dx, minLeft, maxLeft);
          var top = clamp(startHandleTop + position.dy, minTop, maxTop);
          var imgLeft = -left * imageCurrentDim.w / snapImageDim.w;
          var imgTop = -top * imageCurrentDim.h / snapImageDim.h;
          css(snapHandle, {
            left: "".concat(left, "px"),
            top: "".concat(top, "px")
          });
          css(image, {
            left: "".concat(imgLeft, "px"),
            top: "".concat(imgTop, "px")
          });
        }
      });
      snapSlider.init();
      this._sliders.snapSlider = snapSlider;
    }
  }, {
    key: "_initZoomSlider",
    value: function _initZoomSlider() {
      var _this4 = this;
      var _this$_elements = this._elements,
        snapView = _this$_elements.snapView,
        zoomHandle = _this$_elements.zoomHandle;

      // zoom in zoom out using zoom handle
      var sliderElm = snapView.querySelector('.iv-zoom-slider');
      var leftOffset, handleWidth;

      // on zoom slider we have to follow the mouse and set the handle to its position.
      var zoomSlider = new Slider(sliderElm, {
        isSliderEnabled: function isSliderEnabled() {
          return _this4._state.loaded;
        },
        onStart: function onStart(eStart) {
          var slider = _this4._sliders.zoomSlider;
          leftOffset = sliderElm.getBoundingClientRect().left + document.body.scrollLeft;
          handleWidth = parseInt(css(zoomHandle, 'width'), 10);

          // move the handle to current mouse position
          slider.onMove(eStart);
        },
        onMove: function onMove(e) {
          var maxZoom = _this4._options.maxZoom;
          var zoomSliderLength = _this4._state.zoomSliderLength;
          var clientX = e.clientX !== undefined ? e.clientX : e.touches[0].clientX;
          var newLeft = clamp(clientX - leftOffset - handleWidth / 2, 0, zoomSliderLength);
          var zoomValue = 100 + (maxZoom - 100) * newLeft / zoomSliderLength;
          _this4.zoom(zoomValue);
        }
      });
      zoomSlider.init();
      this._sliders.zoomSlider = zoomSlider;
    }
  }, {
    key: "_initEvents",
    value: function _initEvents() {
      this._snapViewEvents();

      // handle window resize
      if (this._options.refreshOnResize) {
        this._events.onWindowResize = assignEvent(window, 'resize', this.refresh);
      }
      this._events.onDragStart = assignEvent(this._elements.container, 'dragstart', preventDefault);
    }
  }, {
    key: "_snapViewEvents",
    value: function _snapViewEvents() {
      var _this5 = this;
      var _this$_elements2 = this._elements,
        imageWrap = _this$_elements2.imageWrap,
        snapView = _this$_elements2.snapView;

      // show snapView on mouse move
      this._events.snapViewOnMouseMove = assignEvent(imageWrap, ['touchmove', 'mousemove'], function () {
        _this5.showSnapView();
      });

      // keep showing snapView if on hover over it without any timeout
      this._events.mouseEnterSnapView = assignEvent(snapView, ['mouseenter', 'touchstart'], function () {
        _this5._state.snapViewVisible = false;
        _this5.showSnapView(true);
      });

      // on mouse leave set timeout to hide snapView
      this._events.mouseLeaveSnapView = assignEvent(snapView, ['mouseleave', 'touchend'], function () {
        _this5._state.snapViewVisible = false;
        _this5.showSnapView();
      });
      if (!this._options.hasZoomButtons) {
        return;
      }
      var _this$_elements3 = this._elements,
        zoomOut = _this$_elements3.zoomOut,
        zoomIn = _this$_elements3.zoomIn;
      this._events.zoomInClick = assignEvent(zoomIn, ['click'], function () {
        _this5.zoom(_this5._state.zoomValue + _this5._options.zoomStep || 50);
      });
      this._events.zoomOutClick = assignEvent(zoomOut, ['click'], function () {
        _this5.zoom(_this5._state.zoomValue - _this5._options.zoomStep || 50);
      });
    }
  }, {
    key: "_pinchAndZoom",
    value: function _pinchAndZoom() {
      var _this6 = this;
      var _this$_elements4 = this._elements,
        imageWrap = _this$_elements4.imageWrap,
        container = _this$_elements4.container;

      // apply pinch and zoom feature
      var onPinchStart = function onPinchStart(eStart) {
        var _this6$_state = _this6._state,
          loaded = _this6$_state.loaded,
          startZoomValue = _this6$_state.zoomValue;
        var events = _this6._events;
        if (!loaded) return;
        var touch0 = eStart.touches[0];
        var touch1 = eStart.touches[1];
        if (!(touch0 && touch1)) {
          return;
        }
        _this6._state.zooming = true;
        var contOffset = container.getBoundingClientRect();

        // find distance between two touch points
        var startDist = getTouchPointsDistance(eStart.touches);

        // find the center for the zoom
        var center = {
          x: (touch1.clientX + touch0.clientX) / 2 - contOffset.left,
          y: (touch1.clientY + touch0.clientY) / 2 - contOffset.top
        };
        var moveListener = function moveListener(eMove) {
          // eMove.preventDefault();

          var newDist = getTouchPointsDistance(eMove.touches);
          var zoomValue = startZoomValue + (newDist - startDist) / 2;
          _this6.zoom(zoomValue, center);
        };
        var endListener = function endListener(eEnd) {
          // unbind events
          events.pinchMove();
          events.pinchEnd();
          _this6._state.zooming = false;
          // properly resume move event if one finger remains
          if (eEnd.touches.length === 1) {
            _this6._sliders.imageSlider.startHandler(eEnd);
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
  }, {
    key: "_scrollZoom",
    value: function _scrollZoom() {
      var _this7 = this;
      /* Add zoom interaction in mouse wheel */
      var _options = this._options;
      var _this$_elements5 = this._elements,
        container = _this$_elements5.container,
        imageWrap = _this$_elements5.imageWrap;
      var changedDelta = 0;
      var onMouseWheel = function onMouseWheel(e) {
        var _this7$_state = _this7._state,
          loaded = _this7$_state.loaded,
          zoomValue = _this7$_state.zoomValue;
        if (!_options.zoomOnMouseWheel || !loaded) return;

        // clear all animation frame and interval
        _this7._clearFrames();

        // cross-browser wheel delta
        var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail || -e.deltaY));
        var newZoomValue = zoomValue * (100 + delta * ZOOM_CONSTANT) / 100;
        if (!(newZoomValue >= 100 && newZoomValue <= _options.maxZoom)) {
          changedDelta += Math.abs(delta);
        } else {
          changedDelta = 0;
        }
        e.preventDefault();
        if (changedDelta > MOUSE_WHEEL_COUNT) return;
        var contOffset = container.getBoundingClientRect();
        var x = (e.pageX || e.pageX) - (contOffset.left + document.body.scrollLeft);
        var y = (e.pageY || e.pageY) - (contOffset.top + document.body.scrollTop);
        _this7.zoom(newZoomValue, {
          x: x,
          y: y
        });

        // show the snap viewer
        _this7.showSnapView();
      };
      this._ev = assignEvent(imageWrap, 'wheel', onMouseWheel);
    }
  }, {
    key: "_doubleTapToZoom",
    value: function _doubleTapToZoom() {
      var _this8 = this;
      var imageWrap = this._elements.imageWrap;
      // handle double tap for zoom in and zoom out

      var touchTime = 0;
      var point;
      var onDoubleTap = function onDoubleTap(e) {
        if (touchTime === 0) {
          touchTime = Date.now();
          point = {
            x: e.clientX,
            y: e.clientY
          };
        } else if (Date.now() - touchTime < 500 && Math.abs(e.clientX - point.x) < 50 && Math.abs(e.clientY - point.y) < 50) {
          if (_this8._state.zoomValue === _this8._options.zoomValue) {
            _this8.zoom(200);
          } else {
            _this8.resetZoom();
          }
          touchTime = 0;
        } else {
          touchTime = 0;
        }
      };
      assignEvent(imageWrap, 'click', onDoubleTap);
    }
  }, {
    key: "_getImageCurrentDim",
    value: function _getImageCurrentDim() {
      var _this$_state2 = this._state,
        zoomValue = _this$_state2.zoomValue,
        imageDim = _this$_state2.imageDim;
      return {
        w: imageDim.w * (zoomValue / 100),
        h: imageDim.h * (zoomValue / 100)
      };
    }
  }, {
    key: "_loadImages",
    value: function _loadImages() {
      var _this9 = this;
      var _images = this._images,
        _elements = this._elements;
      var imageSrc = _images.imageSrc,
        hiResImageSrc = _images.hiResImageSrc;
      var container = _elements.container,
        snapImageWrap = _elements.snapImageWrap,
        imageWrap = _elements.imageWrap;
      var ivLoader = container.querySelector('.iv-loader');

      // remove old images
      remove(container.querySelectorAll('.iv-snap-image, .iv-image'));

      // add snapView image
      var snapImage = createElement({
        tagName: 'img',
        className: 'iv-snap-image',
        src: imageSrc,
        insertBefore: snapImageWrap.firstChild,
        parent: snapImageWrap
      });

      // add image
      var image = createElement({
        tagName: 'img',
        className: 'iv-image iv-small-image',
        src: imageSrc,
        parent: imageWrap
      });
      this._state.loaded = false;

      // store image reference in _elements
      this._elements.image = image;
      this._elements.snapImage = snapImage;
      css(ivLoader, {
        display: 'block'
      });

      // keep visibility hidden until image is loaded
      css(image, {
        visibility: 'hidden'
      });

      // hide snap view if open
      this.hideSnapView();
      var onImageLoad = function onImageLoad() {
        // hide the iv loader
        css(ivLoader, {
          display: 'none'
        });

        // show the image
        css(image, {
          visibility: 'visible'
        });

        // load high resolution image if provided
        if (hiResImageSrc) {
          _this9._loadHighResImage(hiResImageSrc);
        }

        // set loaded flag to true
        _this9._state.loaded = true;

        // calculate the dimension
        _this9._calculateDimensions();

        // dispatch image load event
        if (_this9._listeners.onImageLoad) {
          _this9._listeners.onImageLoaded(_this9._callbackData);
        }

        // reset the zoom
        _this9.resetZoom();
      };
      if (imageLoaded(image)) {
        onImageLoad();
      } else {
        if (typeof this._events.imageLoad == 'function') {
          this._events.imageLoad();
        }
        this._events.imageLoad = assignEvent(image, 'load', onImageLoad);
      }
    }
  }, {
    key: "_loadHighResImage",
    value: function _loadHighResImage(hiResImageSrc) {
      var _this10 = this;
      var _this$_elements6 = this._elements,
        imageWrap = _this$_elements6.imageWrap,
        container = _this$_elements6.container;
      var lowResImg = this._elements.image;
      var hiResImage = createElement({
        tagName: 'img',
        className: 'iv-image iv-large-image',
        src: hiResImageSrc,
        parent: imageWrap,
        style: lowResImg.style.cssText
      });

      // add all the style attributes from lowResImg to highResImg
      hiResImage.style.cssText = lowResImg.style.cssText;
      this._elements.image = container.querySelectorAll('.iv-image');
      var onHighResImageLoad = function onHighResImageLoad() {
        // remove the low size image and set this image as default image
        remove(lowResImg);
        _this10._elements.image = hiResImage;
        // this._calculateDimensions();
      };
      if (imageLoaded(hiResImage)) {
        onHighResImageLoad();
      } else {
        if (typeof this._events.hiResImageLoad == 'function') {
          this._events.hiResImageLoad();
        }
        this._events.hiResImageLoad = assignEvent(hiResImage, 'load', onHighResImageLoad);
      }
    }
  }, {
    key: "_calculateDimensions",
    value: function _calculateDimensions() {
      var _this$_elements7 = this._elements,
        image = _this$_elements7.image,
        container = _this$_elements7.container,
        snapView = _this$_elements7.snapView,
        snapImage = _this$_elements7.snapImage,
        zoomHandle = _this$_elements7.zoomHandle;

      // calculate content width of image and snap image
      var imageWidth = parseInt(css(image, 'width'), 10);
      var imageHeight = parseInt(css(image, 'height'), 10);
      var contWidth = parseInt(css(container, 'width'), 10);
      var contHeight = parseInt(css(container, 'height'), 10);
      var snapViewWidth = snapView.clientWidth;
      var snapViewHeight = snapView.clientHeight;

      // set the container dimension
      this._state.containerDim = {
        w: contWidth,
        h: contHeight
      };

      // set the image dimension
      var imgWidth;
      var imgHeight;
      var ratio = imageWidth / imageHeight;
      imgWidth = imageWidth > imageHeight && contHeight >= contWidth || ratio * contHeight > contWidth ? contWidth : ratio * contHeight;
      imgHeight = imgWidth / ratio;
      this._state.imageDim = {
        w: imgWidth,
        h: imgHeight
      };

      // reset image position and zoom
      css(image, {
        width: "".concat(imgWidth, "px"),
        height: "".concat(imgHeight, "px"),
        left: "".concat((contWidth - imgWidth) / 2, "px"),
        top: "".concat((contHeight - imgHeight) / 2, "px"),
        maxWidth: 'none',
        maxHeight: 'none'
      });

      // set the snap Image dimension
      var snapWidth = imgWidth > imgHeight ? snapViewWidth : imgWidth * snapViewHeight / imgHeight;
      var snapHeight = imgHeight > imgWidth ? snapViewHeight : imgHeight * snapViewWidth / imgWidth;
      this._state.snapImageDim = {
        w: snapWidth,
        h: snapHeight
      };
      css(snapImage, {
        width: "".concat(snapWidth, "px"),
        height: "".concat(snapHeight, "px")
      });
      var zoomSlider = snapView.querySelector('.iv-zoom-slider').clientWidth;
      // calculate zoom slider area
      this._state.zoomSliderLength = zoomSlider - zoomHandle.offsetWidth;
    }
  }, {
    key: "resetZoom",
    value: function resetZoom() {
      var animate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var zoomValue = this._options.zoomValue;
      if (!animate) {
        this._state.zoomValue = zoomValue;
      }
      this.zoom(zoomValue);
    }
  }, {
    key: "load",
    value: function load(imageSrc, hiResImageSrc) {
      this._images = {
        imageSrc: imageSrc,
        hiResImageSrc: hiResImageSrc
      };
      this._loadImages();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this$_elements8 = this._elements,
        container = _this$_elements8.container,
        domElement = _this$_elements8.domElement;
      // destroy all the sliders
      Object.entries(this._sliders).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          slider = _ref2[1];
        slider.destroy();
      });

      // unbind all events
      Object.entries(this._events).forEach(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
          key = _ref4[0],
          unbindEvent = _ref4[1];
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
      if (this._listeners.onDestroy) {
        this._listeners.onDestroy();
      }
    }

    /**
     * Data will be passed to the callback registered with each new instance
     */
  }, {
    key: "_callbackData",
    get: function get() {
      return {
        container: this._elements.container,
        snapView: this._elements.snapView,
        zoomValue: this._state.zoomValue,
        reachedMin: Math.abs(this._state.zoomValue - 100) < 1,
        reachedMax: Math.abs(this._state.zoomValue - this._options.maxZoom) < 1,
        instance: this
      };
    }
  }]);
}();
ImageViewer.defaults = {
  zoomValue: 100,
  snapView: true,
  maxZoom: 500,
  refreshOnResize: true,
  zoomOnMouseWheel: true,
  hasZoomButtons: false,
  zoomStep: 50,
  listeners: {
    onInit: null,
    onDestroy: null,
    onImageLoaded: null,
    onZoomChange: null
  }
};

var fullScreenHtml = "\n  <div class=\"iv-fullscreen-container\"></div>\n  <div class=\"iv-fullscreen-close\"></div>\n";
var FullScreenViewer = /*#__PURE__*/function (_ImageViewer) {
  function FullScreenViewer() {
    var _this;
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, FullScreenViewer);
    var fullScreenElem = createElement({
      tagName: 'div',
      className: 'iv-fullscreen',
      html: fullScreenHtml,
      parent: document.body
    });
    var container = fullScreenElem.querySelector('.iv-fullscreen-container');

    // call the ImageViewer constructor
    _this = _callSuper(this, FullScreenViewer, [container, _objectSpread2(_objectSpread2({}, options), {}, {
      refreshOnResize: false
    })]);

    // add fullScreenElem on element list
    _defineProperty(_this, "hide", function () {
      // hide the fullscreen
      css(_this._elements.fullScreen, {
        display: 'none'
      });

      // enable scroll
      removeCss(document.querySelector('html'), 'overflow');

      // remove window event
      _this._events.onWindowResize();
    });
    _this._elements.fullScreen = fullScreenElem;
    _this._initFullScreenEvents();
    return _this;
  }
  _inherits(FullScreenViewer, _ImageViewer);
  return _createClass(FullScreenViewer, [{
    key: "_initFullScreenEvents",
    value: function _initFullScreenEvents() {
      var fullScreen = this._elements.fullScreen;
      var closeBtn = fullScreen.querySelector('.iv-fullscreen-close');

      // add close button event
      this._events.onCloseBtnClick = assignEvent(closeBtn, 'click', this.hide);
    }
  }, {
    key: "show",
    value: function show(imageSrc, hiResImageSrc) {
      // show the element
      css(this._elements.fullScreen, {
        display: 'block'
      });

      // if image source is provide load image source
      if (imageSrc) {
        this.load(imageSrc, hiResImageSrc);
      }

      // handle window resize
      this._events.onWindowResize = assignEvent(window, 'resize', this.refresh);

      // disable scroll on html
      css(document.querySelector('html'), {
        overflow: 'hidden'
      });
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var fullScreen = this._elements.fullScreen;

      // destroy image viewer
      _get(_getPrototypeOf(FullScreenViewer.prototype), "destroy", this).call(this);

      // remove the element
      remove(fullScreen);
    }
  }]);
}(ImageViewer);

export { FullScreenViewer, ImageViewer, ImageViewer as default };
