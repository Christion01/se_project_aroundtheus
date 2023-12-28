import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// ELEMENTS
const profileEditBtn = document.querySelector("#profile-edit-btn");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const addNewCardBtn = document.querySelector("#profile-add-button");
const cardAddModal = document.querySelector("#profile-add-modal");

const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardAddForm = cardAddModal.querySelector(".modal__form");
const cardsListEL = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
//preview
const previewImageModal = document.querySelector("#preview-image-modal");
const previewImage = document.querySelector("#image-preview");
const previewName = previewImageModal.querySelector("#modal__preview_name");

//Input Data
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const cardTitleInput = cardAddForm.querySelector("#new-place-input");
const cardUrlInput = cardAddForm.querySelector("#card-image-url-input");

//FUNCTIONS

function handleImageClick() {
  previewImage.src = this.link;
  previewImage.alt = `Image${this.name}`;
  previewName.textContent = this.name;
  openPopup(previewImageModal);
}

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".modal_opened");
    closePopup(openedPopup);
  }
}

function openPopup(popup) {
  popup.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscape);
}

function closePopup(popup) {
  popup.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscape);
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getView();
}

// const cardImageEL = cardElement.querySelector(".card__image");
// const cardTitleEL = cardElement.querySelector(".card__title");
//const likeButton = cardElement.querySelector(".card__like-button");

//delete button
//const deleteButton = cardElement.querySelector(".card__delete-button");

//deleteButton.addEventListener("click", () => {
//  cardElement.remove();
//});

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardsListEL.prepend(cardElement);
}

// EVENT HANDLERS

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}
function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardsListEL);
  e.target.reset();
  closePopup(cardAddModal);
  cardFormValidator.resetValidation();
}

//closing modal by overlay
[cardAddModal, profileEditModal, previewImageModal].forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (
      evt.target.classList.contains("modal") ||
      evt.target.classList.contains("modal__close")
    ) {
      closePopup(modal);
    }
  });
});

// EVENT LISTENERS

profileEditBtn.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
  profileFormValidator.resetValidation();
});
//ADD NEW CARD BUTTON
addNewCardBtn.addEventListener("click", () => {
  openPopup(cardAddModal);
  cardFormValidator.resetValidation();
});
//PREVIEW IMAGE MODAL

const editModalCloseBtn = document.querySelector("#edit-modal-close-btn");

const addModalCloseBtn = document.querySelector("#add-modal-close-btn");

const previewModalCloseBtn = document.querySelector("#preview-close-btn");

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
cardAddForm.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach((cardData) => renderCard(cardData, cardsListEL));

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal_error_visible",
};

const cardFormValidator = new FormValidator(config, cardAddForm);
cardFormValidator.enableValidation();

const profileFormValidator = new FormValidator(config, profileEditForm);
profileFormValidator.enableValidation();

// after submitting the card form disable the submit button, so the user won't be able to submit an empty form
