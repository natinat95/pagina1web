// Importación de funciones y servicios de Firebase
// - `getAuth` y `signInWithEmailAndPassword` son para manejar la autenticación de usuarios.
// - `initializeApp` inicializa la aplicación Firebase.
// - `getFirestore`, `setDoc` y `doc` permiten interactuar con Firestore, la base de datos de Firebase.
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.0/firebase-app.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/9.17.0/firebase-firestore.js";

// Configuración de Firebase
// Este objeto contiene las credenciales necesarias para conectar con el proyecto en Firebase.
const firebaseConfig = {
    apiKey: "AIzaSyDlnv4_IUFYCBVSJ3-vc1Y8LY1Kqc9OdaI",
    authDomain: "danifernandez-1b894.firebaseapp.com",
    projectId: "danifernandez-1b894",
    storageBucket: "danifernandez-1b894.appspot.com",
    messagingSenderId: "185333520693",
    appId: "1:185333520693:web:a33238be235ab62e92947c",
    measurementId: "G-NVNGSG5D82"
};

// Inicializar Firebase
// - `initializeApp(firebaseConfig)`: Conecta tu aplicación con Firebase usando la configuración.
// - `getAuth(app)`: Obtiene la instancia del servicio de autenticación de Firebase.
// - `getFirestore(app)`: Obtiene la instancia de Firestore (base de datos).
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Añade un evento al formulario de inicio de sesión
// - Escucha el evento `submit` del formulario con el ID `loginForm`.
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada.

    // Obtiene los valores ingresados en los campos de email y contraseña.
    const email = document.getElementById('email').value;
    const password = document.getElementById('psw').value;

    // Llama a Firebase para autenticar al usuario con email y contraseña.
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Si la autenticación es exitosa:
            console.log('Usuario autenticado:', userCredential.user);

            // Obtiene la hora actual del sistema.
            const now = new Date();
            const loginTime = formatTime(now); // Formatea la hora actual (hh:mm:ss).

            // Guarda la hora de inicio de sesión en Firestore.
            // - `doc(db, 'users', userCredential.user.uid)`: Crea o selecciona un documento del usuario en la colección "users".
            // - `setDoc`: Guarda la hora de inicio de sesión. El parámetro `merge: true` asegura que solo actualice el campo especificado.
            setDoc(doc(db, 'users', userCredential.user.uid), {
                lastLoginTime: loginTime,
            }, { merge: true })
            .then(() => {
                console.log('Hora de login actualizada');
            })
            .catch((error) => {
                // Maneja errores al guardar la hora en Firestore.
                console.error('Error guardando la hora de login: ', error);
            });

            // Muestra un mensaje de éxito al usuario.
            alert('Inicio de sesión exitoso');
            // Redirige al usuario a otra página después de iniciar sesión.
            window.location.href = 'welcome.html';
        })
        .catch((error) => {
            // Maneja errores durante el inicio de sesión.
            console.error('Error durante el inicio de sesión: ', error);
            alert(error.message); // Muestra el mensaje de error al usuario.
        });
});

// Función para formatear la hora actual en formato hh:mm:ss
function formatTime(date) {
    const hours = String(date.getHours()).padStart(2, '0'); // Asegura que las horas tengan 2 dígitos.
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Asegura que los minutos tengan 2 dígitos.
    const seconds = String(date.getSeconds()).padStart(2, '0'); // Asegura que los segundos tengan 2 dígitos.
    return `${hours}:${minutes}:${seconds}`; // Retorna la hora en el formato deseado.
}
