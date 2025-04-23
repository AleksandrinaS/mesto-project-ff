function showInputError (formElement, inputElement, errorMessage, validationConfig) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorClass);
};

function hideInputError (formElement, inputElement, validationConfig) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = '';
};

function isValid (formElement, inputElement, validationConfig) {
    const errorMessage = inputElement.dataset.errorMessage;
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
    } else {
        hideInputError(formElement, inputElement, validationConfig);
    }
};

function toggleButtonState (formElement, inputList, validationConfig) {
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(validationConfig.inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    }
};

export function clearValidation (formElement, validationConfig) {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    inputList.forEach((input) => {
        input.setCustomValidity('');
        hideInputError(formElement, input, validationConfig);
    })
    toggleButtonState(formElement, inputList, validationConfig);
}
  
function setEventListeners (formElement, validationConfig) {
    // Найдём все поля формы и сделаем из них массив
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    toggleButtonState(formElement, inputList, validationConfig);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, validationConfig);

            // Вызовем toggleButtonState и передадим ей массив полей и кнопку
            toggleButtonState(formElement, inputList, validationConfig);
        });
    });
};

export function enableValidation (validationConfig) {
    // Найдём все формы с указанным классом в DOM,
    // сделаем из них массив методом Array.from
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  
    // Переберём полученную коллекцию
    formList.forEach((formElement) => {
      setEventListeners(formElement, validationConfig);
    });
  };

function hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};