import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as CommentsActions from '../../actions/comments'; 
import { testPosts, testComments } from '../../__mocks__/mockData';

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

describe("Comments", () => {

  let store;

  beforeAll(() => {
  
    store = mockStore();
  })
  
  beforeEach(() => {
    store.clearActions();
    fetch.resetMocks();
  });

  it("Should dispatch fetchComments action with payload", async () => {

    const postId = testPosts[Object.keys(testPosts)[0]].id
    fetch.once(JSON.stringify(testComments))

    await store.dispatch(CommentsActions.fetchComments(postId));
    const actions = store.getActions();
    const expectedAction = {type: CommentsActions.RECEIVE_COMMENTS, comments: testComments}
    expect(actions[0]).toEqual(expectedAction)

  });

  it("Should dispatch addComment action with payload", async () => {

    const testComment = testComments[Object.keys(testComments)[0]]

    fetch.once(JSON.stringify(testComment))

    await store.dispatch(CommentsActions.addComment(testComment));
    const actions = store.getActions();
    const expectedAction = {type: CommentsActions.ADD_COMMENT, comment: testComment}
    expect(actions[0]).toEqual(expectedAction)

  });

  it("Should dispatch removeComment action with payload", async () => {

    const testComment = testComments[Object.keys(testComments)[0]]

    fetch.once(JSON.stringify(testComment))

    await store.dispatch(CommentsActions.removeComment(testComment.id));
    const actions = store.getActions();
    const expectedAction = {type: CommentsActions.REMOVE_COMMENT, id: testComment.id}
    expect(actions[0]).toEqual(expectedAction)

  });

  it("Should dispatch editComment action with payload", async () => {

    const testComment = testComments[Object.keys(testComments)[0]]

    fetch.once(JSON.stringify(testComment))

    await store.dispatch(CommentsActions.editComment(testComment.id, testComment));
    const actions = store.getActions();
    const expectedAction = {type: CommentsActions.EDIT_COMMENT, id: testComment.id, changes: testComment}
    expect(actions[0]).toEqual(expectedAction)

  });

  it("Should dispatch addVoteToComment action with payload", async () => {

    const testComment = testComments[Object.keys(testComments)[0]]
    const changes = { voteScore: testComment.voteScore + 1 }
    fetch.once(JSON.stringify(testComment))

    await store.dispatch(CommentsActions.addVoteToComment(testComment.id, changes, 'upVote'));
    const actions = store.getActions();
    const expectedAction = {type: CommentsActions.EDIT_COMMENT, id: testComment.id, changes: { voteScore: changes.voteScore } }
    expect(actions[0]).toEqual(expectedAction)

  });
});