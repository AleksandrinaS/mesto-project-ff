import { initialCards } from "../components/cards";
import { createCard, deleteCard} from "../components/card";
import { openModal, closeModal, setupModalListeners } from "../components/modals";
import '../pages/index.css';

const placesList = document.querySelector('.places__list');
initialCards.forEach(card => placesList.append(createCard(card, deleteCard)));

const openPopupButton = document.querySelector('.profile__edit-button');
const addPopupButton = document.querySelector('.profile__add-button');
const cardImage = document.querySelector('.card__image');
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupAddCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");

openPopupButton.addEventListener('click', () => {
    openModal(popupEditProfile)
});
addPopupButton.addEventListener('click', () => {
    openModal(popupAddCard)
});
cardImage.addEventListener('click', () => {
    openModal(popupImage)
});

const formElement = document.forms.editProfile;
const nameInput = document.querySelector('.popup__input_type_name');
const profileTitle = document.querySelector('.profile__title');
const jobInput = document.querySelector('.popup__input_type_description');
const profileDescription = document.querySelector('.profile__description');

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(popupEditProfile);
};

setupModalListeners(popupEditProfile);
setupModalListeners(popupAddCard);
setupModalListeners(popupImage);

formElement.addEventListener('submit', handleFormSubmit);

const imageInPopup = popupImage.querySelector('.popup__image');
const captionInPopup = popupImage.querySelector('.popup__caption');

export function handleImageClick (cardData) {
   imageInPopup.src = cardData.link;
   imageInPopup.alt = cardData.name;
   captionInPopup.textContent = cardData.name;
   openModal(popupImage);
 };

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