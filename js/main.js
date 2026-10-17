// 1. Находим нужные элементы на странице
const orderDialog = document.getElementById('order-dialog');
const orderButtons = document.querySelectorAll('.product-card__button');
const closeDialogButton = document.getElementById('close-order-dialog');
const selectedProductInput = document.getElementById('selected-product');
const orderForm = document.getElementById('order-form');
const successMessage = document.getElementById('success-message');

// 2. Открытие окна по кнопке «Заказать»
orderButtons.forEach((button) => {
  button.addEventListener('click', () => {
    selectedProductInput.value = button.dataset.product;
    orderDialog.showModal();
  });
});

// 3. Закрытие окна по кнопке «Закрыть»
closeDialogButton.addEventListener('click', () => {
  orderDialog.close();
});

// 4. Отправка формы
orderForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const fields = Array.from(orderForm.elements);

  // убираем старые отметки об ошибках
  fields.forEach((field) => field.removeAttribute('aria-invalid'));

  // если форма не прошла проверку — помечаем плохие поля и выходим
  if (!orderForm.checkValidity()) {
    fields.forEach((field) => {
      if (field.willValidate && !field.checkValidity()) {
        field.setAttribute('aria-invalid', 'true');
      }
    });
    orderForm.reportValidity();
    return;
  }

  // всё ок: показываем сообщение, чистим форму, закрываем окно
  successMessage.hidden = false;
  orderForm.reset();
  orderDialog.close();

  // через 4 секунды прячем сообщение
  setTimeout(() => {
    successMessage.hidden = true;
  }, 4000);
});
