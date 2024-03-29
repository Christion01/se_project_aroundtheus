import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputItems = this._popupForm.querySelectorAll(".modal__input");
  }
  close() {
    this._popupForm.reset();
    super.close();
  }

  _getInputValues() {
    const inputValues = {};
    this._inputItems.forEach((inputItem) => {
      inputValues[inputItem.name] = inputItem.value;
    });
    return inputValues;
  }

  setInputValues(data) {
    this._inputItems.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });

    super.setEventListeners();
  }
}
