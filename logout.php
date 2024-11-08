<?php
session_start(); // Inicia la sesión

// Destruir todas las variables de sesión
$_SESSION = array(); // Limpia todas las variables de sesión

// Si se desea, también se puede destruir la sesión
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}

session_destroy(); // Destruye la sesión

// Redirige al usuario a la página de inicio de sesión
header("Location: index.html");
exit;
?>
