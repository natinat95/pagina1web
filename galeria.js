let slideIndex = 1;

// Mostrar diapositiva actual
function showSlides(n) {
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");

  // Asegurarse de que la diapositiva no se pase de los límites
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }

  // Ocultar todas las diapositivas
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }

  // Desactivar todos los puntos
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  // Mostrar la diapositiva actual
  slides[slideIndex - 1].style.display = "block";  

  // Activar el punto correspondiente
  dots[slideIndex - 1].className += " active";
}

// Cambiar diapositiva con los botones
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Ir a una diapositiva específica al hacer clic en los puntos
function currentSlide(n) {
  showSlides(slideIndex = n);
}

// Mostrar la diapositiva inicial
showSlides(slideIndex);

