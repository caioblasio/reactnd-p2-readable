import { RECEIVE_COMMENTS, EDIT_COMMENT, ADD_COMMENT } from '../actions/comments';

export default function comments (state = [], action) {
  switch(action.type) {
    case RECEIVE_COMMENTS:
      return action.comments
    case EDIT_COMMENT:
      return state.map(comment => (
        comment.id === action.id
          ? { ...comment, ...action.changes }
          : comment
      ))
    case ADD_COMMENT:
      return [...state, action.comment]
    default :
      return state
  }
} 