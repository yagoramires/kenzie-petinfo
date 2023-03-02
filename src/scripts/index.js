/* Desenvolva seu código aqui */
import {
  posts,
  addPost,
  postElement,
  deletePost,
  editPost,
  formatDate,
} from './posts.js';

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
const editPostCloseBtn = document.querySelector('.editPost__closeBtn');
const editPostCancelBtn = document.querySelector('.editPost__cancelBtn');
const editPostTitle = document.querySelector('#editPostTitle');
const editPostPost = document.querySelector('#editPostPost');
const viewPostModal = document.querySelector('.viewPost');

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
      const id = post.parentElement.id;

      const postData = postsArray.filter((postArr) => postArr.id === id);

      const closeBtn = document.querySelector('.viewPost__closeBtn');
      closeBtn.addEventListener('click', () => {
        viewPostModal.classList.add('hidden');
      });

      const userDataContainer = document.querySelector(
        '.viewPost__userDataContainer',
      );
      userDataContainer.classList.add('post__userData');

      userDataContainer.innerHTML = '';

      const image = document.createElement('img');
      image.classList.add('post__userImg');
      image.src = postData[0].user.avatar;
      const username = document.createElement('p');
      username.classList.add('post__username');
      username.innerHTML = postData[0].user.username;
      const date = document.createElement('p');
      date.classList.add('post__date');
      date.innerHTML = formatDate(postData[0].createdAt);

      userDataContainer.appendChild(image);
      userDataContainer.appendChild(username);
      userDataContainer.appendChild(date);

      const postTitle = document.querySelector('.viewPost__title');
      postTitle.innerText = postData[0].title;
      const postContent = document.querySelector('.viewPost__content');
      postContent.innerText = postData[0].content;

      viewPostModal.classList.remove('hidden');
    });
  });
};

const hideToast = () => {
  setTimeout(() => {
    const postDeleteToast = document.querySelector('.successDelete');
    postDeleteToast.classList.add('hidden');
  }, 3000);
};
