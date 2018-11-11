import { OPEN_DRAWER, CLOSE_DRAWER } from '../actions/drawer';
import { isMobile } from 'react-device-detect';

export default function posts (state = !isMobile, action) {
  switch(action.type) {
    case OPEN_DRAWER:
      return true
    case CLOSE_DRAWER:
      return false
    default :
      return state
  }
} 