import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { testPosts } from '../../__mocks__/mockData';
import FavoriteControl from '../../components/FavoriteControl';
import IconButton from '@material-ui/core/IconButton';

describe('<FavoriteControl />', () => {

  const testPost = testPosts[Object.keys(testPosts)[0]];

    it('channges status when clicked', () => {
      const wrapper = shallow(
        <FavoriteControl 
          id={testPost.id}
        />
      );
      
      wrapper.find(IconButton).simulate('click');
      expect(wrapper.state().currentFavorite).toEqual(true)
  
    });

});