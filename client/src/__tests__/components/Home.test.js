import React from 'react';
import toJson from 'enzyme-to-json';

import Home from '../../components/Home';


describe('<Home />', () => {

    it('renders the component', () => {
      const wrapper = shallow(<Home />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });

});