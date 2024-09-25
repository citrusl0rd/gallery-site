// This is a placeholder for the actual image data
// In a real scenario, you would fetch this data from your GitHub repository
const images = [
    { id: 1, src: "https://via.placeholder.com/400x300.png?text=Event+Photo+1", alt: "Event photo 1" },
    { id: 2, src: "https://via.placeholder.com/400x300.png?text=Event+Photo+2", alt: "Event photo 2" },
    { id: 3, src: "https://via.placeholder.com/400x300.png?text=Event+Photo+3", alt: "Event photo 3" },
    { id: 4, src: "https://via.placeholder.com/400x300.png?text=Event+Photo+4", alt: "Event photo 4" },
    { id: 5, src: "https://via.placeholder.com/400x300.png?text=Event+Photo+5", alt: "Event photo 5" },
    { id: 6, src: "https://via.placeholder.com/400x300.png?text=Event+Photo+6", alt: "Event photo 6" },
];

let currentImageIndex = 0;
const imagesPerLoad = 3;
let loadedImages = 0;

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

document.addEventListener('DOMContentLoaded', () => {
    loadImages();

    document.getElementById('loadMoreBtn').addEventListener('click', loadImages);
    document.querySelector('.close').addEventListener('click', closeLightbox);
});

// Close the lightbox when clicking outside the image
window.onclick = function(event) {
    const lightbox = document.getElementById('lightbox');
    if (event.target == lightbox) {
        lightbox.style.display = "none";
    }
}
