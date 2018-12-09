import { getCategories } from '../utils/contentapi'

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'

export function fetchCategories() {
  return (dispatch) => {
    return getCategories()
      .then(categories => {
        dispatch(receiveCategories(categories))
      })
  }
}

function receiveCategories(categories){
  return {
    type: RECEIVE_CATEGORIES,
    categories,
  }
}