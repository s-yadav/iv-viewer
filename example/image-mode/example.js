import ImageViewer from '../../src/ImageViewer';

document.addEventListener('DOMContentLoaded', function () {
  Array.from(document.querySelectorAll('.pannable-image')).forEach((elem) => {
      new ImageViewer(elem);
  });
});
