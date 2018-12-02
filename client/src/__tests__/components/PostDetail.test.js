import React from 'react';
import PostDetail from '../../components/PostDetail';
import configureStore from 'redux-mock-store';
import toJson from 'enzyme-to-json';
import { testPosts, testComments, jsonHeaders } from '../../__mocks__/mockData';
import { MemoryRouter, Router } from 'react-router-dom';
import thunk from 'redux-thunk'
import NotFound from '../../components/NotFound';
import { Provider } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';

import { createShallow } from '@material-ui/core/test-utils';

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

describe('<PostDetail />', () => {

  let wrapper, store;


  beforeAll(() => {

    const initialState = {
      posts: testPosts,
      comments: testComments,
      loading: false
    }

    store = mockStore(initialState);

  });

  beforeEach(() => {
    fetch.resetMocks();
  });

  it('renders the component', () => {

    const testPost = testPosts[Object.keys(testPosts)[0]];

    fetch
      .mockResponse(JSON.stringify(testPost), { jsonHeaders })

    wrapper = shallow(
      <PostDetail
        id={testPost.id}
        store={store}
      />
    );
    const component = wrapper.dive();
    expect(toJson(component.dive())).toMatchSnapshot();
  });

  it('should render a Not Found', () => {

    const error = { error: 'There was an error' }

    fetch
      .mockResponse(JSON.stringify(error), { jsonHeaders })

    wrapper = shallow(
      <PostDetail
        id="0123456789" //id that not exist
        store={store}
      />
    );
    const component = wrapper.dive();
    expect(component.dive().find(NotFound)).toHaveLength(1);
  });

  it('should render a Correct Post', () => {

    const testPost = testPosts[Object.keys(testPosts)[0]];

    fetch
      .mockResponse(JSON.stringify(testPost), { jsonHeaders })

    wrapper = shallow(
      <PostDetail
        id={testPost.id}
        store={store}
      />
    );
    const component = wrapper.dive();
    expect(component.props().post.id).toBe(testPost.id);
    
  });

  test('should delete a post', (done) => {

    let shallow = createShallow({untilSelector: PostDetail})

    const testPost = testPosts[Object.keys(testPosts)[0]];
    const id = testPost.id
    window.confirm = jest.fn(() => true);

    fetch
      .once(JSON.stringify(testPost))
      .once(JSON.stringify({ id }))

   

    wrapper = shallow(
      <MemoryRouter initialEntries={[`/post/${id}`]}>
        <PostDetail
          id={id}
          store={store}
          history={[]}
        />
      </MemoryRouter>
    );

    const component = wrapper.dive();
    component.dive().find(IconButton).last().simulate('click');

    const expectedAction = { type: 'REMOVE_POST', id: '8xf0y6ziyjabvozdd253nd' }

    setImmediate(() => {
      expect(store.getActions()).toEqual(
        expect.arrayContaining([expectedAction])
      );
      done();
    })
  });



});