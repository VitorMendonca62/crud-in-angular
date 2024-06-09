export const showAlert = (from: 'edit' | 'signup') => {
  document.querySelector(`[role=alert-${from}]`)?.classList.toggle('hide');
  document.querySelector(`[role=alert-${from}]`)?.classList.toggle('show');
};
