import { TOGGLE_DRAWER } from '../actions/drawer';

export default function posts (state = false, action) {
  switch(action.type) {
    case TOGGLE_DRAWER :
      return !state
    default :
      return state
  }
} 