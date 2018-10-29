import { RECEIVE_POSTS, EDIT_POST, ADD_POST } from '../actions/posts';

export default function posts (state = {}, action) {
  switch(action.type) {
    case RECEIVE_POSTS :
      return {
        ...state,
        //...action.posts.reduce((acc, post) => ({ ...acc, [post.id]: post}), {})
        ...action.posts
      }
    case EDIT_POST:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          ...action.changes
        }
      }
    case ADD_POST:
      return {
        ...state,
        [action.post.id]: {
          ...action.post
        }
      }
    default :
      return state
  }
} 