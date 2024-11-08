// script.js
let index = 0;
const images = document.querySelectorAll('.slider-item');
const totalImages = images.length;

function showNextImage() {
    index++;
    if (index >= totalImages) {
        index = 0; // Reset to the first image
    }
    const newTransformValue = -index * 100; // Desplazar hacia la izquierda por el ancho total de una imagen
    document.querySelector('.slider-container').style.transform = `translateX(${newTransformValue}%)`;
}

// Cambiar de imagen cada 3 segundos
setInterval(showNextImage, 3000);
