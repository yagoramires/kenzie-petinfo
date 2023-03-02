const URL = 'http://localhost:3333';

const registerForm = document.querySelector('.register__form');
const registerUsername = document.querySelector('#registerUsername');
const registerSuccess = document.querySelector('.successRegister');
const usernameError = document.querySelector('#usernameError');
const emailError = document.querySelector('#emailError');
const avatarError = document.querySelector('#avatarError');
const registerError = document.querySelector('#registerError');
const registerEmail = document.querySelector('#registerEmail');
const registerAvatar = document.querySelector('#registerImgUrl');
const registerPassword = document.querySelector('#registerPassword');

registerForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = registerUsername.value;
  const email = registerEmail.value;
  const avatar = registerAvatar.value;
  const password = registerPassword.value;

  registerError.innerHTML = '';

  if (username === '') {
    registerUsername.style.border = '1px solid red';
    usernameError.innerHTML = 'Preencha um nome de usuário';
    return;
  } else {
    registerUsername.style.border = 'none';
    usernameError.innerHTML = '';
  }

  if (email === '') {
    registerEmail.style.border = '1px solid red';
    emailError.innerHTML = 'Preencha o e-mail';

    return;
  } else {
    registerEmail.style.border = 'none';
    emailError.innerHTML = '';
  }

  if (avatar === '') {
    registerAvatar.style.border = '1px solid red';
    avatarError.innerHTML = 'Preencha o URL da imagem';

    return;
  } else {
    registerAvatar.style.border = 'none';
    avatarError.innerHTML = '';
  }

  if (password === '') {
    registerPassword.style.border = '1px solid red';
    passwordError.innerHTML = 'Preencha a senha';

    return;
  } else {
    registerPassword.style.border = 'none';
    passwordError.innerHTML = '';
  }

  register(username, email, password, avatar);
});

const register = async (username, email, password, avatar) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password, avatar }),
  };

  const res = await fetch(`${URL}/users/create`, options);

  if (res.status === 200) {
    registerSuccess.classList.remove('hidden');
  } else {
    const resData = await res.json();
    registerError.innerHTML = resData.message;
  }
  return;
};
