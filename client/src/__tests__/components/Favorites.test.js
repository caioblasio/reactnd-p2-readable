import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Favorites from '../../components/Favorites';


describe('<Favorites />', () => {

    it('renders the component', () => {
      const wrapper = shallow(<Favorites />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });

});