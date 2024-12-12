// Obtén el template de la tarjeta
const template = document.getElementById('product-card-template');

// Obtén el contenedor donde se insertarán las tarjetas
const container = document.querySelector('.productos-container');

// Función para crear tarjetas dinámicamente
function createCard(image, title, description, price) {
    const clone = template.content.cloneNode(true); // Clonamos el contenido del template

    // Insertar contenido en los slots
    clone.querySelector('img').setAttribute('src', image);
    clone.querySelector('slot[name="title"]').textContent = title;
    clone.querySelector('slot[name="description"]').textContent = description;
    clone.querySelector('slot[name="price"]').textContent = price;

    // Obtener el botón de "favorito" dentro de la tarjeta clonada
    const likeButton = clone.querySelector('.like-button');

    // Función para manejar el clic en el botón de favorito
    likeButton.addEventListener('click', function() {
        // Obtener el ícono del corazón dentro del botón
        const heart = this.querySelector('.heart');

        // Alternar la clase 'favorito' en el ícono
        heart.classList.toggle('favorito');
    });

    // Agregar la tarjeta al contenedor
    container.appendChild(clone);
}

// Llamar a la función para crear varias tarjetas
createCard('img/alvaro.jpg', '8 enero', 'Madrid', '29€');
createCard('img/dani2.jpg', '20 enero', 'Bilbao', '35€');
createCard('img/dudas.jpg', '8 febrero', 'Murcia', '42€');
createCard('img/criminal.jpg', '4 marzo', 'Alicante', '50€');
