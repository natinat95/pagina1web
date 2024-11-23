document.addEventListener('DOMContentLoaded', function () {
    const cookieBanner = document.getElementById('cookieBanner');
    const acceptCookiesButton = document.getElementById('acceptCookies');

    // Verifica si ya se aceptaron las cookies
    if (!localStorage.getItem('cookiesAccepted')) {
        // Si no se han aceptado, muestra el banner
        cookieBanner.classList.add('show');
    }

    // Al hacer clic en el botón de aceptar cookies
    acceptCookiesButton.addEventListener('click', function () {
        console.log("Botón de aceptar cookies clickeado"); // Verifica si el evento se ejecuta
        // Oculta el banner de cookies de inmediato cambiando el estilo de opacidad
        cookieBanner.classList.remove('show');
        // Guarda en el almacenamiento local que se aceptaron las cookies
        localStorage.setItem('cookiesAccepted', 'true');
    });
});