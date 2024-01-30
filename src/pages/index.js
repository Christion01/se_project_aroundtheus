import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import "../pages/index.css";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../UserInfo.js";
import {
  initialCards,
  profileEditBtn,
  addNewCardBtn,
  profileEditForm,
  cardAddForm,
  config,
  profileTitleInput,
  profileDescriptionInput,
} from "../utils/constants.js";

//Popups

const newCardPopup = new PopupWithForm(
  "#profile-add-modal",
  handleAddCardSubmit
);
newCardPopup.setEventListeners();

const imagePopup = new PopupWithImage("#preview-image-modal");
imagePopup.setEventListeners();

const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
profileEditPopup.setEventListeners();

//UserInfo

const userInfo = new UserInfo(".profile__title", ".profile__description");

function handleImageClick(card) {
  imagePopup.open(card);
}

//Cards

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getView();
}

const sectionCards = new Section(
  { items: initialCards, renderer: createCard },
  ".cards__list"
);

sectionCards.renderItems();

//Submissions

function handleAddCardSubmit(cardData) {
  sectionCards.addItem(createCard(cardData));
  newCardPopup.close();
}

function handleProfileEditSubmit(userData) {
  userInfo.setUserInfo(userData.name, userData.description);
  profileEditPopup.close();
}

//Event Listeners

profileEditBtn.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileFormValidator.resetValidation();
  profileEditPopup.setInputValues(userData);
  profileEditPopup.open();
});

addNewCardBtn.addEventListener("click", () => {
  newCardPopup.open();
  cardFormValidator.resetValidation();
});

//Validation
const cardFormValidator = new FormValidator(config, cardAddForm);
const profileFormValidator = new FormValidator(config, profileEditForm);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
