import React from 'react';
import Header from '../../components/Header';
import SearchAppBar from '../../components/Header/SearchAppBar';
import ResponsiveDrawer from '../../components/Header/Drawer';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import { testPosts, testCategories, jsonHeaders } from '../../__mocks__/mockData';
import thunk from 'redux-thunk'
import { createShallow } from '@material-ui/core/test-utils';
import MemoryRouter from 'react-router-dom/MemoryRouter';
import Route from 'react-router-dom/Route';
import { InputBase } from '@material-ui/core';

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

describe('<Header />', () => {

  let wrapper, store;
  
  beforeAll(() => {
    const initialState = {
      categories: testCategories,
      drawer: false,
    }
    store = mockStore(initialState);
  });

  beforeEach(() => {
    fetch.resetMocks();
  });

  it('renders correctly', () => {

    let shallow = createShallow({untilSelector: Route});

    fetch
      .mockResponse(JSON.stringify(testCategories), { jsonHeaders })

    wrapper = shallow(
      <MemoryRouter>
        <Header
          store={store}
        />
      </MemoryRouter>
    );

    const component = wrapper.dive().dive()
    expect(toJson(component)).toMatchSnapshot();

  });

});

describe('<ResponsiveDrawer />', () => {

  let wrapper;

  it('renders correcty', () => {

    let shallow = createShallow({untilSelector: ResponsiveDrawer})
    const openDrawer = jest.fn(),
      closeDrawer = jest.fn();

    wrapper = shallow(
      <MemoryRouter>
        <ResponsiveDrawer
          isOpen={true}
          categories={testCategories}
          openDrawer={openDrawer}
          closeDrawer={closeDrawer}
        />
      </MemoryRouter>
    );

    const component = wrapper.dive();
    expect(toJson(component)).toMatchSnapshot();

  });

});

describe('<SearchAppBar />', () => {

  let wrapper;

  it('renders correcty', () => {

    let shallow = createShallow({untilSelector: SearchAppBar})
    const openDrawer = jest.fn(),
      closeDrawer = jest.fn(),
      changeSearch = jest.fn();

    wrapper = shallow(
      <MemoryRouter>
        <SearchAppBar
          isOpen={true}
          changeSearch={changeSearch}
          openDrawer={openDrawer}
          closeDrawer={closeDrawer}
        />
      </MemoryRouter>
    );

    const component = wrapper.dive();
    expect(toJson(component)).toMatchSnapshot();

  });

  it('calls change search', (done) => {

    let shallow = createShallow({untilSelector: SearchAppBar})
    const openDrawer = jest.fn(),
      closeDrawer = jest.fn(),
      changeSearch = jest.fn(),
      query = 'search for posts';
    

    wrapper = shallow(
      <MemoryRouter>
        <SearchAppBar
          isOpen={true}
          changeSearch={changeSearch}
          openDrawer={openDrawer}
          closeDrawer={closeDrawer}
        />
      </MemoryRouter>
    );

    const component = wrapper.dive();
    component.find(InputBase).simulate('change', { target: { value: query } });
    expect(component.state().query).toEqual(query)

    setTimeout(() => {
      expect(changeSearch.mock.calls[0][0]).toEqual(query)
      done();
    }, 500);

  });

});