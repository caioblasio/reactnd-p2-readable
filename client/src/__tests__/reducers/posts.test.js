import reducer from '../../reducers/posts';
import * as types from '../../actions/posts';
import { testPosts } from '../../__mocks__/mockData';

describe('Posts Reducer', () => {

  it('Should return the initial state', () => {
    const expectedState = {};
    expect(reducer(undefined, {})).toEqual(expectedState)
  });


  it('Should handle RECEIVE_POSTS', () => {

    const action = {
      type: types.RECEIVE_POSTS,
      posts: testPosts
    }
    const expectedState = testPosts;

    expect(reducer({}, action)).toEqual(expectedState);

  });

  it('Should handle RECEIVE_POSTS with errors', () => {

    const action = {
      type: types.RECEIVE_POSTS,
      posts: { error: 'There was an error' }
    }

    expect(reducer({}, action)).toEqual({});

  });

  it('Should handle ADD_POST', () => {

    const post = {
        id: '914f1eb6-6958-47dd-8aae-e0538674912d',
        timestamp: 1468479767190,
        title: 'Test Post',
        body: 'Just kidding',
        author: 'thingone',
        category: 'categorytwo',
        voteScore: 1,
        deleted: false,
        commentCount: 0
    }

    const action = {
      type: types.ADD_POST,
      post
    }
    const expectedState = { ...testPosts, [post.id]: { ...post } };

    expect(reducer(testPosts, action)).toEqual(expectedState);

  });


  it('Should handle EDIT_POST', () => {

    const action = {
      type: types.EDIT_POST,
      id: testPosts[Object.keys(testPosts)[0]].id,
      changes: { title: 'Udacity is awesome'}
    }
    const expectedState = { ...testPosts, [action.id]: { ...testPosts[action.id], ...action.changes } };

    expect(reducer(testPosts, action)).toEqual(expectedState);

  });

  it('Should handle REMOVE_POST', () => {

    const action = {
      type: types.REMOVE_POST,
      id: testPosts[Object.keys(testPosts)[0]].id
    }
    const expectedState = { [testPosts[Object.keys(testPosts)[1]].id]: { ...testPosts[Object.keys(testPosts)[1]] }};

    expect(reducer(testPosts, action)).toEqual(expectedState);

  });

})