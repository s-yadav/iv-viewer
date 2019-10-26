import { noop } from './util';

class Slider {
  constructor (container, {
    onStart, onMove, onEnd, isSliderEnabled,
  }) {
    this.container = container;
    this.isSliderEnabled = isSliderEnabled;
    this.onStart = onStart || noop;
    this.onMove = onMove || noop;
    this.onEnd = onEnd || noop;
  }

  startHandler = (eStart) => {
    if (!this.isSliderEnabled()) return;

    this.removeListeners();

    eStart.preventDefault();

    const { moveHandler, endHandler, onStart } = this;

    const isTouchEvent = eStart.type === 'touchstart' || eStart.type === 'touchend';

    this.touchMoveEvent = isTouchEvent ? 'touchmove' : 'mousemove';
    this.touchEndEvent = isTouchEvent ? 'touchend' : 'mouseup';

    this.sx = isTouchEvent ? eStart.touches[0].clientX : eStart.clientX;

    this.sy = isTouchEvent ? eStart.touches[0].clientY : eStart.clientY;

    onStart(eStart, {
      x: this.sx,
      y: this.sy,
    });

    // add listeners
    document.addEventListener(this.touchMoveEvent, moveHandler);
    document.addEventListener(this.touchEndEvent, endHandler);
    /*
      add end handler in context menu as well.
      As mouseup event is not trigger on context menu open
      https://bugs.chromium.org/p/chromium/issues/detail?id=506801
    */
    document.addEventListener('contextmenu', endHandler);
  }

  moveHandler = (eMove) => {
    if (!this.isSliderEnabled()) return;

    eMove.preventDefault();
    const { sx, sy, onMove } = this;

    const isTouchEvent = this.touchMoveEvent === 'touchmove';

    // get the coordinates
    const mx = isTouchEvent ? eMove.touches[0].clientX : eMove.clientX;
    const my = isTouchEvent ? eMove.touches[0].clientY : eMove.clientY;

    onMove(eMove, {
      dx: mx - sx,
      dy: my - sy,
      mx,
      my,
    });
  }

  endHandler = () => {
    if (!this.isSliderEnabled()) return;
    this.removeListeners();
    this.onEnd();
  }

  // remove previous events if its not removed
  // - Case when while sliding mouse moved out of document and released there
  removeListeners () {
    if (!this.touchMoveEvent) return;
    document.removeEventListener(this.touchMoveEvent, this.moveHandler);
    document.removeEventListener(this.touchEndEvent, this.endHandler);
    document.removeEventListener('contextmenu', this.endHandler);
  }

  init () {
    ['touchstart', 'mousedown'].forEach((evt) => {
      this.container.addEventListener(evt, this.startHandler);
    });
  }

  destroy () {
    ['touchstart', 'mousedown'].forEach((evt) => {
      this.container.removeEventListener(evt, this.startHandler);
    });
    this.removeListeners();
  }
}

export default Slider;
