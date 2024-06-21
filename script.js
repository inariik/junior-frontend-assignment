const form = document.querySelector('#form');
const firstNameInput = document.querySelector('#firstName');
const lastNameInput = document.querySelector('#lastName');
const emailInput = document.querySelector('#email');
const phoneInput = document.querySelector('#phone');
const messageInput = document.querySelector('#message');
const responseDiv = document.querySelector('#response');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  let isValid = true;

  if (!firstNameInput.value.trim()) {
    firstNameInput.nextElementSibling.textContent = 'Пожалуйста, введите имя';
    firstNameInput.nextElementSibling.style.display = 'block';
    isValid = false;
  } else {
    firstNameInput.nextElementSibling.style.display = 'none';
  }

  if (!lastNameInput.value.trim()) {
    lastNameInput.nextElementSibling.textContent = 'Пожалуйста, введите фамилию';
    lastNameInput.nextElementSibling.style.display = 'block';
    isValid = false;
  } else {
    lastNameInput.nextElementSibling.style.display = 'none';
  }

  if (!emailInput.value.trim() || !validateEmail(emailInput.value)) {
    emailInput.nextElementSibling.textContent = 'Пожалуйста, введите корректный email';
    emailInput.nextElementSibling.style.display = 'block';
    isValid = false;
  } else {
    emailInput.nextElementSibling.style.display = 'none';
  }

  if (!phoneInput.value.trim() || !validatePhone(phoneInput.value)) {
    phoneInput.nextElementSibling.textContent = 'Пожалуйста, введите корректный номер телефона';
    phoneInput.nextElementSibling.style.display = 'block';
    isValid = false;
  } else {
    phoneInput.nextElementSibling.style.display = 'none';
  }

  if (!messageInput.value.trim()) {
    messageInput.nextElementSibling.textContent = 'Пожалуйста, введите сообщение';
    messageInput.nextElementSibling.style.display = 'block';
    isValid = false;
  } else {
    messageInput.nextElementSibling.style.display = 'none';
  }

  if (isValid) {
    const formData = {
      firstName: firstNameInput.value,
      lastName: lastNameInput.value,
      email: emailInput.value,
      phone: phoneInput.value,
      message: messageInput.value
    };

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Ошибка отправки формы');
      }
    })
    .then(data => {
      responseDiv.textContent = Сообщение успешно отправлено! ID: ${data.id};
      responseDiv.style.display = 'block';
      form.reset();
    })
    .catch(error => {
      responseDiv.textContent = 'Произошла ошибка. Попробуйте позже.';
      responseDiv.style.display = 'block';
    });
  }
});

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
  const re = /^\+?\d{10,15}$/;
  return re.test(phone);
}
