// Обработчик нажатия клавиши Esc
function handleEscKeyUp(e) {
  if (e.key === "Escape") {
      const popup = document.querySelector(".popup_is-opened");
      if (popup) {
          closeModal(popup);
      }
  }
}

// Обработчик клика по оверлею
function closeByOverlay(event) {
  if (event.target.classList.contains("popup")) {
      closeModal(event.currentTarget);
  }
}

// Открывает модальное окно
function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keyup", handleEscKeyUp);
  modal.addEventListener("click", closeByOverlay);
}

// Закрывает модальное окно
function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keyup", handleEscKeyUp);
  modal.removeEventListener("click", closeByOverlay);
}

// Настраивает обработчики событий для модального окна
function setupModalListeners(modalElement) {
  const closeButton = modalElement.querySelector(".popup__close");

  closeButton.addEventListener("click", () => {
      closeModal(modalElement);
  });
}

export { openModal, closeModal, setupModalListeners };