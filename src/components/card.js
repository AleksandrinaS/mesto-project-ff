import { handleImageClick } from "../scripts";
function createCard(cardData, deleteCard) {
    const template = document.querySelector('#card-template');
    const cardElement = template.content.cloneNode(true);
    const item = cardElement.querySelector('.card');
    cardElement.querySelector('.card__like-button').addEventListener('click', cardLike);
    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    cardTitle.textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    deleteButton.addEventListener('click', function() {
        deleteCard(item);
    });
    cardImage.addEventListener('click', () => handleImageClick(cardData));

    return cardElement;
};

function deleteCard(item) {
    item.remove();
};
    
function cardLike (evt) {
    if (!evt.target.classList.contains('card__like-button_is-active')) {
        evt.target.classList.add('card__like-button_is-active');
    } else {
        evt.target.classList.remove('card__like-button_is-active');
    } 
};

export { createCard, deleteCard}