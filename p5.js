let shapes = []; // Array para almacenar las formas (bolas)
let numShapes = 10; // Número de formas a crear
let clickedShape = null; // Para identificar la bola clickeada
let targetX = null; // Posición objetivo en X
let targetY = null; // Posición objetivo en Y

function setup() {
    // Crear un lienzo que ocupe todo el tamaño de la ventana
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0); // Posicionar el lienzo en la esquina superior izquierda
    canvas.style('z-index', '-1'); // Colocar el lienzo detrás de otros elementos
    canvas.style('position', 'fixed'); // Hacer que el lienzo se quede fijo en la pantalla
    noStroke(); // Desactivar los bordes de las formas

    // Crear las formas iniciales
    for (let i = 0; i < numShapes; i++) {
        shapes.push({
            x: random(width), // Posición X aleatoria en el lienzo
            y: random(height), // Posición Y aleatoria en el lienzo
            size: random(100, 300), // Tamaño aleatorio entre 100 y 300 píxeles
            color: color(random(200, 255), 0, 0, random(100, 200)), // Color rojo aleatorio con opacidad aleatoria
            xSpeed: random(-2, 2), // Velocidad horizontal aleatoria
            ySpeed: random(-2, 2), // Velocidad vertical aleatoria
        });
    }
}

function draw() {
    background(0); // Fondo negro en cada fotograma

    // Recorrer todas las formas
    for (let shape of shapes) {
        // Actualizar la posición de la forma según su velocidad
        shape.x += shape.xSpeed;
        shape.y += shape.ySpeed;

        // Rebotar en los bordes del lienzo
        if (shape.x < 0 || shape.x > width) {
            shape.xSpeed *= -1; // Cambiar la dirección de la velocidad en X
        }
        if (shape.y < 0 || shape.y > height) {
            shape.ySpeed *= -1; // Cambiar la dirección de la velocidad en Y
        }

        // Si se ha asignado un objetivo, mover la forma hacia ese punto
        if (targetX !== null && targetY !== null) {
            shape.x = lerp(shape.x, targetX, 0.1); // Mover suavemente en X hacia el objetivo
            shape.y = lerp(shape.y, targetY, 0.1); // Mover suavemente en Y hacia el objetivo

            // Si la forma está cerca del objetivo, detener el movimiento
            if (dist(shape.x, shape.y, targetX, targetY) < 5) {
                targetX = null; // Restablecer objetivo en X
                targetY = null; // Restablecer objetivo en Y
            }
        }

        // Dibujar la forma (una elipse) en la pantalla con su color y tamaño
        fill(shape.color);
        ellipse(shape.x, shape.y, shape.size); // Dibuja la forma en las nuevas coordenadas
    }
}

function mousePressed() {
    // Detectar si se hace clic en alguna forma
    for (let shape of shapes) {
        // Calcular la distancia entre el clic y el centro de la forma
        let d = dist(mouseX, mouseY, shape.x, shape.y);
        if (d < shape.size / 2) { // Si el clic está dentro de la forma
            // Mover la forma rápidamente al otro lado de la pantalla
            if (mouseX < width / 2) {
                targetX = width; // Mover a la derecha
            } else {
                targetX = 0; // Mover a la izquierda
            }

            if (mouseY < height / 2) {
                targetY = height; // Mover abajo
            } else {
                targetY = 0; // Mover arriba
            }
        }
    }
}

// Función para ajustar el tamaño del lienzo cuando la ventana cambia de tamaño
function windowResized() {
    resizeCanvas(windowWidth, windowHeight); // Redimensionar el lienzo
}
