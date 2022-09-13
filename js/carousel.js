import createElement from '../assets/lib/create-element.js';

export default class Carousel {
  #elem = [];
  slides = [];

  constructor(slides) {
    this.#elem = document.createElement("div");
    this.#elem.className = "carousel";
    this.slides = slides;
    this.render();
  }
  render() {
    this.#elem.innerHTML = this.#template();
    this.#initCarousel();
    this.#onClick();
  }

  get elem() {
    return this.#elem;
  }

  get #conteiner() {
    return this.#elem.querySelectorAll(".carousel__button");
  }

  #template() {
    return `
      <div class="carousel__arrow carousel__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </div>
    <div class="carousel__arrow carousel__arrow_left">
      <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
    </div>
    <div class="carousel__inner">` + this.slides.map(item =>

      ` <div class="carousel__slide" data-id="${item.id}">
      <img src="/assets/images/carousel/${item.image}" class="carousel__img" alt="slide">
      <div class="carousel__caption">
        <span class="carousel__price">&euro;${item.price.toFixed(2)}</span>
        <div class="carousel__title">${item.name}</div>
        <button type="button" class="carousel__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    </div> `)
        .join("") + `</div>`;
  }
  #initCarousel() {
    const inner = this.#elem.querySelector(".carousel__inner");
    const slides = this.#elem.querySelectorAll(".carousel__slide");
    const slide = this.#elem.querySelector(".carousel__slide");
    const leftBtn = this.#elem.querySelector(".carousel__arrow_left");
    const rightBtn = this.#elem.querySelector(".carousel__arrow_right");

    let position = 0;
    let i = 0;

    leftBtn.style.display = "none";

    leftBtn.addEventListener("click", () => {
      i--;
      rightBtn.style.display = "";

      if (0 == i) {
        leftBtn.style.display = "none";
      }

      position -= slide.offsetWidth;
      position = Math.max(position, 0);
      inner.style.transform = `translateX(${-position}px)`;
    }
    );

    rightBtn.addEventListener("click", () => {
      i++;
      leftBtn.style.display = "";

      if (slides.length - 1 == i) {
        rightBtn.style.display = "none";
      }

      position += slide.offsetWidth;
      position = Math.min(position, (slide.offsetWidth * slides.length));
      inner.style.transform = `translateX(${-position}px)`;
    }
    );
  }

  #onClick = () => {


    this.#conteiner.forEach((item) => {
      item.addEventListener("click", () => {
        const id = item.closest(".carousel__slide").dataset.id;

        let customEvent = (new CustomEvent("product-add", {
          detail: id,
          bubbles: true,
        }));
        this.#elem.dispatchEvent(customEvent);
      });
    });
  }
}
