import { getPosts, getPostsByCategory, getPostById } from '../utils/ContentAPI';
import { showLoading, hideLoading } from '../actions/loading';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';

export function fetchPosts() {
  return (dispatch) => {
    dispatch(showLoading())
    return getPosts()
      .then(posts => {
        dispatch(receivePosts(posts))
        dispatch(hideLoading())
      })
  }
}

export function fetchPostsByCategory(category) {
  return (dispatch) => {
    dispatch(showLoading())
    return getPostsByCategory(category)
      .then(posts => {
        dispatch(receivePosts(posts))
        dispatch(hideLoading())
      })
  }
}

export function fetchPostById(id) {
  return (dispatch) => {
    dispatch(showLoading())
    return getPostById(id)
      .then(post => {
        dispatch(receivePosts(post))
        dispatch(hideLoading())
      })
  }
}


function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    posts,
  }
}