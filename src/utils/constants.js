export const initialCards = [
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

//Profile
export const profileEditBtn = document.querySelector("#profile-edit-btn");
export const profileEditModal = document.querySelector("#profile-edit-modal");
export const profileEditForm =
  profileEditModal.querySelector("#edit-profile-form");

//Add Card
export const addNewCardBtn = document.querySelector("#profile-add-button");
export const cardAddModal = document.querySelector("#profile-add-modal");
export const cardAddForm = cardAddModal.querySelector("#add-card-form");

//Preview
export const previewImageModal = document.querySelector("#preview-image-modal");
export const previewImage = document.querySelector("#image-preview");
export const previewName = previewImageModal.querySelector(
  "#modal__preview_name"
);

//Input Data
export const profileTitleInput = document.querySelector("#profile-title-input");
export const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

//Export
export const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal_error_visible",
};
