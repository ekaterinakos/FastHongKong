export default class ProductCard {
  #elem = [];
  product = [];

  constructor(product) {
    this.#elem = document.createElement("div");
    this.#elem.className = "card";
    this.product = product;
    this.render();
  }

  render() {
    this.#elem.innerHTML = this.#template();

    this.#conteiner.addEventListener("click", this.#onClick);
  }

  #template() {
    return `
    <div class="card__top">
        <img src="/assets/images/products/${this.product.image}" class="card__image" alt="product">
        <span class="card__price">&euro;${this.product.price.toFixed(2)}</span>
    </div>
    <div class="card__body">
        <div class="card__title">${this.product.name}</div>
        <button type="button" class="card__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
    </div>`;
  }

  get elem() {
    return this.#elem;
  }

  get #conteiner() {
    return this.#elem.querySelector(".card__button");
  }

  #onClick = () => {
    let customEvent = new CustomEvent("product-add", {
      detail: this.product.id,
      bubbles: true
    });
    this.#elem.dispatchEvent(customEvent);
  }
}
