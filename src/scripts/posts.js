const URL = 'http://localhost:3333';

export const posts = async () => {
  try {
    const token = localStorage.getItem('token');
    const options = {
      method: 'GET',
      headers: { authorization: `Bearer ${token}` },
    };

    const posts = await fetch(`${URL}/posts`, options);
    const res = await posts.json();
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const addPost = async (title, content) => {
  try {
    const token = localStorage.getItem('token');
    const options = {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    };

    const postData = await fetch(`${URL}/posts/create`, options);

    const res = await postData.json();
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const editPost = async (title, content) => {
  try {
    const token = localStorage.getItem('token');
    const options = {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    };

    const postData = await fetch(`${URL}/posts/create`, options);

    const res = await postData.json();
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const postElement = (postData) => {
  const postContainer = document.createElement('div');
  postContainer.classList.add('post');

  const userContainer = document.createElement('div');
  userContainer.classList.add('post__userContainer');

  const userData = document.createElement('div');
  userData.classList.add('post__userData');

  const image = document.createElement('img');
  image.classList.add('post__userImg');
  image.src = postData.user.avatar;
  const username = document.createElement('p');
  username.classList.add('post__username');
  username.innerHTML = postData.user.username;
  const date = document.createElement('p');
  date.classList.add('post__date');
  date.innerHTML = formatDate(postData.createdAt);

  userData.appendChild(image);
  userData.appendChild(username);
  userData.appendChild(date);
  userContainer.appendChild(userData);

  const postTitle = document.createElement('h3');
  postTitle.classList.add('post__title');
  postTitle.innerHTML = postData.title;

  const postDescription = document.createElement('h3');
  postDescription.classList.add('post__description');
  postDescription.innerHTML = postData.content;

  postContainer.appendChild(userContainer);
  postContainer.appendChild(postTitle);
  postContainer.appendChild(postDescription);

  return postContainer;
};

const formatDate = (date) => {
  const dateFormat = new Date(date);

  return dateFormat.toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric',
  });
};
