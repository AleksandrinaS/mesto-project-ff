function createCard(cardData, deleteCard) {
    const template = document.querySelector('#card-template');
    const cardElement = template.content.cloneNode(true);
    const item = cardElement.querySelector('.card')
    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    cardTitle.textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    deleteButton.addEventListener('click', function() {
        deleteCard(item);
    });

    return cardElement;
}

function deleteCard(item) {
    item.remove();
}

const placesList = document.querySelector('.places__list');
initialCards.forEach(card => placesList.append(createCard(card, deleteCard)));