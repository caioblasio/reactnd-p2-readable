import reducer from '../../reducers/loading';
import * as types from '../../actions/loading';

describe('Loading Reducer', () => {

  it('Should return the initial state', () => {
    const expectedState = false;
    expect(reducer(undefined, {})).toEqual(expectedState)
  });

  it('Should handle SHOW_LOADING', () => {
    
    const action = {
      type: types.SHOW_LOADING,
    }

    const expectedState = true;

    expect(reducer(false, action)).toEqual(expectedState)
  });

  it('Should handle HIDE_LOADING', () => {
    
    const action = {
      type: types.HIDE_LOADING,
    }

    const expectedState = false;

    expect(reducer(false, action)).toEqual(expectedState)
  });

})