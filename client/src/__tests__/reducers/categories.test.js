import reducer from '../../reducers/categories';
import * as types from '../../actions/categories';
import { testCategories } from '../../__mocks__/mockData';

describe('Categories Reducer', () => {

  it('Should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });


  it('Should handle RECEIVE_CATEGORIES', () => {

    const action = {
      type: types.RECEIVE_CATEGORIES,
      categories: testCategories
    }
    const expectedState = testCategories;

    expect(reducer({}, action)).toEqual(expectedState);

  });

})