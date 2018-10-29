import { getCommentsByPostId, voteComment, createComment } from '../utils/contentAPI';
import { showLoading, hideLoading } from '../actions/loading';

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const ADD_COMMENT = 'ADD_COMMENT';

export function fetchComments(postId) {
  return (dispatch) => {
    return getCommentsByPostId(postId)
      .then(comments => dispatch(_receiveComments(comments)))
  }
}

export function addVoteToComment(id, changes, vote) {
  return (dispatch) => {
    return voteComment(id, vote)
      .then(() => {
        dispatch(_editComment(id, changes))
      })
  }
}

export function addComment(comment) {
  return (dispatch) => {
    return createComment(comment)
      .then((comment) => dispatch(_addComment(comment)))
  }
}

function _addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment
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