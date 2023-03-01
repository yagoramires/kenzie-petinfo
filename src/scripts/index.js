/* Desenvolva seu código aqui */
import { posts, addPost, postElement } from './posts.js';

const URL = 'http://localhost:3333';

const postsContainer = document.querySelector('.postsContainer');

const loadData = async () => {
  try {
    const token = localStorage.getItem('token');
    const options = {
      method: 'GET',
      headers: { authorization: `Bearer ${token}` },
    };

    const userData = await fetch(`${URL}/users/profile`, options);

    if (userData.status !== 200) {
      window.location.href = 'http://localhost:5500/src/pages/login.html';
    }
    const res = await userData.json();

    headerImg(res.avatar);
    loadPosts();
  } catch (error) {
    console.log(error);
  }
};

loadData();

const loadPosts = async () => {
  const postsArr = await posts();

  postsArr
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .map((post) => {
      postsContainer.appendChild(postElement(post));
    });
};

const headerImg = (avatar) => {
  const headerImg = document.querySelector('.header__userImg');
  headerImg.src = avatar;
};

const newPostBtn = document.querySelector('.header__newPub');
const newPostModal = document.querySelector('.newPost');
const newPostForm = document.querySelector('.newPost__form');
const newPostCloseBtn = document.querySelector('.newPost__closeBtn');
const newPostCancelBtn = document.querySelector('.newPost__cancelBtn');
const newPostTitle = document.querySelector('#newPostTitle');
const newPostPost = document.querySelector('#newPostPost');

newPostBtn.addEventListener('click', () => {
  newPostModal.classList.remove('hidden');
});

newPostCloseBtn.addEventListener('click', (e) => {
  e.preventDefault();
  newPostModal.classList.add('hidden');
  newPostTitle.value = '';
  newPostPost.value = '';
});

newPostCancelBtn.addEventListener('click', (e) => {
  e.preventDefault();
  newPostTitle.value = '';
  newPostPost.value = '';
});

newPostForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addPost(newPostTitle.value, newPostPost.value);
  newPostModal.classList.add('hidden');
  userProfile();
});
