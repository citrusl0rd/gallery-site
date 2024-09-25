// This is a placeholder for the actual image data
// In a real scenario, you would fetch this data from your GitHub repository
const images = [
    { id: 1, src: "https://github.com/citrusl0rd/gallery-site/blob/main/gallery/458412339_1685317278884135_1890090686872783401_n.jpg?raw=true", alt: "Event photo 1" },
    { id: 2, src: "https://github.com/citrusl0rd/gallery-site/blob/main/gallery/458478593_821670136795786_1104896778363302997_n.jpg?raw=true", alt: "Event photo 2" },
    { id: 3, src: "https://github.com/citrusl0rd/gallery-site/blob/main/gallery/458600920_2544097822457563_2778178490323036121_n.jpg?raw=true", alt: "Event photo 3" },
    { id: 4, src: "https://github.com/citrusl0rd/gallery-site/blob/main/gallery/pixel.png?raw=true", alt: "Event photo 4" },
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
