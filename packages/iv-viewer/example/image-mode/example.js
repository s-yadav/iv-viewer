import ImageViewer from '../../src/ImageViewer';

Array.from(document.querySelectorAll('.pannable-image')).forEach((elem) => {
  new ImageViewer(elem);
});
