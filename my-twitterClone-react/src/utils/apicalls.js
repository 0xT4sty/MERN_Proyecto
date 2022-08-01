import API from './api';

export {
  getAllPosts,
  getMyPosts,
  postNewPost,
  putExistingPost,
  deletePost
};

function getAllPosts() {
  return API.get('/posts').then(res => res.data);
}

function getMyPosts(email) {
  return API.get('/posts/all/'+email).then(res => res.data);
}

function postNewPost(email, user, image, message) {
  return API.post('/posts', {
    email,
    user,
    image,
    message}).then(result => result.data);
}

function putExistingPost(idpost, message) {
  return API.put('/posts/'+idpost, {
    message}).then(result => result.data);
}

function deletePost(idpost) {
  return API.delete('/posts/'+idpost).then(result => result.data);
}