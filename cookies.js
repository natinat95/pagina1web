document.addEventListener('DOMContentLoaded', function () {
  // Obtener el elemento del diálogo de cookies en el DOM
  const cookieDialog = document.getElementById('cookieDialog');

  // Obtener el botón de aceptación de cookies en el DOM
  const acceptButton = document.getElementById('acceptCookies');

  // Verificar si ya se ha aceptado las cookies anteriormente, revisando el localStorage
  if (!localStorage.getItem('cookiesAccepted')) {
    // Si no se ha aceptado, mostramos el diálogo de cookies
    cookieDialog.showModal();
  }

  // Agregar un evento al botón para aceptar las cookies
  acceptButton.addEventListener('click', function () {
    // Cuando el usuario haga clic en aceptar, se guarda en localStorage que las cookies han sido aceptadas
    localStorage.setItem('cookiesAccepted', 'true');

    // Luego, se cierra el diálogo de cookies
    cookieDialog.close();
  });
});
