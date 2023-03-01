const URL = 'http://localhost:3333';

const loginForm = document.querySelector('.login__form');
const loginEmail = document.querySelector('#loginEmail');
const loginPassword = document.querySelector('#loginPassword');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = loginEmail.value;
  const password = loginPassword.value;

  if (email === '') {
    loginEmail.style.border = '2px solid red';
    return;
  } else {
    loginEmail.style.border = 'none';
  }

  if (password === '') {
    loginPassword.style.border = '2px solid red';
    return;
  } else {
    loginPassword.style.border = 'none';
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

  try {
    const loginToken = await fetch(`${URL}/login`, options);
    const res = await loginToken.json();
    localStorage.setItem('token', res.token);
    window.location.href = 'http://localhost:5500/index.html';
  } catch (error) {
    console.log(error);
  }
};
