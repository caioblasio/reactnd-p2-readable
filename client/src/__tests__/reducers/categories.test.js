import reducer from '../../reducers/categories';
import * as types from '../../actions/categories';
import { testCategories } from '../../testUtils/mockData/categories';

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