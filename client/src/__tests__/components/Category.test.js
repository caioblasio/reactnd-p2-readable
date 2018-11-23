import React from 'react';

import configureStore from 'redux-mock-store'; // Smart components
import Category from '../../components/Category';

import { testCategories } from '../../testUtils/mockData/categories';
import { MemoryRouter } from 'react-router-dom';
import NotFound from '../../components/NotFound';
import PostList from '../../components/PostList';

const mockStore = configureStore();

describe('<Category />', () => {

  let wrapper, mounted, store;

    beforeEach(() => {

      const initialState = {
        categories: testCategories
      }

      store = mockStore(initialState);

    });
  

  test('should show get correct category as props', () => {
    wrapper = shallow(
      <Category store={store} category="categoryone"/>
    );
    const component = wrapper.dive();

    expect(component.props().category).toBe("categoryone");
  });

  test('should show post list component', () => {

    wrapper = shallow(
      <Category store={store} category="categoryone"/>
    );

    const component = wrapper.dive();

    expect(component.dive().find(PostList)).toHaveLength(1);

  });

  test('should show not found component', () => {
    mounted = mount(
      <MemoryRouter>
        <Category store={store} category="notexist"/>
      </MemoryRouter>
    );

    expect(mounted.find(NotFound)).toHaveLength(1);
    expect(mounted.find(PostList)).toHaveLength(0);

  });

});