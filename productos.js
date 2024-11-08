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
