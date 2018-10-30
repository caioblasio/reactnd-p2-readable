import { CHANGE_SORT } from '../actions/sort'

export default function reducer(state = 'score', action) {
  switch (action.type) {
    case CHANGE_SORT:
      return action.option

    default:
      return state
  }
}