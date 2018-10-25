
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

export const createPost = (post) => {
  fetch(`${api}/posts/`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify(post)
  })
  .then(res => res.json())
}


