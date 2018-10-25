import { getPosts, getPostsByCategory, getPostById, votePost, createPost } from '../utils/contentAPI';
import { showLoading, hideLoading } from '../actions/loading';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const EDIT_POST = 'EDIT_POST';
export const ADD_POST = 'ADD_POST';

export function fetchPosts() {
  return (dispatch) => {
    dispatch(showLoading())
    return getPosts()
      .then(posts => {
        dispatch(_receivePosts(posts))
        dispatch(hideLoading())
      })
  }
}

export function fetchPostsByCategory(category) {
  return (dispatch) => {
    dispatch(showLoading())
    return getPostsByCategory(category)
      .then(posts => {
        dispatch(_receivePosts(posts))
        dispatch(hideLoading())
      })
  }
}

export function fetchPostById(id) {
  return (dispatch) => {
    dispatch(showLoading())
    return getPostById(id)
      .then(post => {
        dispatch(_receivePosts(post))
        dispatch(hideLoading())
      })
  }
}

export function addVoteToPost(id, changes, vote) {
  return (dispatch) => {
    return votePost(id, vote)
      .then(() => {
        dispatch(_editPost(id, changes))
      })
  }
}

export function addPost(post) {
  return (dispatch) => {
    return createPost(post)
      .then((post) => {
        dispatch(_addPost(post))
      })
  }
}

function _addPost(post) {
  return {
    type: ADD_POST,
    post
  }
}

function _editPost(id, changes){
  return {
    type: EDIT_POST,
    id,
    changes,
  }
}

function _receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    posts,
  }
}