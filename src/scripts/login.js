const URL = 'http://localhost:3333';

const loginForm = document.querySelector('.login__form');
const loginEmail = document.querySelector('#loginEmail');
const loginPassword = document.querySelector('#loginPassword');
const emailError = document.querySelector('#emailLoginError');
const passwordError = document.querySelector('#passwordLoginError');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = loginEmail.value;
  const password = loginPassword.value;

  if (email === '') {
    loginEmail.style.border = '1px solid red';
    emailError.innerHTML = 'Digite o e-mail';

    return;
  } else {
    emailError.innerHTML = '';
    loginEmail.style.border = 'none';
  }

  if (password === '') {
    loginPassword.style.border = '1px solid red';
    passwordError.innerHTML = 'Digite a senha';
    return;
  } else {
    loginPassword.style.border = 'none';
    passwordError.innerHTML = '';
  }

  login(email, password);
});

const login = async (email, password) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  };

  const res = await fetch(`${URL}/login`, options);
  const resData = await res.json();

  localStorage.setItem('token', resData.token);

  if (resData.token) {
    window.location.href = 'http://localhost:5500/index.html';
    return;
  }

  if (resData.message.includes('email')) {
    emailError.innerHTML = 'O e-mail está incorreto';
    return;
  } else if (resData.message.includes('senha')) {
    passwordError.innerHTML = 'A senha está incorreta';
    return;
  }
};
