export const CHANGE_SEARCH = 'CHANGE_SEARCH';

export function changeSearch(search){
  return {
    type: CHANGE_SEARCH,
    search
  }
}