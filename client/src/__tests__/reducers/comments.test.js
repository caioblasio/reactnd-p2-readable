import reducer from '../../reducers/comments';
import * as types from '../../actions/comments';
import { testComments } from '../../__mocks__/mockData';

describe('Posts Reducer', () => {

  it('Should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([])
  });


  it('Should handle RECEIVE_COMMENTS', () => {

    const action = {
      type: types.RECEIVE_COMMENTS,
      comments: testComments
    }
    const expectedState = testComments;

    expect(reducer({}, action)).toEqual(expectedState);

  });

  it('Should handle ADD_COMMENTS', () => {

    const comment = {
      id: '19afb16d-1267-4ada-9c50-d4026195b983',
      parentId: "8xf0y6ziyjabvozdd253nd",
      timestamp: 1469479767190,
      body: 'Another Comment',
      author: 'thingone',
      voteScore: 1,
      deleted: false,
      parentDeleted: false
    }

    const action = {
      type: types.ADD_COMMENT,
      comment
    }
    const expectedState = [...testComments, comment]

    expect(reducer(testComments, action)).toEqual(expectedState);

  });


  it('Should handle EDIT_COMMENT', () => {

    const action = {
      type: types.EDIT_COMMENT,
      id: testComments[0].id,
      changes: { body: 'An awesome comment'}
    }

    const expectedState = [...[{ ...testComments[0], body: action.changes.body }], ...[{ ...testComments[1] }]]

    expect(reducer(testComments, action)).toEqual(expectedState);

  });

  it('Should handle REMOVE_COMMENT', () => {

    const action = {
      type: types.REMOVE_COMMENT,
      id: testComments[0].id
    }

    const expectedState = [testComments[1]]

    expect(reducer(testComments, action)).toEqual(expectedState);

  });

})