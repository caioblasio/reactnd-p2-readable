import { combineReducers } from 'redux'
import categories from './categories';
import posts from './posts';
import comments from './comments';
import drawer from './drawer';
import sort from './sort';
import loading from './loading';
import search from './search';

 export default combineReducers({
  categories,
  posts,
  comments,
  drawer,
  sort,
  loading,
  search
}) 