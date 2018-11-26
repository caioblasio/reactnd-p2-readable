import configureStore from "redux-mock-store";
import * as DrawerActions from '../../actions/drawer'; 

const mockStore = configureStore();

describe("Drawer", () => {

  let store;

  beforeAll(() => {
    store = mockStore();
  })
  
  beforeEach(() => {
    store.clearActions();
  });

  it("Should dispatch openDrawer action", () => {

    store.dispatch(DrawerActions.openDrawer());
    const actions = store.getActions();
    const expectedAction = {type: DrawerActions.OPEN_DRAWER}
    expect(actions).toEqual([expectedAction])

  });

  it("Should dispatch closeDrawer action", () => {

    store.dispatch(DrawerActions.closeDrawer());
    const actions = store.getActions();
    const expectedAction = {type: DrawerActions.CLOSE_DRAWER}
    expect(actions).toEqual([expectedAction])

  });

});