import configureStore from "redux-mock-store";
import * as LoadingActions from '../../actions/loading'; 

const mockStore = configureStore();

describe("Loading", () => {

  let store;

  beforeAll(() => {
    store = mockStore();
  })
  
  beforeEach(() => {
    store.clearActions();
  });

  it("Should dispatch showLoading action", () => {

    store.dispatch(LoadingActions.showLoading());
    const actions = store.getActions();
    const expectedAction = {type: LoadingActions.SHOW_LOADING}
    expect(actions).toEqual([expectedAction])

  });

  it("Should dispatch hideLoading action", () => {

    store.dispatch(LoadingActions.hideLoading());
    const actions = store.getActions();
    const expectedAction = {type: LoadingActions.HIDE_LOADING}
    expect(actions).toEqual([expectedAction])

  });

});