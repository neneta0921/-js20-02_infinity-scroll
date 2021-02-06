class GetPhotos {
  // Get photos from Unsplash API
  async getPhotos() {
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
}
