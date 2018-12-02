import React from 'react';
import NewComment from '../../components/NewComment';
import Form from '../../components/NewComment/Form';
import configureStore from 'redux-mock-store';
import { testPosts } from '../../__mocks__/mockData';
import thunk from 'redux-thunk'
import { createShallow } from '@material-ui/core/test-utils';
import { Button } from '@material-ui/core';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

describe('<NewComment />', () => {

  let wrapper, store;
  
  beforeAll(() => {
    const initialState = {}
    store = mockStore(initialState);
  });

  beforeEach(() => {
    fetch.resetMocks();
  });

  it('renders a form component', () => {

    let shallow = createShallow({untilSelector: Form})
    const testPost = testPosts[Object.keys(testPosts)[0]];

    wrapper = shallow(
      <NewComment
        parentId={testPost.id}
        store={store}
      />
    );

    expect(wrapper.find(Form)).toHaveLength(1)
  });

});

describe('<Form />', () => {

  let wrapper;

  beforeEach(() => {
    fetch.resetMocks();
  });

  it('renders a form component', () => {

    let shallow = createShallow({untilSelector: Form})
    const onSubmit = jest.fn();

    wrapper = shallow(
      <Form
        onSubmit={onSubmit}
      />
    );

   expect(wrapper.find('form')).toHaveLength(1)
  });

  it('does not submit if fields are empty', () => {

    let shallow = createShallow({untilSelector: Form})
    const onSubmit = jest.fn();

    wrapper = shallow(
      <Form
        onSubmit={onSubmit}
      />
    );

    wrapper.find(Button).simulate('click');
    expect(onSubmit.mock.calls).toHaveLength(0)
  });

  it('updates state when form is filled', () => {

    const onSubmit = jest.fn();

    wrapper = shallow(
      <Form
        onSubmit={onSubmit}
      />
    );

    const component = wrapper.dive();

    component.find(TextValidator).first().simulate('change', { target: { value: 'Test Body' } });
    component.find(TextValidator).last().simulate('change', { target: { value: 'Test Author' } });
    expect(component.state().author).toEqual('Test Author');
    expect(component.state().body).toEqual('Test Body');

  });

  it('submits the form with correct data and cleans form fields', () => {

    const onSubmit = jest.fn();

    wrapper = shallow(
      <Form
        onSubmit={onSubmit}
      />
    );

    const component = wrapper.dive();

    component.find(TextValidator).first().simulate('change', { target: { value: 'Test Body' } });
    component.find(TextValidator).last().simulate('change', { target: { value: 'Test Author' } });
    component.find(ValidatorForm).simulate('submit', { preventDefault () {} });
    expect(onSubmit.mock.calls[0][0].body).toEqual('Test Body');
    expect(onSubmit.mock.calls[0][0].author).toEqual('Test Author');
    expect(component.state().author).toEqual('');
    expect(component.state().body).toEqual('');

  });

});