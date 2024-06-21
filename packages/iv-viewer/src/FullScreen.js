import { createElement, assignEvent, css, remove, removeCss } from './util';
import ImageViewer from './ImageViewer';

const fullScreenHtml = `
  <div class="iv-fullscreen-container"></div>
  <div class="iv-fullscreen-close"></div>
`;

class FullScreenViewer extends ImageViewer {
  constructor (options = {}) {
    const fullScreenElem = createElement({
      tagName: 'div',
      className: 'iv-fullscreen',
      html: fullScreenHtml,
      parent: document.body,
    });

    const container = fullScreenElem.querySelector('.iv-fullscreen-container');

    // call the ImageViewer constructor
    super(container, { ...options, refreshOnResize: false });

    // add fullScreenElem on element list
    this._elements.fullScreen = fullScreenElem;

    this._initFullScreenEvents();
  }
  _initFullScreenEvents () {
    const { fullScreen } = this._elements;
    const closeBtn = fullScreen.querySelector('.iv-fullscreen-close');

    // add close button event
    this._events.onCloseBtnClick = assignEvent(closeBtn, 'click', this.hide);
  }
  show (imageSrc, hiResImageSrc) {
    // show the element
    css(this._elements.fullScreen, { display: 'block' });

    // if image source is provide load image source
    if (imageSrc) {
      this.load(imageSrc, hiResImageSrc);
    }

    // handle window resize
    this._events.onWindowResize = assignEvent(window, 'resize', this.refresh);

    // disable scroll on html
    css(document.querySelector('html'), { overflow: 'hidden' });
  }
  hide = () => {
    // hide the fullscreen
    css(this._elements.fullScreen, { display: 'none' });

    // enable scroll
    removeCss(document.querySelector('html'), 'overflow');

    // remove window event
    this._events.onWindowResize();
  }
  destroy () {
    const { fullScreen } = this._elements;

    // destroy image viewer
    super.destroy();

    // remove the element
    remove(fullScreen);
  }
}

export default FullScreenViewer;
