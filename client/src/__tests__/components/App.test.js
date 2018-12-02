import React from 'react';
import App from '../../components/App';
import configureStore from 'redux-mock-store';
import toJson from 'enzyme-to-json';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk'

import { createShallow } from '@material-ui/core/test-utils';

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

describe('<App />', () => {

  let wrapper, store;


  beforeAll(() => {

    const initialState = {
      drawer: false,
      loading: false
    }

    store = mockStore(initialState);

  });


  it('renders the component', () => {

    let shallow = createShallow({untilSelector: App})

    wrapper = shallow(
        <App
          store={store}
        />
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

});