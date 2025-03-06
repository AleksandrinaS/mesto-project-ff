function createCard(cardData, deleteCard) {
    const template = document.querySelector('#card-template');
    const cardElement = template.content.cloneNode(true);
    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    cardTitle.textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    deleteButton.addEventListener('click', () => {
        const item = deleteButton.closest('.card');
        item.remove();
    });
    
    return cardElement;
}

const placesList = document.querySelector('.places__list');
initialCards.forEach(card => placesList.append(createCard(card)));