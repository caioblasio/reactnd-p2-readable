
const api = "http://localhost:3001"

let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())

export const getPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())

export const getPostsByCategory = (category) =>
  fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json())

export const getPostById = (post) =>
  fetch(`${api}/posts/${post}`, { headers })
    .then(res => res.json())

export const editPost = (id, changes) =>
  fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(changes),
  })
  .then(res => res.json())

export const deletePost = (id) =>
  fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
    },
  })
  .then(res => res.json())

export const votePost = (post, vote) =>
  fetch(`${api}/posts/${post}`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({option: vote})
    })
    .then(res => res.json())

export const createPost = (post) => 
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify(post)
  })
  .then(res => res.json())

export const getCommentsByPostId = (id) =>
  fetch(`${api}/posts/${id}/comments`, { headers })
    .then(res => res.json())

export const voteComment = (id, option) => 
  fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({ option })
  })
  .then(res => res.json())

export const createComment = (comment) => 
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify(comment)
  })
  .then(res => res.json())



