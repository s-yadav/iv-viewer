import FullScreenViewer from '../../src/FullScreen';

const viewer = new FullScreenViewer();

Array.from(document.querySelectorAll('.gallery-items')).forEach((elem) => {
  elem.addEventListener('click', function (ev) {
    const imgSrc = elem.src;
    const highResolutionImage = elem.getAttribute('data-high-res-src');
    viewer.show(imgSrc, highResolutionImage);
  });
});
