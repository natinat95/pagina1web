
document.addEventListener('DOMContentLoaded', function() {
    const cookieDialog = document.getElementById('cookieDialog');
    const acceptButton = document.getElementById('acceptCookies');
  
    // Comprueba si el aviso ya ha sido aceptado
    if (!localStorage.getItem('cookiesAccepted')) {
      cookieDialog.showModal();
    }
  
    acceptButton.addEventListener('click', function() {
      localStorage.setItem('cookiesAccepted', 'true');
      cookieDialog.close();
    });
  });