import ImageViewer from '../../src/ImageViewer';

const images = [{
  small: '../images/1.jpg',
  big: '../images/1_big.jpg',
}, {
  small: '../images/2.jpg',
  big: '../images/2_big.jpg',
}, {
  small: '../images/3.jpg',
  big: '../images/3_big.jpg',
}, {
  small: '../images/4.jpg',
  big: '../images/4_big.jpg',
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
