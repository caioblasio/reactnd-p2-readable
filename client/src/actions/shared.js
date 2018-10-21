import { getPosts, getCategories } from '../utils/ContentAPI'
import { receivePosts } from '../actions/posts'
import { receiveCategories } from '../actions/categories'
import { showLoading, hideLoading } from '../actions/loading'

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading())
    return Promise.all([
      getCategories(),
      getPosts(),
    ]).then(([categories, posts]) => {
      dispatch(receiveCategories(categories))
      dispatch(receivePosts(posts))
      dispatch(hideLoading())
    })
  }
}