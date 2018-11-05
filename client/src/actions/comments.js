import * as ContentAPI from '../utils/contentAPI';
import { showLoading, hideLoading } from '../actions/loading';

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const ADD_COMMENT = 'ADD_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';

export function fetchComments(postId) {
  return (dispatch) => {
    return ContentAPI.getCommentsByPostId(postId)
      .then(comments => dispatch(_receiveComments(comments)))
  }
}

export function addVoteToComment(id, changes, vote) {
  return (dispatch) => {
    return ContentAPI.voteComment(id, vote)
      .then(() => {
        dispatch(_editComment(id, changes))
      })
  }
}

export function addComment(comment) {
  return (dispatch) => {
    return ContentAPI.createComment(comment)
      .then((comment) => dispatch(_addComment(comment)))
  }
}

export function removeComment(id) {
  return (dispatch) => {
    return ContentAPI.deleteComment(id)
      .then((comment) => dispatch(_removeComment(comment.id)))
  }
}

export function editComment(id, changes) {
  return (dispatch) => {
    return ContentAPI.editComment(id, changes)
      .then(() => dispatch(_editComment(id, changes)))
  }
}

function _addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment
  }
}

function _removeComment(id) {
  return {
    type: REMOVE_COMMENT,
    id
  }
}

function _editComment(id, changes){
  return {
    type: EDIT_COMMENT,
    id,
    changes,
  }
}

function _receiveComments(comments) {
  return {
    type: RECEIVE_COMMENTS,
    comments,
  }
}