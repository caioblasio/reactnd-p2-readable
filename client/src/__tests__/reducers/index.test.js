import { createStore } from 'redux';
import rootReducer from '../../reducers';


describe('Root Reducer', () => {

  it('Should return the initial state', () => {

    let store = createStore(rootReducer);

    expect(store.getState().posts).toEqual({});
    expect(store.getState().categories).toEqual([]);
    expect(store.getState().comments).toEqual([]);
    expect(store.getState().drawer).toEqual(true);
    expect(store.getState().sort).toEqual('score');
    expect(store.getState().loading).toEqual(false);
    expect(store.getState().search).toEqual('');

  });

})

