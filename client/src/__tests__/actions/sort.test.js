import configureStore from "redux-mock-store";
import * as SortActions from '../../actions/sort'; 

const mockStore = configureStore();

describe("Sort", () => {

  let store;

  beforeAll(() => {
    store = mockStore();
  })
  
  beforeEach(() => {
    store.clearActions();
  });

  it("Should dispatch changeSort action", () => {

    const option = "score"

    store.dispatch(SortActions.changeSort(option));
    const actions = store.getActions();
    const expectedAction = {type: SortActions.CHANGE_SORT, option }
    expect(actions).toEqual([expectedAction])

  });

});