import createElement from '../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.modal = document.createElement("div");
    this.modal.className = "modal";
    this.modal.insertAdjacentHTML('afterbegin', this.#template());
    this.closeModal();

  }
  open() {
    document.body.insertAdjacentElement("afterbegin", this.modal);
    document.body.classList.add("is-modal-open");
  }

  #template() {
    return `
    <div class="modal__overlay"></div>
  <div class="modal__inner">
    <div class="modal__header">
      <!--Кнопка закрытия модального окна-->
      <button type="button" class="modal__close">
        <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
      </button>
      <h3 class="modal__title">
        Вот сюда нужно добавлять заголовок
      </h3>
    </div>
    <div class="modal__body">
      A сюда нужно добавлять содержимое тела модального окна
    </div>
  </div>`;
  }

  setTitle(title) {
    const modalTilte = this.modal.querySelector(".modal__title");
    modalTilte.textContent = title;
  }

  setBody(body) {
    const modalBody = this.modal.querySelector(".modal__body");

    modalBody.textContent = "";
    modalBody.insertAdjacentElement("afterbegin", body);

  }
  closeModal() {
    this.#closeOnClick();
    document.addEventListener("keydown", this.#closeOnEsc);
    this.#OnEscRemove();
  }

  close() {
    document.body.classList.remove("is-modal-open");
    this.modal.remove();

  }

  #closeOnClick() {
    const btnClose = this.modal.querySelector(".modal__close");

    btnClose.addEventListener("click", () => {
      document.body.classList.remove("is-modal-open");
      this.modal.remove();
    });

  }

  #closeOnEsc = (event) => {

    if (event.code == "Escape") {
      document.body.classList.remove("is-modal-open");
      this.modal.remove();
    }

  }

  #OnEscRemove() {

    if (document.body.className != "is-modal-open") return;

    document.removeEventListener("keydown", this.#closeOnEsc);
  }

}
