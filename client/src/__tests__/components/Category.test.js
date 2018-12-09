import React from 'react';
import configureStore from 'redux-mock-store';
import Category from '../../components/Category';
import { testCategories } from '../../__mocks__/mockData';
import { MemoryRouter } from 'react-router-dom';
import NotFound from '../../components/NotFound';
import PostList from '../../components/PostList';

const mockStore = configureStore();

describe('<Category />', () => {

  let wrapper, mounted, store;

    beforeAll(() => {

      const initialState = {
        categories: testCategories
      }

      store = mockStore(initialState);

    });
  

  it('should show get correct category as props', () => {
    wrapper = shallow(
      <Category store={store} category="categoryone"/>
    );
    const component = wrapper.dive();

    expect(component.props().category).toBe("categoryone");
  });

  it('should show post list component', () => {

    wrapper = shallow(
      <Category store={store} category="categoryone"/>
    );

    const component = wrapper.dive();

    expect(component.dive().find(PostList)).toHaveLength(1);

  });

  it('should show not found component', () => {
    mounted = mount(
      <MemoryRouter>
        <Category store={store} category="notexist"/>
      </MemoryRouter>
    );

    expect(mounted.find(NotFound)).toHaveLength(1);
    expect(mounted.find(PostList)).toHaveLength(0);

  });

});