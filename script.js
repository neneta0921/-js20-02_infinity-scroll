// Unsplash API
const count = 10;
const apiKey = "o4HCi4WeGcT7oD2Z0UBAyGZfhTdPZLRBiC4AgYJIkpM";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
        return data
    } catch(error) {
        console.log(error);
    }
}

// On Load
getPhotos();
