import configureStore from "redux-mock-store";
import * as SearchActions from '../../actions/search'; 

const mockStore = configureStore();

describe("Search", () => {

  let store;

  beforeAll(() => {
    store = mockStore();
  })
  
  beforeEach(() => {
    store.clearActions();
  });

  it("Should dispatch changeSearch action", () => {

    const query = "search query"

    store.dispatch(SearchActions.changeSearch(query));
    const actions = store.getActions();
    const expectedAction = {type: SearchActions.CHANGE_SEARCH, search: query}
    expect(actions).toEqual([expectedAction])

  });

});