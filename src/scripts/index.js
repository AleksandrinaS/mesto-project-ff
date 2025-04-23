import { initialCards } from "../components/cards";
import { createCard, deleteCard} from "../components/card";
import { openModal, closeModal, setupModalListeners } from "../components/modals";
import {
    clearValidation,
    enableValidation
} from '../components/validation.js';
import '../pages/index.css';

//Получение DOM-элементов
const placesList = document.querySelector('.places__list');
initialCards.forEach(card => placesList.append(createCard(card, deleteCard, handleImageClick)));

const openPopupButton = document.querySelector('.profile__edit-button');
const addPopupButton = document.querySelector('.profile__add-button');
const cardImage = document.querySelector('.card__image');
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupAddCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const forms = document.forms;
const formProfile = document.forms.editProfile;
const nameInput = document.querySelector('.popup__input_type_name');
const profileTitle = document.querySelector('.profile__title');
const jobInput = document.querySelector('.popup__input_type_description');
const profileDescription = document.querySelector('.profile__description');

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  };
  
  // Вызовем функцию
  enableValidation(validationConfig);

//Обработчики событий для кнопок открытия модальных окон
openPopupButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(popupEditProfile);
    clearValidation(forms.editProfile, validationConfig);
});
addPopupButton.addEventListener('click', () => {
    openModal(popupAddCard);
    clearValidation(forms.newPlace, validationConfig);
});
cardImage.addEventListener('click', () => {
    openModal(popupImage)
});

//Обработчик отправки формы профиля
function handleEditProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(popupEditProfile);
};

//Настройка обработчиков для модальных окон
setupModalListeners(popupEditProfile);
setupModalListeners(popupAddCard);
setupModalListeners(popupImage);

formProfile.addEventListener('submit', handleEditProfileFormSubmit);

//Получение элементов модального окна изображения
const imageInPopup = popupImage.querySelector('.popup__image');
const captionInPopup = popupImage.querySelector('.popup__caption');

//Обработчик клика на карточку для открытия изображения
function handleImageClick (cardData) {
    imageInPopup.src = cardData.link;
    imageInPopup.alt = cardData.name;
    captionInPopup.textContent = cardData.name;
    openModal(popupImage);
  };


//Обработчик формы добавления карточки
const addCardForm = document.forms.newPlace;
addCardForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const placeNameInput = addCardForm.elements.placeName;
    const linkInput = addCardForm.elements.link;
    
    // Создаем данные для новой карточки
    const newCardData = {
        name: placeNameInput.value,
        link: linkInput.value,
        alt: "изображение " + placeNameInput.value,
    };
    
    // Создаем и добавляем карточку в начало списка
    const newCard = createCard(newCardData, deleteCard, handleImageClick);
    placesList.prepend(newCard);
    
    // Закрываем попап и очищаем поля
    closeModal(popupAddCard);
    addCardForm.reset();
    });
    
const config = {
    url: 'https://nomoreparties.co/v1/wff-cohort-36',
    headers: {
        authorization: 'e1196308-7861-40b5-b9f3-00c12798c7fe'
    },
    response: function(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
}

export const userData = () => {
    return fetch(`${config.url}/users/me`, {
        headers: {
            authorization: config.headers.authorization
        }
    })
    .then(res => config.response(res));
}

const cardData = () => {
    return fetch(`${config.url}/cards`, {
        headers: {
            authorization: config.headers.authorization
        }
    })
    .then((res) => {
        return res.json();
      })
}

cardData()