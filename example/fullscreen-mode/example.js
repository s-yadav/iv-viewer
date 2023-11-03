import FullScreenViewer from '../../src/FullScreen';

const viewer = new FullScreenViewer();

const elements = []

function show(ev) {
  const imgSrc = ev.target.src;
  const highResolutionImage = ev.target.getAttribute('data-high-res-src');
  viewer.show(imgSrc, highResolutionImage);
}

Array.from(document.querySelectorAll('.gallery-items')).forEach((elem) => {
  elem.addEventListener('click', show);
  elements.push(elem)
});

// For hot module replacement to work
if (module.hot) {
  module.hot.dispose(function() {
    elements.forEach((elem) => {
      elem.removeEventListener('click', show);
    });
    viewer.destroy()
  })

  module.hot.accept()
}
