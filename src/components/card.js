//Создает карточку
function createCard(cardData, deleteCard, handleImageClick) {
    const template = document.querySelector('#card-template');
    const cardElement = template.content.cloneNode(true);
    const item = cardElement.querySelector('.card');

    // Настройка лайка
    cardElement.querySelector('.card__like-button').addEventListener('click', cardLike);

    // Получение элементов карточки
    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');
    const deleteButton = cardElement.querySelector('.card__delete-button');

    // Заполнение данных
    cardTitle.textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;

    // Настройка удаления
    deleteButton.addEventListener('click', function() {
        deleteCard(item);
    });

    // Настройка просмотра изображения
    cardImage.addEventListener('click', () => handleImageClick(cardData));

    return cardElement;
};

//Удаляет карточку
function deleteCard(item) {
    item.remove();
};
    
//Обработчик лайка карточки
function cardLike (evt) {
    if (!evt.target.classList.contains('card__like-button_is-active')) {
        evt.target.classList.add('card__like-button_is-active');
    } else {
        evt.target.classList.remove('card__like-button_is-active');
    } 
};

export { createCard, deleteCard}