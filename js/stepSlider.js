export default class StepSlider {

  constructor({ steps, value = 2 }) {
    this.steps = steps;
    this.value = value;
    this.elem = document.createElement("div");
    this.elem.className = "slider";
    this.segment = steps - 1;

    this.render();
  }

  render() {
    this.elem.innerHTML = this.#template();
    const firstStep = this.elem.querySelector(".slider__steps").children[this.value];
    firstStep.classList.add("slider__step-active");
    this.#onDown();
    this.#onClick();
  }

  #template() {
    return `
<div class="slider__thumb" style="left: 50%;">
<span class="slider__value">${this.value}</span>
</div>

<div class="slider__progress" style="width: 50%;"></div>

<div class="slider__steps">${`<span></span>`.repeat(this.steps)}</div>`;
  }

  #onDown() {
    this.elem.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      this.elem.classList.add("slider_dragging");

      document.addEventListener("pointermove", this.onMove);
      this.elem.addEventListener("pointerup", this.onUp);

      this.elem.ondragstart = () => false;
    });

  }

  onMove = (event) => {
    event.preventDefault();
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let currentLeft = left / this.elem.offsetWidth;

    if (currentLeft < 0) {
      currentLeft = 0;
    }
    if (currentLeft > 1) {
      currentLeft = 1;
    }
    const position = currentLeft * 100;
    const thumb = this.elem.querySelector(".slider__thumb");
    const progress = this.elem.querySelector(".slider__progress");

    thumb.style.left = `${position}%`;
    progress.style.width = `${position}%`;

    let currentStep = Math.round(this.segment * currentLeft);
    this.value = currentStep;
    const sliderSteps = this.elem.querySelector(".slider__steps").children;

    Array.from(sliderSteps).forEach(item => {
      item.classList.remove("slider__step-active");
    });

    sliderSteps[currentStep].classList.add("slider__step-active");
    this.elem.querySelector(".slider__value").textContent = this.value;
  };
  onUp = (event) => {

    this.elem.classList.remove("slider_dragging");
    document.removeEventListener("pointermove", this.onMove);
    this.elem.removeEventListener("pointerup", this.onUp);

    let customEvent = new CustomEvent("slider-change", {
      detail: this.value,
      bubbles: true
    });

    this.elem.dispatchEvent(customEvent);

  }

  #onClick() {
    this.elem.addEventListener("click", (event) => {

      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let currentLeft = left / this.elem.offsetWidth;

      let currentStep = Math.round(currentLeft * this.segment);
      this.value = currentStep;

      const sliderSteps = this.elem.querySelector(".slider__steps").children;

      Array.from(sliderSteps).forEach(item => {
        item.classList.remove("slider__step-active");
      });

      sliderSteps[currentStep].classList.add("slider__step-active");
      this.elem.querySelector(".slider__value").textContent = this.value;
  
      this.#isPosition();

      let customEvent = new CustomEvent("slider-change", {
        detail: this.value,
        bubbles: true
      });
      this.elem.dispatchEvent(customEvent);
    });

  }

  #isPosition() {

    const thumb = this.elem.querySelector(".slider__thumb");
    const progress = this.elem.querySelector(".slider__progress");

    const position = this.value / this.segment * 100;

    thumb.style.left = `${position}%`;
    progress.style.width = `${position}%`;

  }


}
