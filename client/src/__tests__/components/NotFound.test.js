import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import NotFound from '../../components/NotFound';
import { MemoryRouter, Router } from 'react-router-dom';
import Button from '@material-ui/core/Button';


describe('<NotFound />', () => {

    it('renders the component', () => {
      const wrapper = shallow(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
      );
      const component = wrapper.dive();

      expect(toJson(component.dive())).toMatchSnapshot();
    });

    it('Click on Go To Home button', () => {

      const mounted = mount(
        <MemoryRouter initialEntries={['/notexist']}>
          <NotFound />
        </MemoryRouter>
      );

      mounted.find(Button).last().simulate('click');
      expect(mounted.find(Router).props('history').history.location.pathname).toBe('/')
      expect(mounted.find(Router).props('history').history.length).toBe(2);
    });

    it('Click on Back button', () => {

      const mounted = mount(
        <MemoryRouter initialEntries={['/', '/notexist']} initialIndex={1}>
          <NotFound />
        </MemoryRouter>
      );

      mounted.find(Button).first().simulate('click');
      expect(mounted.find(Router).props('history').history.location.pathname).toBe('/');

    });

});