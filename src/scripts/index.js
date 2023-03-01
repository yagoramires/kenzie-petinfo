/* Desenvolva seu código aqui */
import { posts, addPost, postElement, deletePost, editPost } from './posts.js';

const URL = 'http://localhost:3333';

const postsContainer = document.querySelector('.postsContainer');

let postsArray = [];

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
    loadPosts(res);
  } catch (error) {
    console.log(error);
  }
};

loadData();

const loadPosts = async (user) => {
  const postsArr = await posts();

  postsArray = postsArr;

  postsContainer.innerHTML = '';

  postsArr
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .map((post) => {
      postsContainer.appendChild(postElement(post, user));
    });

  postEditButtons();
};

const headerImg = (avatar) => {
  const headerImg = document.querySelector('.header__userImg');
  headerImg.src = avatar;
};
//🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
//New Post

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
  console.log(e);
  addPost(newPostTitle.value, newPostPost.value);
  newPostTitle.value = '';
  newPostPost.value = '';
  newPostModal.classList.add('hidden');
  loadData();
});

//🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
//Edit Post

const editPostModal = document.querySelector('.editPost');
const editPostForm = document.querySelector('.editPost__form');
const editPostCloseBtn = document.querySelector('.editPost__closeBtn');
const editPostCancelBtn = document.querySelector('.editPost__cancelBtn');
const editPostTitle = document.querySelector('#editPostTitle');
const editPostPost = document.querySelector('#editPostPost');

editPostCloseBtn.addEventListener('click', (e) => {
  e.preventDefault();
  editPostModal.classList.add('hidden');
  editPostTitle.value = '';
  editPostPost.value = '';
});

editPostCancelBtn.addEventListener('click', (e) => {
  e.preventDefault();
  editPostTitle.value = '';
  editPostPost.value = '';
});

const postEditButtons = () => {
  const postEditBtn = document.querySelectorAll('.post__edit');
  const postDeleteBtn = document.querySelectorAll('.post__delete');
  const postView = document.querySelectorAll('.post__viewBtn');

  postEditBtn.forEach((post) => {
    post.addEventListener('click', () => {
      editPostModal.classList.remove('hidden');
      const titleInput = editPostModal.children[0].children[1].children[1];
      const contentInput = editPostModal.children[0].children[1].children[3];
      const id = post.parentElement.parentElement.parentElement.id;

      const postEdit = postsArray.filter((postArr) => postArr.id === id);

      titleInput.value = postEdit[0].title;
      contentInput.value = postEdit[0].content;

      const editForm = document.querySelector('.editPost__form');
      editForm.addEventListener('submit', () => {
        editPost(titleInput.value, contentInput.value, id);
      });
    });
  });

  postDeleteBtn.forEach((post) => {
    post.addEventListener('click', () => {
      const id = post.parentElement.parentElement.parentElement.id;

      deletePost(id);

      const postDeleteToast = document.querySelector('.successDelete');
      postDeleteToast.classList.remove('hidden');
      loadData();
      hideToast();
    });
  });

  postView.forEach((post) => {
    post.addEventListener('click', () => {
      console.log(post.parentElement.id);
    });
  });
};

const hideToast = () => {
  setTimeout(() => {
    const postDeleteToast = document.querySelector('.successDelete');
    postDeleteToast.classList.add('hidden');
  }, 3000);
};
