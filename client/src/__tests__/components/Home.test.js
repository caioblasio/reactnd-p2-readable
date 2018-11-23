import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Home from '../../components/Home';


describe('<Home />', () => {

    test('renders the component', () => {
      const wrapper = shallow(<Home />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });

});