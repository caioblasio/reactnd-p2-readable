import React from 'react';
import toJson from 'enzyme-to-json';
import { testPosts, testComments, jsonHeaders } from '../../__mocks__/mockData';
import VoteControl from '../../components/VoteControl';
import IconButton from '@material-ui/core/IconButton';
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store';

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);


describe('<VoteControl />', () => {

  let wrapper, store;


  beforeAll(() => {

    const initialState = {
      posts: testPosts
    }

    store = mockStore(initialState);

  });

  beforeEach(() => {
    fetch.resetMocks();
  });

  it('renders the component', () => {
    
    const testPost = testPosts[Object.keys(testPosts)[0]];

    wrapper = shallow(
      <VoteControl 
        type="post"
        voteScore={testPost.voteScore}
        id={testPost.id}
        store={store}
      />
    );
    const component = wrapper.dive();
    expect(toJson(component)).toMatchSnapshot();

  });

  it('handles a first vote', () => {
    
    const testPost = testPosts[Object.keys(testPosts)[0]];

    fetch
      .mockResponse(JSON.stringify(testPost), { jsonHeaders })

    wrapper = shallow(
      <VoteControl 
        type="post"
        voteScore={testPost.voteScore}
        id={testPost.id}
        store={store}
      />
    );
    const component = wrapper.dive();
    component.find(IconButton).first().simulate('click');
    expect(component.state().currentVote).toEqual('upVote')
    expect(fetch.mock.calls).toHaveLength(1)

  });

  it('handles downVote after an upVote', () => {
    
    const testPost = testPosts[Object.keys(testPosts)[0]];

    fetch
      .mockResponse(JSON.stringify(testPost), { jsonHeaders })

    wrapper = shallow(
      <VoteControl 
        type="post"
        voteScore={testPost.voteScore}
        id={testPost.id}
        store={store}
      />
    );
    const component = wrapper.dive();
    component.find(IconButton).last().simulate('click');
    expect(component.state().currentVote).toEqual('downVote')
    expect(fetch.mock.calls).toHaveLength(2)

  });

  it('handles a cancel vote', () => {
    
    const testPost = testPosts[Object.keys(testPosts)[0]];

    fetch
      .mockResponse(JSON.stringify(testPost), { jsonHeaders })

    wrapper = shallow(
      <VoteControl 
        type="post"
        voteScore={testPost.voteScore}
        id={testPost.id}
        store={store}
      />
    );
    const component = wrapper.dive();
    component.find(IconButton).last().simulate('click');
    expect(component.state().currentVote).toEqual(null)
    expect(fetch.mock.calls).toHaveLength(1)

  });


  it('handles vote to comment correctly', () => {
    
    const testComment = testComments[Object.keys(testComments)[0]];

    fetch
      .mockResponse(JSON.stringify(testComment), { jsonHeaders })

    wrapper = shallow(
      <VoteControl 
        type="comment"
        voteScore={testComment.voteScore}
        id={testComment.id}
        store={store}
      />
    );
    const component = wrapper.dive();
    component.find(IconButton).first().simulate('click');
    expect(component.state().currentVote).toEqual('upVote')
    expect(fetch.mock.calls[0][0]).toEqual(`/api/comments/${testComment.id}`);
    expect(fetch.mock.calls).toHaveLength(1)

  });



});