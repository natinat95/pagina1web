class ProductCard extends HTMLElement {
    constructor() {
        super();
        const template = document.createElement('template');
        template.innerHTML = `
        <style>
        
          /* Estilos específicos de la tarjeta de producto */
          .product-card {
              width: 250px;
              min-height: 450px;
              background-color: #1a1a1aa3;
              border-radius: 10px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              padding: 20px;
              text-align: center;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              transition: transform 0.3s ease;
              box-sizing: border-box;
          }
          .product-card:hover {
              transform: translateY(-5px);
          }
          .product-card img {
              width: 100%;
              height: auto;
              max-height: 200px;
              object-fit: cover;
              border-radius: 8px;
          }
          .product-card h3 {
              font-size: 1.2em;
              margin: 10px 0;
          }
          .product-card p {
              font-size: 1em;
              color: #ddd;
          }
          .price {
              font-size: 1.4em;
              color: #ea210b;
              font-weight: bold;
              margin-top: 10px;
          }
          .btn {
              background-color: #ea210b;
              color: white;
              padding: 8px 15px;
              border: none;
              border-radius: 5px;
              cursor: pointer;
              margin-top: 10px;
              transition: background-color 0.3s;
          }
          .btn:hover {
              background-color: #ff5733;
          }

            /* Estilo para el botón de favorito */
        .favorite-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background-color: #ea210b;
            color: white;
            border: none;
            font-size: 14px;
            padding: 5px 10px;
            cursor: pointer;
            transition: background-color 0.3s, color 0.3s;
            margin-top: 10px;
            border-radius: 5px;
            font-family: 'Roboto', sans-serif;
        }

        .favorite-btn:hover {
            background-color: #ff5733;
        }

        .favorite-btn .heart {
            font-size: 1.5em;
            margin-left: 8px;
            transition: color 0.3s ease;
        }

        .favorite-btn.liked {
            background-color: #ff5733; /* Fondo cuando es favorito */
            color: white; /* Color de texto */
        }

        .favorite-btn.liked .heart {
            color: black; /* Rojo cuando es favorito */
        }
                </style>

                <div class="product-card">
                    <slot name="image">
                        <img src="" alt="Imagen del producto">
                    </slot>
                    <h3><slot name="title">Producto</slot></h3>
                    <p><slot name="description">Descripción del producto</slot></p>
                    <p class="price"><slot name="price">$0.00</slot></p>
                    <button class="btn">Agregar al carrito</button>
                    <!-- Botón de favorito con Font Awesome -->
                    <button class="btn favorite-btn">
                        Favorito
                        <i class="heart fas fa-heart"></i> <!-- Ícono de corazón -->
                    </button>
                </div>
            `;


        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));

        // Importa Font Awesome dentro del shadowRoot
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
        shadowRoot.appendChild(link);

        // Seleccionamos el botón de favorito dentro del Shadow DOM
        const favoriteBtn = shadowRoot.querySelector('.favorite-btn');
        favoriteBtn.addEventListener('click', () => this.toggleFavorite(favoriteBtn));
    }

    // Función que alterna el estado de favorito
    toggleFavorite(button) {
        console.log('Clic en el botón de favorito');
        // Cambiar la clase 'liked' al botón para cambiar el color del corazón
        button.classList.toggle('liked');
    }
}

// Definir el custom element
customElements.define('product-card', ProductCard);