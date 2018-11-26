import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as PostActions from '../../actions/posts'; 
import { testPosts } from '../../testUtils/mockData/posts';
import { testCategories } from '../../testUtils/mockData/categories';

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

describe("Posts", () => {

  let store;

  beforeAll(() => {
  
    store = mockStore();
  })
  
  beforeEach(() => {
    store.clearActions();
    fetch.resetMocks();
  });

  it("Should dispatch fetchPosts action with payload", async () => {

    fetch.once(JSON.stringify(testPosts))

    await store.dispatch(PostActions.fetchPosts());
    const actions = store.getActions();
    const expectedAction = {type: PostActions.RECEIVE_POSTS, posts: testPosts}
    expect(actions[1]).toEqual(expectedAction)

  });

  it("Should dispatch fetchPostsByCategory action with payload", async () => {

    const testCategoryPosts = testPosts[Object.keys(testPosts)[0]]

    fetch.once(JSON.stringify(testCategoryPosts))

    await store.dispatch(PostActions.fetchPostsByCategory(testCategories[0].path));
    const actions = store.getActions();
    const expectedAction = {type: PostActions.RECEIVE_POSTS, posts: testCategoryPosts}
    expect(actions[1]).toEqual(expectedAction)

  });

  it("Should dispatch fetchPostById action with payload", async () => {

    const testPost = testPosts[Object.keys(testPosts)[0]]

    fetch.once(JSON.stringify(testPost))

    await store.dispatch(PostActions.fetchPostById(testPost.id));
    const actions = store.getActions();
    const expectedAction = {type: PostActions.RECEIVE_POSTS, posts: testPost}
    expect(actions[1]).toEqual(expectedAction)

  });

  it("Should dispatch addPost action with payload", async () => {

    const testPost = testPosts[Object.keys(testPosts)[0]]

    fetch.once(JSON.stringify(testPost))

    await store.dispatch(PostActions.addPost(testPost));
    const actions = store.getActions();
    const expectedAction = {type: PostActions.ADD_POST, post: testPost}
    expect(actions[1]).toEqual(expectedAction)

  });

  it("Should dispatch deletePost action with payload", async () => {

    const testPost = testPosts[Object.keys(testPosts)[0]]

    fetch.once(JSON.stringify(testPost))

    await store.dispatch(PostActions.removePost(testPost.id));
    const actions = store.getActions();
    const expectedAction = {type: PostActions.REMOVE_POST, id: testPost.id}
    expect(actions[1]).toEqual(expectedAction)

  });

  it("Should dispatch editPost action with payload", async () => {

    const testPost = testPosts[Object.keys(testPosts)[0]]

    fetch.once(JSON.stringify(testPost))

    await store.dispatch(PostActions.editPost(testPost.id, testPost));
    const actions = store.getActions();
    const expectedAction = {type: PostActions.EDIT_POST, id: testPost.id, changes: testPost }
    expect(actions[1]).toEqual(expectedAction)

  });

  it("Should dispatch addVoteToPost action with payload", async () => {

    const testPost = testPosts[Object.keys(testPosts)[0]]
    const changes = { voteScore: testPost.voteScore + 1 }
    fetch.once(JSON.stringify(testPost))

    await store.dispatch(PostActions.addVoteToPost(testPost.id, changes, 'upVote'));
    const actions = store.getActions();
    const expectedAction = {type: PostActions.EDIT_POST, id: testPost.id, changes: {voteScore: changes.voteScore} }
    expect(actions[0]).toEqual(expectedAction)

  });
});