let images = [];
let currentImageIndex = 0;
const imagesPerLoad = 3;
let loadedImages = 0;

// GitHub repository information
const owner = 'citrusl0rd';
const repo = 'gallery-site';
const path = 'gallery';

// Function to fetch image files from the GitHub repository
async function fetchImageFiles() {
    try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`);
        if (!response.ok) {
            throw new Error('Failed to fetch gallery contents');
        }
        const data = await response.json();
        
        images = data
            .filter(file => file.type === 'file' && file.name.match(/\.(jpe?g|png|gif)$/i))
            .map((file, index) => ({
                src: file.download_url,
                alt: `Event photo ${index + 1}`
            }));
    } catch (error) {
        console.error('Error fetching image files:', error);
        document.getElementById('gallery').innerHTML = '<p>Error loading images. Please try again later.</p>';
    }
}

function loadImages() {
    const gallery = document.getElementById('gallery');
    const fragment = document.createDocumentFragment();

    for (let i = loadedImages; i < loadedImages + imagesPerLoad && i < images.length; i++) {
        const img = document.createElement('img');
        img.src = images[i].src;
        img.alt = images[i].alt;
        img.addEventListener('click', () => openLightbox(i));
        fragment.appendChild(img);
    }

    gallery.appendChild(fragment);
    loadedImages += imagesPerLoad;

    if (loadedImages >= images.length) {
        document.getElementById('loadMoreBtn').style.display = 'none';
    }
}

function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const caption = document.getElementById('caption');

    lightbox.style.display = 'block';
    lightboxImg.src = images[currentImageIndex].src;
    caption.innerHTML = images[currentImageIndex].alt;
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

function changeImage(n) {
    currentImageIndex += n;
    if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    }
    const lightboxImg = document.getElementById('lightboxImg');
    const caption = document.getElementById('caption');
    lightboxImg.src = images[currentImageIndex].src;
    caption.innerHTML = images[currentImageIndex].alt;
}

document.addEventListener('DOMContentLoaded', async () => {
    await fetchImageFiles();
    
    if (images.length > 0) {
        loadImages();
        document.getElementById('loadMoreBtn').addEventListener('click', loadImages);
    } else {
        document.getElementById('gallery').innerHTML = '<p>No images found in the gallery.</p>';
        document.getElementById('loadMoreBtn').style.display = 'none';
    }

    document.querySelector('.close').addEventListener('click', closeLightbox);
});

// Close the lightbox when clicking outside the image
window.onclick = function(event) {
    const lightbox = document.getElementById('lightbox');
    if (event.target == lightbox) {
        lightbox.style.display = "none";
    }
}
