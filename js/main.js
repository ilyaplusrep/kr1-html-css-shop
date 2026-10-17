const orderDialog = document.getElementById('order-dialog');
const orderButtons = document.querySelectorAll('.product-card__button');
const closeDialogButton = document.getElementById('close-order-dialog');
const selectedProductInput = document.getElementById('selected-product');
const orderForm = document.getElementById('order-form');
const successMessage = document.getElementById('success-message');

// модальное окно — только если оно есть на странице (главная)
if (orderDialog) {
  orderButtons.forEach((button) => {
    button.addEventListener('click', () => {
      selectedProductInput.value = button.dataset.product;
      orderDialog.showModal();
    });
  });

  closeDialogButton.addEventListener('click', () => {
    orderDialog.close();
  });
}

// форма — только если она есть на странице (главная и order.html)
if (orderForm) {
  orderForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const fields = Array.from(orderForm.elements);
    fields.forEach((field) => field.removeAttribute('aria-invalid'));

    if (!orderForm.checkValidity()) {
      fields.forEach((field) => {
        if (field.willValidate && !field.checkValidity()) {
          field.setAttribute('aria-invalid', 'true');
        }
      });
      orderForm.reportValidity();
      return;
    }

    successMessage.hidden = false;
    orderForm.reset();
    orderDialog?.close();

    setTimeout(() => {
      successMessage.hidden = true;
    }, 4000);
  });
}
