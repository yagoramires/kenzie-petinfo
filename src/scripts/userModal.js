const userModalContainer = document.querySelector('.userModalContainer');

export const handleModal = (user) => {
  let userModal = document.querySelector('.userModal');

  if (userModal) {
    return;
  } else {
    userModal = document.createElement('div');
    userModal.classList.add('userModal');
    userModal.classList.add('hidden');
    userModal.id = 'userModal';

    const username = document.createElement('p');
    username.innerHTML = `@${user.username.replace(' ', '').toLowerCase()}`;
    const logoutBtn = document.createElement('button');
    const signOutIcon = document.createElement('img');
    signOutIcon.src = './src/assets/signoutlt.svg';
    logoutBtn.append(signOutIcon);
    logoutBtn.append('Sair da conta');

    userModal.append(username, logoutBtn);

    logoutBtn.addEventListener('click', logout);

    userModalContainer.appendChild(userModal);
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  window.location.reload();
};

const root = document.getElementById('root');

root.addEventListener('click', (e) => {
  const userModal = document.querySelector('.userModal');
  userModal.classList.toggle('hidden');
});
