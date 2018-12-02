import React from 'react';
import ManagePost from '../../components/ManagePost';
import Form from '../../components/ManagePost/Form';
import configureStore from 'redux-mock-store';
import { testPosts, testCategories, jsonHeaders } from '../../__mocks__/mockData';
import thunk from 'redux-thunk'
import { createShallow } from '@material-ui/core/test-utils';
import { Button, Typography } from '@material-ui/core';
import { TextValidator, ValidatorForm, SelectValidator } from 'react-material-ui-form-validator';
import { MemoryRouter, Router } from 'react-router-dom';
import Route from 'react-router-dom/Route';

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

describe('<ManagePost />', () => {

  let wrapper, store;
  
  beforeAll(() => {
    const initialState = {
      categories: testCategories,
      posts: testPosts,
    }
    store = mockStore(initialState);
  });

  beforeEach(() => {
    fetch.resetMocks();
  });

  it('renders a form component on a new post form', () => {

    let shallow = createShallow({untilSelector: Form})

    wrapper = shallow(
      <ManagePost
        store={store}
      />
    );

    expect(wrapper.find(Typography).dive().dive().text()).toEqual('New Post');
    expect(wrapper.find(Form)).toHaveLength(1)
  });

  it('renders correctly when a post id is passed', () => {

    const testPost = testPosts[Object.keys(testPosts)[0]];

    fetch
      .mockResponse(JSON.stringify(testPost), { jsonHeaders })

    wrapper = shallow(
      <ManagePost
        edit
        postId={testPost.id}
        store={store}
      />
    );

    const component = wrapper.dive().dive();
    expect(component.find(Typography).dive().dive().text()).toEqual('Edit Post');
    expect(fetch.mock.calls).toHaveLength(1);
    expect(wrapper.dive().props().post).toEqual(testPost)

  });

});

describe('<Form />', () => {

  let wrapper, mounted;

  beforeEach(() => {
    fetch.resetMocks();
  });

  it('renders a form component', () => {

    const onSubmit = jest.fn();

    mounted = mount(
      <MemoryRouter>
        <Form
          categories={testCategories}
          onSubmit={onSubmit}
        />
      </MemoryRouter>
    );

    expect(mounted.find('form')).toHaveLength(1)
  });

  it('does not submit if fields are empty', () => {

    const onSubmit = jest.fn();

    mounted = mount(
      <MemoryRouter>
        <Form
          categories={testCategories}
          onSubmit={onSubmit}
        />
      </MemoryRouter>
    );

    mounted.find(Button).last().simulate('click');
    expect(onSubmit.mock.calls).toHaveLength(0)
  });

  it('updates state when form is filled', () => {

    let shallow = createShallow({untilSelector: Route})
    const onSubmit = jest.fn();

    wrapper = shallow(
      <MemoryRouter>
        <Form
          categories={testCategories}
          onSubmit={onSubmit}
        />
      </MemoryRouter>
    );

    const component = wrapper.dive();

    component.find(TextValidator).at(0).simulate('change', { target: { value: 'Test Title' } });
    component.find(TextValidator).at(1).simulate('change', { target: { value: 'Test Body' } });
    component.find(TextValidator).at(2).simulate('change', { target: { value: 'Test Author' } });
    component.find(SelectValidator).simulate('change', { target: { value: 'categoryone' } });
    expect(component.state().title).toEqual('Test Title');
    expect(component.state().body).toEqual('Test Body');
    expect(component.state().author).toEqual('Test Author');
    expect(component.state().category).toEqual('categoryone');

  });

  it('submits the form with correct data and cleans form fields', () => {

    let shallow = createShallow({untilSelector: Route})
    const onSubmit = jest.fn();

    wrapper = shallow(
      <MemoryRouter>
        <Form
          categories={testCategories}
          onSubmit={onSubmit}
        />
      </MemoryRouter>
    );

    const component = wrapper.dive();

    component.find(TextValidator).at(0).simulate('change', { target: { value: 'Test Title' } });
    component.find(TextValidator).at(1).simulate('change', { target: { value: 'Test Body' } });
    component.find(TextValidator).at(2).simulate('change', { target: { value: 'Test Author' } });
    component.find(SelectValidator).simulate('change', { target: { value: 'categoryone' } });
    component.find(ValidatorForm).simulate('submit', { preventDefault () {} });
    expect(onSubmit.mock.calls[0][0].title).toEqual('Test Title');
    expect(onSubmit.mock.calls[0][0].body).toEqual('Test Body');
    expect(onSubmit.mock.calls[0][0].author).toEqual('Test Author');
    expect(onSubmit.mock.calls[0][0].category).toEqual('categoryone');
    expect(component.state().author).toEqual('');
    expect(component.state().body).toEqual('');
    expect(component.state().author).toEqual('');
    expect(component.state().category).toEqual('');

  });

  it('handles form state correctly when post is passed', () => {

    let shallow = createShallow({untilSelector: Route})
    const testPost = testPosts[Object.keys(testPosts)[0]];
    const onSubmit = jest.fn();

    wrapper = shallow(
      <MemoryRouter>
        <Form
          categories={testCategories}
          onSubmit={onSubmit}
          post={testPost}
        />
      </MemoryRouter>
    );

    const component = wrapper.dive();
    const expectedInitialFormState = {
      title: testPost.title,
      body: testPost.body,
      author: testPost.author,
      category: testPost.category
    }

    expect(component.state()).toEqual(expectedInitialFormState)
  });

  it('goes back when back button is clicked', () => {

    const onSubmit = jest.fn();

    mounted = mount(
      <MemoryRouter initialEntries={['/', '/new']} initialIndex={1}>
        <Form
          categories={testCategories}
          onSubmit={onSubmit}
        />
      </MemoryRouter>
    );

    mounted.find(Button).first().simulate('click');
    expect(mounted.find(Router).props('history').history.location.pathname).toBe('/');

  });

});