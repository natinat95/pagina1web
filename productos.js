class ProductCard extends HTMLElement {
  constructor() {
      super();
      const template = document.createElement('template');
      template.innerHTML = `
          <style>
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
                  height: auto; /* Hace que la imagen se ajuste */
                  max-height: 200px; /* Para limitar la altura */
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

              /* Media Query para pantallas pequeñas */
              @media (max-width: 600px) {
                  .product-card {
                      width: 100%; /* Hace que la tarjeta ocupe todo el ancho disponible */
                      margin: 10px 0; /* Margen entre tarjetas */
                  }
                  .product-card img {
                      height: auto; /* Deja que la imagen se ajuste mejor */
                      max-height: 150px; /* Limita la altura de la imagen */
                  }
                  .product-card h3 {
                      font-size: 1em; /* Ajusta el tamaño del título */
                  }
                  .product-card p {
                      font-size: 0.9em; /* Ajusta el tamaño de la descripción */
                  }
                  .price {
                      font-size: 1.2em; /* Ajusta el tamaño del precio */
                  }
              }

          </style>
          <div class="product-card">
              <slot name="image">
                  <img src="default-image.jpg" alt="Imagen del producto">
              </slot>
              <h3><slot name="title">Producto</slot></h3>
              <p><slot name="description">Descripción del producto</slot></p>
              <p class="price"><slot name="price">$0.00</slot></p>
              <button class="btn">Agregar al carrito</button>
              <button class="btn">Favorito</button>
          </div>
      `;
      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(template.content.cloneNode(true));
  }
}


customElements.define('product-card', ProductCard);
