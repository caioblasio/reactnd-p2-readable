import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as CategoriesActions from '../../actions/categories'; 
import { testCategories } from '../../testUtils/mockData/categories';

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

describe("Categories", () => {

  let store;

  beforeAll(() => {
  
    store = mockStore();
  })
  
  beforeEach(() => {
    store.clearActions();
    fetch.resetMocks();
  });

  it("Should dispatch fetchCategories action with payload", async () => {

    fetch.once(JSON.stringify(testCategories))

    await store.dispatch(CategoriesActions.fetchCategories());
    const actions = store.getActions();
    const expectedAction = {type: CategoriesActions.RECEIVE_CATEGORIES, categories: testCategories}
    expect(actions[0]).toEqual(expectedAction)

  });

});