import createElement from '../assets/lib/create-element.js';

export default class RibbonMenu {
  categories = [];
  #elem = [];

  constructor(categories) {
    this.categories = categories;
    this.#elem = document.createElement("div");
    this.#elem.className = "ribbon";
    this.render();
  }

  render() {
    this.#elem.innerHTML = this.#template();
    this.#onScroll();
    this.#isActive();
  }

  get elem() {
    return this.#elem;
  }

  #template() {
    return `

  <button class="ribbon__arrow ribbon__arrow_left">
    <img src="/assets/images/icons/angle-icon.svg" alt="icon">
  </button>

  <nav class="ribbon__inner">` + this.categories.map(item =>
      `<a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a>`
    ).join("") +
      `</nav>

  <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
    <img src="/assets/images/icons/angle-icon.svg" alt="icon">
  </button>
  `;
  }

  #onScroll() {
    const leftBtn = this.#elem.querySelector(".ribbon__arrow_left");
    const rightBtn = this.#elem.querySelector(".ribbon__arrow_right");
    const inner = this.#elem.querySelector(".ribbon__inner");

    inner.firstElementChild.classList.add("ribbon__item_active");

    this.#elem.addEventListener("click", (event) => {
      let target = event.target;
      let scrollWidth = inner.scrollWidth;
      let clientWidth = inner.clientWidth;
      let scrollLeft = inner.scrollLeft;
      let scrollRight = scrollWidth - scrollLeft - clientWidth;

      if (target.closest(".ribbon__arrow_right")) {
        inner.scrollBy(350, 0);

        inner.addEventListener("scroll", () => {
          scrollWidth = inner.scrollWidth;
          clientWidth = inner.clientWidth;
          scrollLeft = inner.scrollLeft;
          scrollRight = scrollWidth - scrollLeft - clientWidth;
          
          if (scrollRight > 0) {
            rightBtn.classList.remove("ribbon__arrow_visible");
            leftBtn.classList.add("ribbon__arrow_visible");
          }
          
        }
        );
      }

      if (target.closest(".ribbon__arrow_left")) {
        inner.scrollBy(-350, 0);

        inner.addEventListener("scroll", () => {
          scrollLeft = inner.scrollLeft;

          if (scrollLeft == 0) {
            leftBtn.classList.remove("ribbon__arrow_visible");
            rightBtn.classList.add("ribbon__arrow_visible");
          }

        }
        );
      }
    });
  }

  #isActive() {

    const items = this.#elem.querySelectorAll(".ribbon__item");

    for (let item of items) {
      item.addEventListener("click", (event) => {
        event.preventDefault();

        this.#elem.querySelector(".ribbon__item_active").classList.remove("ribbon__item_active");
        event.target.classList.add("ribbon__item_active");

        const id = item.closest(".ribbon__item").dataset.id;
        let customEvent = (new CustomEvent("ribbon-select", {
          detail: id,
          bubbles: true,
        }));
        this.#elem.dispatchEvent(customEvent);
      });
    }
  }

}
