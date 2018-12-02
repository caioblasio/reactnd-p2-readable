import React from 'react';
import CommentList from '../../components/CommentList';
import Comment from '../../components/CommentList/Comment';
import configureStore from 'redux-mock-store';
import { testPosts, testComments, jsonHeaders } from '../../__mocks__/mockData';
import thunk from 'redux-thunk'
import { createShallow } from '@material-ui/core/test-utils';
import Content from '../../components/CommentList/Comment/Content';
import Edit from '../../components/CommentList/Comment/Edit';
import { IconButton, Button } from '@material-ui/core';
import { ValidatorForm } from 'react-form-validator-core';

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

describe('<CommentList />', () => {

  let wrapper, store;
  
  beforeAll(() => {
    const initialState = {
      comments: testComments,
      posts: testPosts
    }
    store = mockStore(initialState);
  });

  beforeEach(() => {
    fetch.resetMocks();
  });

  it('renders correctly', () => {

    const testPost = testPosts[Object.keys(testPosts)[0]];
    let shallow = createShallow({untilSelector: CommentList})

    fetch
      .mockResponse(JSON.stringify(testComments), { jsonHeaders })

    wrapper = shallow(
      <CommentList
        postId={testPost.id}
        store={store}
      />
    );
    
    expect(wrapper.find(Comment)).toHaveLength(2);

  });

});


describe('<Comment />', () => {

  let wrapper;

  it('renders correctly when on view mode', () => {

    const testComment = testComments[0],
      removeComment = jest.fn(),
      editComment = jest.fn();

    let shallow = createShallow({untilSelector: Comment})

    wrapper = shallow(
      <Comment
        comment={testComment}
        onRemoveComment={removeComment}
        onEditComment={editComment}
      />
    );
    
    expect(wrapper.find(Content)).toHaveLength(1);

  });

  it('renders correctly when on edit mode', () => {

    const testComment = testComments[0],
      removeComment = jest.fn(),
      editComment = jest.fn();

    let shallow = createShallow({untilSelector: Comment})

    wrapper = shallow(
      <Comment
        comment={testComment}
        onRemoveComment={removeComment}
        onEditComment={editComment}
      />
    );
    
    wrapper.setState({ edit: true });
    expect(wrapper.find(Edit)).toHaveLength(1);

  });

});


describe('<Content />', () => {

  let wrapper;

  beforeEach(() => {
    fetch.resetMocks();
  });

  it('calls delete post ', () => {

    const testComment = testComments[0],
      removeComment = jest.fn(),
      toggleEdit = jest.fn();

    window.confirm = jest.fn(() => true);

    fetch
      .mockResponse(JSON.stringify(testComment.id), { jsonHeaders })
   
    wrapper = shallow(
      <Content
        comment={testComment}
        onRemoveComment={removeComment}
        toggleEdit={toggleEdit}
      />
    );
    
    const component = wrapper.dive();
    component.find(IconButton).last().simulate('click');
    expect(removeComment.mock.calls).toHaveLength(1)
    
  });

  it('enable edit mode from view mode ', () => {

    const testComment = testComments[0],
      removeComment = jest.fn(),
      toggleEdit = jest.fn();
   
    wrapper = shallow(
      <Content
        comment={testComment}
        onRemoveComment={removeComment}
        toggleEdit={toggleEdit}
      />
    );
    
    const component = wrapper.dive();
    component.find(IconButton).first().simulate('click');
    expect(toggleEdit.mock.calls).toHaveLength(1)
    
  });

});

describe('<Edit />', () => {

  let wrapper;

  beforeEach(() => {
    fetch.resetMocks();
  });

  it('calls delete post ', () => {

    const testComment = testComments[0],
      editComment = jest.fn(),
      toggleEdit = jest.fn();
   
    wrapper = shallow(
      <Edit
        comment={testComment}
        onEditComment={editComment}
        toggleEdit={toggleEdit}
      />
    );
    
    const component = wrapper.dive();
    component.find(ValidatorForm).simulate('submit', { preventDefault () {} });
    expect(editComment.mock.calls[0][0]).toEqual(testComment.id);
    expect(editComment.mock.calls[0][1].body).toEqual(testComment.body);
    
  });

  it('enable view mode from edit mode ', () => {

    const testComment = testComments[0],
      editComment = jest.fn(),
      toggleEdit = jest.fn();
   
    wrapper = shallow(
      <Edit
        comment={testComment}
        onEditComment={editComment}
        toggleEdit={toggleEdit}
      />
    );
    
    const component = wrapper.dive();
    component.find(Button).first().simulate('click');
    expect(toggleEdit.mock.calls).toHaveLength(1)
    
  });

});