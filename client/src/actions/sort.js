export const CHANGE_SORT = 'CHANGE_SORT'

export function changeSort(option) {
  return {
    type: CHANGE_SORT,
    option
  }
}