document.addEventListener('DOMContentLoaded', () => {
  new Main();
});

class Main {
  constructor() {
    this._init();
  }

  _init() {
    this.ready = false;
    this.imageLoaded = 0;
    this.totalImages = 0;
    this.photosArray = [];
    this.isInitialLoad = true;
  }
}

const imageContainer = document.getElementById('js-image-container');
const loader = document.getElementById('js-loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

let isInitialLoad = true;

// Unsplash API
let initialCount = 5;
const apiKey = 'o4HCi4WeGcT7oD2Z0UBAyGZfhTdPZLRBiC4AgYJIkpM';
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${initialCount}`;

function updateApiURLWithNewCount(picCount) {
  apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
}

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  console.log('totalImages', totalImages);
  // Run function for each object in photosArray
  photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });
    // Create <img> for Photo
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event Listener, check when each is finished loading
    img.addEventListener('load', imageLoaded);
    // Put <img> inside <a>, then put both inside imageContainer
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
    if (isInitialLoad) {
      updateApiURLWithNewCount(30);
      isInitialLoad = false;
    }
  } catch (error) {
    // Catch Error Here
    console.log(error);
  }
}

// Check to see if scrolling near bottom of page, Load More Photos
// window.addEventListener('scroll', () => {
//   if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
//     ready = false;
//     getPhotos();
//   }
// });

class Main {
  constructor() {
    this.imageContainer = document.querySelector('#js-image-container');
    this._observers = [];
    this._scrollInit();
  }

  set observers(val) {
    this._observers.push(val);
  }

  get observers() {
    return this._observers;
  }

  _destroyObservers() {
    this.observers.forEach((ob) => ob.destroy());
  }

  destroy() {
    this._destroyObservers;
  }

  _getPhotos(el, inview) {
    console.log('in');
    if (inview) {
      this.imageContainer.classList.add('inview');
    } else {
      this.imageContainer.classList.remove('inview');
    }
  }

  _scrollInit() {
    this._observers = new ScrollObserver('#js-image-container', this._getPhotos, {
      rootMargin: '-50% 0px', // ビューポートの中心を判定基準にする
      once: false,
    });
  }
}

// const main = new Main();

// On Load
getPhotos();
