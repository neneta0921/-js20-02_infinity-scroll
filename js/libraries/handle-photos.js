class HandlePhotos {
  constructor() {
    this._photosArray = [];
  }

  // Get photos from Unsplash API
  async getPhotos() {
    // Unsplash API
    let initialCount = 5;
    const apiKey = 'o4HCi4WeGcT7oD2Z0UBAyGZfhTdPZLRBiC4AgYJIkpM';
    let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${initialCount}`;

    let isInitialLoad = true;

    function updateApiURLWithNewCount(picCount) {
      apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
    }

    try {
      const response = await fetch(apiUrl);
      this._photosArray = await response.json();
      this._displayPhotos();
      if (isInitialLoad) {
        updateApiURLWithNewCount(30);
        isInitialLoad = false;
      }
    } catch (error) {
      // Catch Error Here
      console.log(error);
    }
  }

  // Create Elements For Links & Photos, Add to DOM
  _displayPhotos() {
    const imageContainer = document.querySelector('#js-image-container');

    let imagesLoaded = 0;
    let totalImages = 0;

    // Helper Function to Set Attributes on DOM Elements
    function _setAttributes(element, attributes) {
      for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
      }
    }

    function _createLinkItem(photo) {
      const item = document.createElement('a');
      _setAttributes(item, {
        href: photo.links.html,
        target: '_blank',
      });
      return item;
    }

    function _createImg(photo) {
      const img = document.createElement('img');
      _setAttributes(img, {
        src: photo.urls.regular,
        alt: photo.alt_description,
        title: photo.alt_description,
      });
      return img;
    }

    // Check if all images were loaded
    function imageLoaded() {
      const loader = document.querySelector('#js-loader');

      imagesLoaded++;
      if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
      }
    }

    imagesLoaded = 0;
    totalImages = this._photosArray.length;
    // Run function for each object in photosArray
    this._photosArray.forEach((photo) => {
      // Create <a> to link to Unsplash
      const item = _createLinkItem(photo);

      // Create <img> for Photo
      const img = _createImg(photo);
      // Event Listener, check when each is finished loading
      img.addEventListener('load', imageLoaded);

      // Put <img> inside <a>, then put both inside imageContainer
      item.appendChild(img);
      imageContainer.appendChild(item);
    });
  }
}
