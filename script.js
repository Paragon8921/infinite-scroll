const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let phototsArray = [];
let isIntialLoad = true;

// Unsplash API
const apiKey = 'dXTqcoJkMSnqUskj08-DzYNhLKvTal4xrbJl5-TxXQE';
let initialCount = 5;
let apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${initialCount}`;

// Update pictre load count after initial load
function updateLoadCount(picCount) {
  apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
}

//Check if all images were loaded
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

// Create Elements for Links & Photots, add to DOM

function displayPhotos() {
  imagesLoaded = 0;
  totalImages = phototsArray.length;
  // Run function for each object in phototsArray
  phototsArray.forEach(photo => {
    // Create <a> to link to unsplash
    const item = document.createElement('a');

    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });

    // Create <img> for photo
    const img = document.createElement('img');

    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event listener, chekc when each is finished loading
    img.addEventListener('load', imageLoaded);

    // Put img inside <a>m then put both inside imageContainer element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get Photos from Unsplash API

async function getPhotos() {
  try {
    const response = await fetch(apiURL);
    phototsArray = await response.json();
    displayPhotos();
    if (isIntialLoad) {
      updateLoadCount(15);
      isIntialLoad = false;
    }
  } catch {
    // Catch Error here
  }
}

// Check to see if scrolling near bottom of page, Load more Photos
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;

    getPhotos();
  }
});

// On Load
getPhotos();
