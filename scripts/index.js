/* const(cannot change, constant) */
/* let() */

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
const modal = document.querySelector(".modal_opened");

const cardTitleInput = cardAddForm.querySelector("#new-place-input");
const cardUrlInput = cardAddForm.querySelector("#card-image-url-input");
//FUNCTIONS

function handleEscape(evt) {
  if (evt.key === "Escape") {
    closePopup(profileEditModal);
    closePopup(cardAddModal);
    closePopup(previewImageModal);
  }
}
/*
($"body").click(function () {
  if (!$(this.target).is("open__modal")) {
    closePopup(profileEditModal);
    closePopup(cardAddModal);
    closePopup(previewImageModal);
  }
}); */

function handleOverlay(evt) {
  let overlay = !modal;
  overlay.addEventListener("click", () => closePopup(modal));
}

function openPopup(popup) {
  popup.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscape);
}

function closePopup(popup) {
  popup.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscape);
}

closePopup(profileEditModal);
closePopup(cardAddModal);
closePopup(previewImageModal);

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImageEL = cardElement.querySelector(".card__image");
  const cardTitleEL = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");

  //delete button
  const deleteButton = cardElement.querySelector(".card__delete-button");

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  //cardImageEL evnetListener

  cardImageEL.addEventListener("click", () => {
    previewImage.src = cardImageEL.src;
    previewName.textContent = cardData.name;
    previewImage.alt = cardData.name;
    openPopup(previewImageModal);
  });

  //like button
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  //adding initial cards
  cardTitleEL.textContent = cardData.name;
  cardImageEL.src = cardData.link;
  cardImageEL.alt = cardData.name;
  return cardElement;
}

function renderCard(cardData) {
  const cardElement = getCardElement(cardData);
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
});
//ADD NEW CARD BUTTON
addNewCardBtn.addEventListener("click", () => {
  openPopup(cardAddModal);
});
//PREVIEW IMAGE MODAL

const editModalCloseBtn = document.querySelector("#edit-modal-close-btn");
editModalCloseBtn.addEventListener("click", () => closePopup(profileEditModal));

const addModalCloseBtn = document.querySelector("#add-modal-close-btn");
addModalCloseBtn.addEventListener("click", () => closePopup(cardAddModal));

const previewModalCloseBtn = document.querySelector("#preview-close-btn");
previewModalCloseBtn.addEventListener("click", () =>
  closePopup(previewImageModal)
);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
cardAddForm.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach((cardData) => renderCard(cardData, cardsListEL));
