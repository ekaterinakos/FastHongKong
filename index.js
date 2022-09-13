import Carousel from './js/carousel.js';
import slides from './js/slides.js';

import RibbonMenu from './js/ribbonMenu.js';
import categories from './js/categories.js';

import StepSlider from './js/stepSlider.js';
import ProductsGrid from './js/productsGrid.js';

import CartIcon from './js/cartIcon.js';
import Cart from './js/cart.js';

export default class Main {

  constructor() {
  }
  async render() {
    this.carousel();
    this.ribbonMenu();
    this.stepSlider();
    this.cartIcon();
    this.cart();

    const response = await fetch("./products.json");
    this.json = await response.json();

    this.productsGrid();
    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.id
    });

    this.addEventListener();

  }

  carousel() {
    this.carousel = new Carousel(slides);
    let carouselHolder = document.body.querySelector("[data-carousel-holder]");
    carouselHolder.append(this.carousel.elem);
  }

  ribbonMenu() {
    this.ribbonMenu = new RibbonMenu(categories);
    let ribbonHolder = document.querySelector("[data-ribbon-holder]");
    ribbonHolder.append(this.ribbonMenu.elem);
  }

  stepSlider() {

    this.stepSlider = new StepSlider({ steps: 5, value: 3, });
    let sliderHolder = document.querySelector("[data-slider-holder]");
    sliderHolder.append(this.stepSlider.elem);
  }

  cartIcon() {
    this.cartIcon = new CartIcon();
    let cartIconHolder = document.querySelector("[data-cart-icon-holder]");
    cartIconHolder.append(this.cartIcon.elem);
  }

  cart() {
    this.cart = new Cart(this.cartIcon);
  }

  productsGrid() {
    this.productsGrid = new ProductsGrid(this.json);
    let productHolder = document.querySelector("[data-products-grid-holder]");
    productHolder.append(this.productsGrid.elem);
  }

  addEventListener() {
    document.body.addEventListener("product-add", ({ detail: id }) => {
      let productId = this.json.find(item => item.id == id);
      this.cart.addProduct(productId);
    });

    this.stepSlider.elem.addEventListener("slider-change", ({ detail: value }) => {
      this.productsGrid.updateFilter({
        maxSpiciness: value
      });
    });

    this.ribbonMenu.elem.addEventListener("ribbon-select", ({ detail: id }) => {
      this.productsGrid.updateFilter({
        category: id
      });
    });

    document.getElementById("nuts-checkbox").addEventListener("change", (event) => {
      this.productsGrid.updateFilter({
        noNuts: event.target.checked
      });
    });

    document.getElementById("vegeterian-checkbox").addEventListener("change", (event) => {
      this.productsGrid.updateFilter({
        vegeterianOnly: event.target.checked
      });
    });

  }

}
