import ImageViewer from '../../src/ImageViewer';

const viewers = []

Array.from(document.querySelectorAll('.pannable-image')).forEach((elem) => {
  viewers.push(new ImageViewer(elem));
});

// For hot module replacement to work
if (module.hot) {
  module.hot.dispose(function() {
    viewers.forEach(function (viewer) {
      viewer.destroy();
    })
  })

  module.hot.accept()
}
