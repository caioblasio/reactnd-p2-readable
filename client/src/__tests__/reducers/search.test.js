import reducer from '../../reducers/search';
import * as types from '../../actions/search';

describe('Loading Reducer', () => {

  it('Should return the initial state', () => {
    const expectedState =  '';
    expect(reducer(undefined, {})).toEqual(expectedState)
  });

  it('Should handle CHANGE_SEARCH', () => {
    
    const action = {
      type: types.CHANGE_SEARCH,
      search: 'search query'
    }

    const expectedState = 'search query';

    expect(reducer('previous query', action)).toEqual(expectedState)
  });

})