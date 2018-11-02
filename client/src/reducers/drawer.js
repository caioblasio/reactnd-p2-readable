import { TOGGLE_DRAWER } from '../actions/drawer';

export default function posts (state = true, action) {
  switch(action.type) {
    case TOGGLE_DRAWER :
      return !state
    default :
      return state
  }
} 