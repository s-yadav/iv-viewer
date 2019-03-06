// constants
export const ZOOM_CONSTANT = 15; // increase or decrease value for zoom on mouse wheel
export const MOUSE_WHEEL_COUNT = 5; // A mouse delta after which it should stop preventing default behaviour of mouse wheel

export function noop () {}

// ease out method
/*
    t : current time,
    b : intial value,
    c : changed value,
    d : duration
*/
export function easeOutQuart (t, b, c, d) {
  t /= d;
  t -= 1;
  return -c * (t * t * t * t - 1) + b;
}

export function createElement (options) {
  const elem = document.createElement(options.tagName);
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
export function addClass (el, className) {
  const classNameAry = className.split(' ');

  if (classNameAry.length > 1) {
    classNameAry.forEach(classItem => addClass(el, classItem));
  } else if (el.classList) {
    el.classList.add(className);
  } else {
    el.className += ` ${className}`; // eslint-disable-line no-param-reassign
  }
}

// method to remove class
export function removeClass (el, className) {
  const classNameAry = className.split(' ');
  if (classNameAry.length > 1) {
    classNameAry.forEach(classItem => removeClass(el, classItem));
  } else if (el.classList) {
    el.classList.remove(className);
  } else {
    el.className = el.className.replace(new RegExp(`(^|\\b)${className.split(' ').join('|')}(\\b|$)`, 'gi'), ' '); // eslint-disable-line no-param-reassign
  }
}

// function to check if image is loaded
export function imageLoaded (img) {
  return img.complete && (typeof img.naturalWidth === 'undefined' || img.naturalWidth !== 0);
}

export function toArray (list) {
  if (!(list instanceof NodeList || list instanceof HTMLCollection)) return [list];
  return Array.prototype.slice.call(list);
}

export function assign (target, ...rest) {
  rest.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      target[key] = obj[key];
    });
  });
  return target;
}

export function css (elements, properties) {
  const elmArray = toArray(elements);

  if (typeof properties === 'string') {
    return window.getComputedStyle(elmArray[0])[properties];
  }

  elmArray.forEach((element) => {
    Object.keys(properties).forEach((key) => {
      const value = properties[key];
      element.style[key] = value; // eslint-disable-line no-param-reassign
    });
  });

  return undefined;
}

export function removeCss (element, property) {
  element.style.removeProperty(property);
}

export function wrap (element, { tag = 'div', className, id, style }) {
  const wrapper = document.createElement(tag);
  if (className) wrapper.className = className;
  if (id) wrapper.id = id;
  if (style) wrapper.style = style;
  element.parentNode.insertBefore(wrapper, element);
  element.parentNode.removeChild(element);
  wrapper.appendChild(element);
  return wrapper;
}

export function unwrap (element) {
  let parent = element.parentNode;

  if (parent !== document.body) {
    parent.parentNode.insertBefore(element, parent);
    parent.parentNode.removeChild(parent);
  }
}

export function remove (elements) {
  const elmArray = toArray(elements);
  elmArray.forEach((element) => {
    element.parentNode.removeChild(element);
  });
}

export function clamp (num, min, max) {
  return Math.min(Math.max(num, min), max);
}

export function assignEvent (element, events, handler) {
  if (typeof events === 'string') events = [events];

  events.forEach((event) => {
    element.addEventListener(event, handler);
  });

  return () => {
    events.forEach((event) => {
      element.removeEventListener(event, handler);
    });
  };
}

export function getTouchPointsDistance (touches) {
  const touch0 = touches[0];
  const touch1 = touches[1];
  return Math.sqrt(Math.pow(touch1.pageX - touch0.pageX, 2) + Math.pow(touch1.pageY - touch0.pageY, 2));
}
