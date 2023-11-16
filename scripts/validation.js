// enabling validation by calling enableValidation()
// pass all the settings on call
const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal_error_visible",
};
enableValidation(config);

function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = document.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(errorClass);
}

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = document.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(errorClass);
}

function checkInputValidity(formEl, inputEl, options) {
  if (!inputEl.validity.valid) {
    return showInputError(formEl, inputEl, options);
  }
  hideInputError(formEl, inputEl, options);
}

function hasInvalidInput(inputList) {
  return !inputList.every((inputEl) => inputEl.validity.valid);
}

//disable button

function disableButton(inputEls, submitButton, inactiveButtonClass) {
  submitButton.classList.add(inactiveButtonClass);
}

//enable button

function enableButton(inputEls, submitButton, inactiveButtonClass) {
  submitButton.classList.remove(inactiveButtonClass);
}

function toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
  if (hasInvalidInput(inputEls)) {
    disableButton(inputEls, submitButton, inactiveButtonClass);
    return;
  }
  enableButton(inputEls, submitButton, inactiveButtonClass);
}

function setEventListeners(formEl, options) {
  const { inputSelector } = options;
  const inputEls = [...formEl.querySelectorAll(options.inputSelector)];
  const submitButton = formEl.querySelector(options.submitButtonSelector);
  toggleButtonState(inputEls, submitButton, options);
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (evt) => {
      checkInputValidity(formEl, inputEl, options);
      toggleButtonState(inputEls, submitButton, options);
    });
  });
}

function enableValidation(options) {
  const formEls = [...document.querySelectorAll(options.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log(formEls);
    });

    setEventListeners(formEl, options);
  });
}
