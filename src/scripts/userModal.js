export const logout = () => {
  localStorage.removeItem('token');
};

const image = document.querySelector('.header__userImg');
