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

//Input Data
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const cardTitleInput = cardAddForm.querySelector("#new-place-input");
const cardUrlInput = cardAddForm.querySelector("#card-image-url-input");

// FUNCTIONS

function closePopup() {
  profileEditModal.classList.remove("modal_opened");
  cardAddModal.classList.remove("modal_opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImageEL = cardElement.querySelector(".card__image");
  const cardTitleEL = cardElement.querySelector(".card__title");

  cardTitleEL.textContent = cardData.name;
  cardImageEL.src = cardData.link;
  cardImageEL.alt = cardData.name;
  console.log(cardData);
  return cardElement;
}

function renderCard(cardData) {
  cardElement = getCardElement(cardData);
  cardsListEL.prepend(cardElement);
}

// EVENT HANDLERS

function handleProfileEditSubmit(e) {
  e.preventDefault();

  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup();
}
function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardsListEL);
  closePopup();
}

// EVENT LISTENERS

profileEditBtn.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileEditModal.classList.add("modal_opened");
});
//ADD NEW CARD BUTTON
addNewCardBtn.addEventListener("click", () => {
  cardAddModal.classList.add("modal_opened");
});

const editModalCloseBtn = document.querySelector("#edit-modal-close-btn");
editModalCloseBtn.addEventListener("click", closePopup);

const addModalCloseBtn = document.querySelector("#add-modal-close-btn");
addModalCloseBtn.addEventListener("click", closePopup);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
cardAddForm.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach((cardData) => renderCard(cardData, cardsListEL));
