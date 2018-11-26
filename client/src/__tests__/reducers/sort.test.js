import reducer from '../../reducers/sort';
import * as types from '../../actions/sort';

describe('Sort Reducer', () => {

  it('Should return the initial state', () => {
    const expectedState = 'score';
    expect(reducer(undefined, {})).toEqual(expectedState)
  });

  it('Should handle CHANGE_SORT', () => {
    
    const action = {
      type: types.CHANGE_SORT,
      option: 'date'
    }

    const expectedState = 'date';

    expect(reducer('score', action)).toEqual(expectedState)
  });
})