import React from 'react';
import PostDetail from '../../components/PostDetail';
import configureStore from 'redux-mock-store';
import toJson from 'enzyme-to-json';
import { testPosts } from '../../testUtils/mockData/posts';
import { testComments } from '../../testUtils/mockData/comments';
import { MemoryRouter, Router } from 'react-router-dom';
import thunk from 'redux-thunk'
import NotFound from '../../components/NotFound';
import { Provider } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';

import { createShallow } from '@material-ui/core/test-utils';

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

describe('<PostDetail />', () => {

  let wrapper, mounted, store;


  beforeAll(() => {

    const initialState = {
      posts: testPosts,
      comments: testComments,
      loading: false
    }

    store = mockStore(initialState);

  });

  it('renders the component', () => {

    // const id = testPosts[Object.keys(testPosts)[0]].id;

    // wrapper = shallow(
    //   <PostDetail
    //     id={id}
    //     store={store}
    //   />
    // );
    // const component = wrapper.dive();
    // expect(toJson(component.dive())).toMatchSnapshot();
  });

  // it('should render a Not Found', () => {

  //   wrapper = shallow(
  //     <PostDetail
  //       id="0123456789" //id that not exist
  //       store={store}
  //     />
  //   );
  //   const component = wrapper.dive();
  //   expect(component.dive().find(NotFound)).toHaveLength(1);
  // });

  // it('should render a Correct Post', () => {

  //   const id = testPosts[Object.keys(testPosts)[0]].id;

  //   wrapper = shallow(
  //     <PostDetail
  //       id={id}
  //       store={store}
  //     />
  //   );
  //   const component = wrapper.dive();
  //   expect(component.props().post.id).toBe(id);
    
  // });

  // test('should delete a post', (done) => {

  //   let shallow = createShallow({untilSelector: PostDetail})

  //   const id = testPosts[Object.keys(testPosts)[0]].id;
  //   window.confirm = jest.fn(() => true);

  //   fetch
  //   .once(JSON.stringify(testPosts[Object.keys(testPosts)[0]]))
  //   .once(JSON.stringify({ id }))

   

  //   wrapper = shallow(
  //     <MemoryRouter initialEntries={[`/post/${id}`]}>
  //       <PostDetail
  //         id={id}
  //         store={store}
  //         history={[]}
  //       />
  //     </MemoryRouter>
  //   );

  //   const component = wrapper.dive();
  //   component.dive().find(IconButton).last().simulate('click');

  //   console.log(fetch.mock.calls.length)
  //   setImmediate(() => {
  //     console.log(store.getActions());
  //     done();
  //   })
  // });



});