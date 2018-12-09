import * as ContentAPI from '../utils/contentapi';
import { showLoading, hideLoading } from '../actions/loading';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const EDIT_POST = 'EDIT_POST';
export const ADD_POST = 'ADD_POST';
export const REMOVE_POST = 'REMOVE_POST';

export function fetchPosts() {
  return (dispatch) => {
    dispatch(showLoading())
    return ContentAPI.getPosts()
      .then(posts => dispatch(_receivePosts(posts)))
      .then(() => dispatch(hideLoading()))
  }
}

export function fetchPostsByCategory(category) {
  return (dispatch) => {
    dispatch(showLoading())
    return ContentAPI.getPostsByCategory(category)
      .then(posts => dispatch(_receivePosts(posts)))
      .then(() => dispatch(hideLoading()))
  }
}

export function fetchPostById(id) {
  return (dispatch) => {
    dispatch(showLoading())
    return ContentAPI.getPostById(id)
      .then(post => dispatch(_receivePosts(post)))
      .then(() => dispatch(hideLoading()))
      .catch(() => console.log('deu ruim'))
  }
}

export function addVoteToPost(id, changes, vote) {
  return (dispatch) => {
    return ContentAPI.votePost(id, vote)
      .then(() => {
        dispatch(_editPost(id, changes))
      })
  }
}

export function addPost(post) {
  return (dispatch) => {
    dispatch(showLoading())
    return ContentAPI.createPost(post)
      .then((post) => dispatch(_addPost(post)))
      .then(() => dispatch(hideLoading()))
  }
}

export function editPost(id, changes) {
  return (dispatch) => {
    dispatch(showLoading())
    return ContentAPI.editPost(id, changes)
      .then((post) => dispatch(_editPost(id, changes)))
      .then(() => dispatch(hideLoading()))
  }
}

export function removePost(id) {
  return (dispatch) => {
    dispatch(showLoading())
    return ContentAPI.deletePost(id)
      .then((post) => dispatch(_removePost(post.id)))
      .then(() => dispatch(hideLoading()))
  }
}

function _addPost(post) {
  return {
    type: ADD_POST,
    post
  }
}

function _removePost(id) {
  return {
    type: REMOVE_POST,
    id
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