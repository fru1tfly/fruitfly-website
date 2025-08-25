export const closeModal = (setClosing, closeFunc) => {
    setClosing(true);
    setTimeout(closeFunc, 300);
}