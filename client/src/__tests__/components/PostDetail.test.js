import React from 'react';
import PostDetail from '../../components/PostDetail';
import configureStore from 'redux-mock-store';
import toJson from 'enzyme-to-json';
import { testPosts } from '../../testUtils/mockData/posts';
import { testComments } from '../../testUtils/mockData/comments';
import { MemoryRouter } from 'react-router-dom';

const mockStore = configureStore();

describe('<PostDetail />', () => {

  let wrapper, mounted, store;

  beforeAll(() => {

    const initialState = {
      posts: testPosts,
      comments: testComments
    }

    store = mockStore(initialState);

  });

  test('renders the component', () => {
    wrapper = shallow(
      <PostDetail
        id={testPosts[Object.keys(testPosts)[0]]}
        store={store}
      />
    );
    const component = wrapper.dive();
    expect(toJson(component)).toMatchSnapshot();
  });

  test('should render a Not Found', () => {
    wrapper = shallow(
      <PostDetail
        id="0123456789"
        store={store}
      />
    );
    const component = wrapper.dive();
    console.log(component.dive().debug());
  });


});