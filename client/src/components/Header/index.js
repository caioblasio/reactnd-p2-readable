import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { toggleDrawer } from '../../actions/drawer';
import { changeSort } from '../../actions/sort';

import SearchAppBar from './SearchAppBar';
import ResponsiveDrawer from './Drawer';

class Header extends Component {


  render(){
    const { isOpen, categories, sort, toggleDrawer, handleSort } = this.props;
    return (
      <Fragment>
        <SearchAppBar
          toggleDrawer={toggleDrawer}
        />
        <ResponsiveDrawer 
          isOpen={isOpen}
          categories={categories}
          sort={sort}
          toggleDrawer={toggleDrawer}
          handleSort={handleSort}
        />
      </Fragment>
    )
  }
}

const mapStateToProps = ({ drawer, categories }) => ({ isOpen: drawer, categories })
  

const mapDispatchToProps = dispatch => {
  return {
    toggleDrawer: () => {
      dispatch(toggleDrawer())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);