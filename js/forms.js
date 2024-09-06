// Получаем все кнопки на сайте, кроме кнопки в форме
const buttons = document.querySelectorAll('button:not(#sendButton)');

// Получаем ссылку на форму
const contactForm = document.getElementById('contactForm');

buttons.forEach(button => {
  button.addEventListener('click', function(event) {
    event.preventDefault();

    // Прокручиваем страницу к форме
    contactForm.scrollIntoView({ behavior: 'smooth' });
  });
});

// Обработчик для кнопки отправки формы
const sendButton = document.getElementById('sendButton');
const nameInput = document.querySelector('.name');
const phoneInput = document.querySelector('.tel');
const emailInput = document.querySelector('.email');
const botToken = '7339134638:AAFU9nIKwWM0A-pzeWVlWdCjS01s__wRY3M';
const chatId = '5762026796';

sendButton.addEventListener('click', function(event) {
  event.preventDefault();
  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const email = emailInput.value.trim();

  if (!name || !phone || !email) {
    alert('Пожалуйста, заполните все поля.');
    return;
  }

  const message = `
    Новая заявка:
    Имя: ${name}
    Телефон: ${phone}
    Почта: ${email}
  `;

  fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.ok) {
      nameInput.value = '';
      phoneInput.value = '';
      emailInput.value = '';
    } else {
      alert('Ошибка при отправке сообщения.');
    }
  })
  .catch(error => {
    console.error('Ошибка:', error);
    alert('Произошла ошибка при отправке.');
  });
});
