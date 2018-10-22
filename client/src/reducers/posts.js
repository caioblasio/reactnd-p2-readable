import { RECEIVE_POSTS } from '../actions/posts';

export default function posts (state = {}, action) {
  switch(action.type) {
    case RECEIVE_POSTS :
      return {
        ...state,
        ...action.posts.reduce((acc, post) => ({ ...acc, [post.id]: post}), {})
      }
    default :
      return state
  }
} 