function handleEscKeyUp (e) {
    if (e.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    if (popup) {
    closeModal(popup);
    }
    }
   };
function openModal (modal) {
    modal.classList.add("popup_is-opened");
    document.addEventListener("keyup", handleEscKeyUp);
    modal.addEventListener("click", (event) => {
    if (event.target.classList.contains("popup")) {
    closeModal(modal);
    }
    });
   };
   
 function closeModal (modal) {
    modal.classList.remove("popup_is-opened");
    document.removeEventListener("keyup", handleEscKeyUp);
    modal.removeEventListener("click", () => {});
   };
function setupModalListeners (modalElement) {
    const closeButton = modalElement.querySelector(".popup__close");

    closeButton.addEventListener("click", () => {
    closeModal(modalElement);
 });
 
 document.addEventListener("keyup", handleEscKeyUp);
};


export { openModal, closeModal, setupModalListeners }