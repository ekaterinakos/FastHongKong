import createElement from '../assets/lib/create-element.js';
import ProductCard from './productCart.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = createElement('<div class="products-grid"></div>');

    this.render();
  }

  render() {
    this.#tepmlate();

    let productInner = this.elem.querySelector(".products-grid__inner");
    this.products.forEach(item => {
      const card = new ProductCard(item);
      productInner.append(card.elem);
    });

  }

  #tepmlate() {
    this.elem.innerHTML = `
    <div class="products-grid__inner">
    </div>`;
  }

  updateFilter(filters) {

    Object.assign(this.filters, filters);
    let productInner = this.elem.querySelector(".products-grid__inner");
    productInner.innerHTML = "";

    for (let product of this.products) {
      if (this.filters.noNuts && product.nuts) continue;
      if (this.filters.vegeterianOnly && !product.vegeterian) continue;
      if (this.filters.category && this.filters.category !== product.category) continue;
      if (typeof this.filters.maxSpiciness === 'number' &&
        this.filters.maxSpiciness < product.spiciness) continue;

      let productCard = new ProductCard(product);
      productInner.append(productCard.elem);

    }
  }
}
