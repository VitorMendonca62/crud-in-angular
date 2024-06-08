export const showAlert = () => {
  document.querySelector('[role=alert]')?.classList.toggle('hide');
  document.querySelector('[role=alert]')?.classList.toggle('show');
}
