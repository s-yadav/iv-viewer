"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.noop = noop;
exports.easeOutQuart = easeOutQuart;
exports.createElement = createElement;
exports.addClass = addClass;
exports.removeClass = removeClass;
exports.imageLoaded = imageLoaded;
exports.toArray = toArray;
exports.assign = assign;
exports.css = css;
exports.removeCss = removeCss;
exports.wrap = wrap;
exports.unwrap = unwrap;
exports.remove = remove;
exports.clamp = clamp;
exports.assignEvent = assignEvent;
exports.getTouchPointsDistance = getTouchPointsDistance;
exports.MOUSE_WHEEL_COUNT = exports.ZOOM_CONSTANT = void 0;
// constants
var ZOOM_CONSTANT = 15; // increase or decrease value for zoom on mouse wheel

exports.ZOOM_CONSTANT = ZOOM_CONSTANT;
var MOUSE_WHEEL_COUNT = 5; // A mouse delta after which it should stop preventing default behaviour of mouse wheel

exports.MOUSE_WHEEL_COUNT = MOUSE_WHEEL_COUNT;

function noop() {} // ease out method

/*
    t : current time,
    b : intial value,
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
  if (options.child) elem.appendChild(options.child); // Insert before

  if (options.insertBefore) {
    options.parent.insertBefore(elem, options.insertBefore); // Standard append
  } else {
    options.parent.appendChild(elem);
  }

  return elem;
} // method to add class


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
} // method to remove class


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
} // function to check if image is loaded


function imageLoaded(img) {
  return img.complete && (typeof img.naturalWidth === 'undefined' || img.naturalWidth !== 0);
}

function toArray(list) {
  if (!(list instanceof NodeList || list instanceof HTMLCollection)) return [list];
  return Array.prototype.slice.call(list);
}

function assign(target) {
  for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    rest[_key - 1] = arguments[_key];
  }

  rest.forEach(function (obj) {
    Object.keys(obj).forEach(function (key) {
      target[key] = obj[key];
    });
  });
  return target;
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