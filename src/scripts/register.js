const URL = 'http://localhost:3333';

const registerForm = document.querySelector('.register__form');
const registerUsername = document.querySelector('#registerUsername');
const registerEmail = document.querySelector('#registerEmail');
const registerAvatar = document.querySelector('#registerImgUrl');
const registerPassword = document.querySelector('#registerPassword');
const registerSuccess = document.querySelector('.successRegister');

registerForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = registerUsername.value;
  const email = registerEmail.value;
  const password = registerPassword.value;
  const avatar = registerAvatar.value;

  if (username === '') {
    registerUsername.style.border = '2px solid red';
    return;
  } else {
    registerUsername.style.border = 'none';
  }

  if (email === '') {
    registerEmail.style.border = '2px solid red';
    return;
  } else {
    registerEmail.style.border = 'none';
  }

  if (avatar === '') {
    registerAvatar.style.border = '2px solid red';
    return;
  } else {
    registerAvatar.style.border = 'none';
  }

  if (password === '') {
    registerPassword.style.border = '2px solid red';
    return;
  } else {
    registerPassword.style.border = 'none';
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

  console.log(JSON.stringify({ username, email, password, avatar }));

  try {
    const res = await fetch(`${URL}/users/create`, options);
    registerSuccess.classList.remove('hidden');
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
