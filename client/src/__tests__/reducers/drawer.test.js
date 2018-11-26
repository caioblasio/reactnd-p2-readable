import reducer from '../../reducers/drawer';
import * as types from '../../actions/drawer';

describe('Drawer Reducer', () => {

  it('Should return the initial state', () => {
    const expectedState = true;
    expect(reducer(undefined, {})).toEqual(expectedState)
  });

  it('Should handle OPEN_DRAWER', () => {
    
    const action = {
      type: types.OPEN_DRAWER,
    }

    const expectedState = true;

    expect(reducer(false, action)).toEqual(expectedState)
  });

  it('Should handle CLOSE_DRAWER', () => {
    
    const action = {
      type: types.CLOSE_DRAWER,
    }

    const expectedState = false;

    expect(reducer(true, action)).toEqual(expectedState)
  });

})