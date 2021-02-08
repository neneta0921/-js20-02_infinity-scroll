let ready = false;

const handlePhotos = new HandlePhotos();
const getPhotos = () => handlePhotos.getPhotos();

const scrollObserver = new ScrollObserver('#js-image-container', getPhotos, { once: false });

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
});

// On Load
getPhotos();
