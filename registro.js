import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.17.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/9.17.0/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDlnv4_IUFYCBVSJ3-vc1Y8LY1Kqc9OdaI",
    authDomain: "danifernandez-1b894.firebaseapp.com",
    databaseURL: "https://danifernandez-1b894-default-rtdb.firebaseio.com",
    projectId: "danifernandez-1b894",
    storageBucket: "danifernandez-1b894.firebasestorage.app",
    messagingSenderId: "185333520693",
    appId: "1:185333520693:web:a33238be235ab62e92947c",
    measurementId: "G-NVNGSG5D82"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Verificar estado de autenticación
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log('Usuario autenticado:', user);
    } else {
        console.log('No hay usuario autenticado');
    }
});

// Función para manejar el registro
document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault();  // Evitar el envío tradicional del formulario

    if (!validateForm()) {
        return; // Si la validación falla, no continuar
    }

    // Obtener valores del formulario
    const name = document.getElementById('name').value;
    const lname = document.getElementById('lname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('psw').value;

    // Crear usuario en Firebase Auth
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('Usuario creado:', userCredential.user);

            // Crear un objeto con los datos del usuario
            const userData = {
                name: name,
                lname: lname,
                email: email,
                registrationDate: new Date().toLocaleDateString(),  // Solo la fecha, como dd/mm/yyyy
                registrationTime: new Date().toLocaleTimeString()   // Solo la hora, como hh:mm:ss
            };

            // Guardar los datos en Firestore bajo el UID del usuario
            return setDoc(doc(db, 'users', userCredential.user.uid), userData);
        })
        .then(() => {
            console.log('Datos guardados en Firestore');
            alert('Registro exitoso');
            window.location.href = 'index.html';  // Redirigir después del registro
        })
        .catch((error) => {
            console.error('Error durante el registro: ', error);
            alert(error.message);  // Mostrar mensaje de error
        });
});

// Función para validar el correo electrónico
function validateEmail() {
    const email = document.getElementById("email").value;
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);  // Expresión regular para validar el email
    if (!isValid) {
        alert("Por favor ingresa un correo electrónico válido.");
        return false;
    }
    return true;
}

// Función para validar el formulario completo
function validateForm() {
    document.getElementById("password-error").textContent = "";
    // Validar el consentimiento de privacidad
    if (!document.getElementById("consent").checked) {
        alert("Debes aceptar el Aviso Legal y la Política de Privacidad.");
        return false;
    }

    // Validar que el correo electrónico sea correcto
    if (!validateEmail()) {
        return false;
    }

    // Validar que las contraseñas coincidan
    const password = document.getElementById("psw").value;
    const confirmPassword = document.getElementById("psw-repeat").value;

    if (password !== confirmPassword) {
        document.getElementById("password-error").textContent = "Las contraseñas no coinciden. Por favor, intenta de nuevo.";
        return false;
    }

    return true;  // Permitir el envío del formulario si todo es válido
}
