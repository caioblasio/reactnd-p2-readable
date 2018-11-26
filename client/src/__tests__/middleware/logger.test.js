import logger from '../../middleware/logger';
import configureStore from "redux-mock-store";

const middlewares = [ logger ];
const mockStore = configureStore(middlewares);

describe('Logger Middleware', () => {

  let store;

  beforeAll(() => {
  
    store = mockStore();
  })
  
  beforeEach(() => {
    store.clearActions();

  });

  it('Should call next middleware with correct action', () => {
    
    const next = jest.fn();
    store.dispatch = jest.fn();
    
    const action = { type: 'TEST_ACTION', payload: 'data'}

    logger(store)(next)(action);

    expect(next.mock.calls[0][0].type).toEqual('TEST_ACTION');

  });

})