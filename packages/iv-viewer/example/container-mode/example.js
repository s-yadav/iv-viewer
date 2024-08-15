import ImageViewer from '../../src/ImageViewer';
import image1 from '../images/1.jpg';
import image1Big from '../images/1_big.jpg';
import image2 from '../images/2.jpg';
import image2Big from '../images/2_big.jpg';
import image3 from '../images/3.jpg';
import image3Big from '../images/3_big.jpg';
import image4 from '../images/4.jpg';
import image4Big from '../images/4_big.jpg';


const images = [{
  small: image1,
  big: image1Big,
}, {
  small: image2,
  big: image2Big,
}, {
  small: image3,
  big: image3Big,
}, {
  small: image4,
  big: image4Big,
}];

let curImageIdx = 1;

const total = images.length;
const wrapper = document.getElementById('image-gallery');

const curSpan = wrapper.querySelector('.current');
const viewer = new ImageViewer(wrapper.querySelector('.image-container'));
window.viewer = viewer;
// display total count
wrapper.querySelector('.total').innerHTML = total;

function showImage () {
  const imgObj = images[curImageIdx - 1];
  viewer.load(imgObj.small, imgObj.big);
  curSpan.innerHTML = curImageIdx;
}

wrapper.querySelector('.next').addEventListener('click', function (evt) {
  curImageIdx++;
  if (curImageIdx > total) curImageIdx = 1;
  showImage();
});

wrapper.querySelector('.prev').addEventListener('click', function (evt) {
  curImageIdx--;
  if (curImageIdx < 0) curImageIdx = total;
  showImage();
});

// initially show image
showImage();

// For hot module replacement to work
if (module.hot) {
  module.hot.dispose(function() {
    viewer.destroy()
  })

  module.hot.accept()
}
