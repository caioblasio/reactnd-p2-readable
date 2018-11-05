import { RECEIVE_POSTS, EDIT_POST, ADD_POST, REMOVE_POST } from '../actions/posts';

export default function posts (state = {}, action) {
  switch(action.type) {
    case RECEIVE_POSTS :
      let newPosts = action.posts.hasOwnProperty('error') ? {} : {...action.posts}
      return {
        ...state,
        //...action.posts.reduce((acc, post) => ({ ...acc, [post.id]: post}), {})
        ...newPosts
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
    case REMOVE_POST:
      let  {[action.id]: deleted, ...newState} = state;
      return newState
      
    default :
      return state
  }
} 