import { combineReducers } from 'redux'
import categories from './categories';
import posts from './posts';
import comments from './comments';
import drawer from './drawer';
import loading from './loading';

 export default combineReducers({
  categories,
  posts,
  comments,
  drawer,
  loading,
}) 