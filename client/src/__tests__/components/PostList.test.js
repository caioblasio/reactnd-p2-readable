import React from 'react';
import PostList from '../../components/PostList';
import Post from '../../components/PostList/Post';
import Headline from '../../components/PostList/Headline';
import configureStore from 'redux-mock-store';
import toJson from 'enzyme-to-json';
import { testPosts, testComments, jsonHeaders } from '../../__mocks__/mockData';
import { MemoryRouter, Router } from 'react-router-dom';
import thunk from 'redux-thunk'
import IconButton from '@material-ui/core/IconButton';

import { createShallow } from '@material-ui/core/test-utils';
import { MenuItem } from '@material-ui/core';

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

describe('<PostList />', () => {

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

  it('renders all posts', () => {

    fetch.mockResponse(JSON.stringify(testPosts), { jsonHeaders })

    wrapper = shallow(
      <PostList
        store={store}
      />
    );
    const component = wrapper.dive();
    expect(component.dive().find(Post)).toHaveLength(2);
  });

  it('renders only posts by category posts', () => {

    fetch.mockResponse(JSON.stringify(testPosts), { jsonHeaders })

    wrapper = shallow(
      <PostList
        store={store}
        category="categoryone"
      />
    );
    const component = wrapper.dive();
    expect(component.dive().find(Post)).toHaveLength(1);
  });

  it('renders only specified number of posts', () => {

    fetch
      .mockResponse(JSON.stringify(testPosts), { jsonHeaders })

    wrapper = shallow(
      <PostList
        store={store}
        category="categoryone"
        maxQty={1}
      />
    );
    const component = wrapper.dive();
    expect(component.dive().find(Post)).toHaveLength(1);
  });

  it('does not render excluded post', () => {

    const excludeId = testPosts[Object.keys(testPosts)[0]].id

    fetch
      .mockResponse(JSON.stringify(testPosts), { jsonHeaders })

    wrapper = shallow(
      <PostList
        store={store}
        excludeId={excludeId}
      />
    );
    const component = wrapper.dive();
    expect(component.dive().find(Post).props().post.id).not.toEqual(excludeId);
    expect(component.dive().find(Post)).toHaveLength(1);

  });

  it('renders only specified posts', () => {

    const includeOnlyId = testPosts[Object.keys(testPosts)[0]].id

    fetch
      .mockResponse(JSON.stringify(testPosts), { jsonHeaders })

    wrapper = shallow(
      <PostList
        store={store}
        includeOnlyIds={includeOnlyId}
      />
    );
    const component = wrapper.dive();
    expect(component.dive().find(Post).props().post.id).toEqual(includeOnlyId);
    expect(component.dive().find(Post)).toHaveLength(1);

  });

  it('renders only searched posts', () => {

    const initialState = {
      posts: testPosts,
      comments: testComments,
      search: 'Udacity is the best place',
      loading: false
    }

    let store = mockStore(initialState);
    fetch.mockResponse(JSON.stringify(testPosts), { jsonHeaders })
    wrapper = shallow(
      <PostList
        store={store}
      />
    );
    const component = wrapper.dive();
    expect(component.dive().find(Post).props().post.title).toEqual('Udacity is the best place to learn React');
    expect(component.dive().find(Post)).toHaveLength(1);

  });


  it('renders posts from a category after all posts are rendered', () => {

    fetch.mockResponse(JSON.stringify(testPosts), { jsonHeaders })
    wrapper = shallow(
      <PostList
        store={store}
      />
    );
    const component = wrapper.dive();
    expect(component.dive().find(Post)).toHaveLength(2);
    component.setProps({ category: "categoryone" })
    expect(component.dive().find(Post)).toHaveLength(1);

  });
});

describe('<Post />', () => {

  let wrapper;

  it('renders a posts', () => {

    let onDelete = jest.fn();
    const post = testPosts[Object.keys(testPosts)[0]]

    wrapper = shallow(
      <Post
        post={post}
        onDelete={onDelete}
      />
    );
    const component = wrapper.dive();
  
    expect(toJson(component.dive())).toMatchSnapshot();
  });

  it('handle delete post', () => {

    let onDelete = jest.fn();
    const post = testPosts[Object.keys(testPosts)[0]]
    window.confirm = jest.fn(() => true);

    wrapper = shallow(
      <Post
        post={post}
        onDelete={onDelete}
      />
    );
    const component = wrapper.dive();
  
    component.dive().find(MenuItem).last().simulate('click');
    expect(onDelete.mock.calls).toHaveLength(1);
  });

});

describe('<Headline />', () => {

  let wrapper;

  it('renders a Headline', () => {

    let onSort = jest.fn();

    wrapper = shallow(
      <Headline
        title="All Posts"
        onSort={onSort}
        sortOption="score"
      />
    );
    const component = wrapper.dive();
    expect(toJson(component)).toMatchSnapshot();
  });

  it('calls sort method with date option', () => {

    let onSort = jest.fn();

    wrapper = shallow(
      <Headline
        title="All Posts"
        onSort={onSort}
        sortOption="score"
      />
    );
    const component = wrapper.dive();
    component.find(MenuItem).last().simulate('click');
    expect(onSort.mock.calls[0][0]).toEqual('date')

  });

  it('calls sort method with score option', () => {

    let onSort = jest.fn();

    wrapper = shallow(
      <Headline
        title="All Posts"
        onSort={onSort}
        sortOption="date"
      />
    );
    const component = wrapper.dive();
    component.find(MenuItem).first().simulate('click');
    expect(onSort.mock.calls[0][0]).toEqual('score')

  });

});
