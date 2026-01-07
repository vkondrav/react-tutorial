// @ts-nocheck
// Good for: notifications, success messages
// Not ideal for: detailed form errors

const showToast = (message, type) => {
  setToast({ show: true, message, type });
  setTimeout(() => setToast({ show: false }), 3000);
};
