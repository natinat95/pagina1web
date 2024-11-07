import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.0/firebase-app.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/9.17.0/firebase-firestore.js"; 

// Configuración de Firebase
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
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Obtener la instancia de Auth
const db = getFirestore(app);
// Función para manejar el inicio de sesión
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevenir el envío normal del formulario

    const email = document.getElementById('email').value;
    const password = document.getElementById('psw').value; // Cambiar a 'psw' aquí

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Iniciar sesión exitosamente
            console.log('Usuario autenticado:', userCredential.user);

            // Obtener la fecha y hora actuales en formato ISO
            const loginDate = new Date().toISOString();

            // Guardar la fecha y hora de inicio de sesión en Firestore
            setDoc(doc(db, 'users', userCredential.user.uid), {
                lastLogin: loginDate, // Guardamos la fecha de último inicio de sesión
            }, { merge: true }) // merge: true para no sobrescribir otros datos
            .then(() => {
                console.log('Fecha y hora de login guardada');
            })
            .catch((error) => {
                console.error('Error guardando la fecha de login: ', error);
            });

            alert('Inicio de sesión exitoso');
            window.location.href = 'welcome.html'; // Redirigir al usuario a la página principal
        })
        .catch((error) => {
            console.error('Error durante el inicio de sesión: ', error);
            alert(error.message);
        });
});
