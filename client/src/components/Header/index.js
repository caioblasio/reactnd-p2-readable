import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { openDrawer, closeDrawer } from '../../actions/drawer';
import { changeSearch } from '../../actions/search';

import SearchAppBar from './SearchAppBar';
import ResponsiveDrawer from './Drawer';

import { isMobile } from 'react-device-detect';

class Header extends Component {

  componentWillReceiveProps({ history, isOpen, closeDrawer }) {   
    history.listen(() => {
      if(isMobile && isOpen)
        closeDrawer();
    });
  }

  render(){
    const { isOpen, categories, openDrawer, closeDrawer, changeSearch } = this.props;
    return (
      <Fragment>
        <SearchAppBar
          changeSearch={changeSearch}
          openDrawer={openDrawer}
          closeDrawer={closeDrawer}
          isOpen={isOpen}
        />
        <ResponsiveDrawer 
          isOpen={isOpen}
          categories={categories}
          openDrawer={openDrawer}
          closeDrawer={closeDrawer}
        />
      </Fragment>
    )
  }
}

const mapStateToProps = ({ drawer, categories }) => ({ isOpen: drawer, categories })
  
const mapDispatchToProps = dispatch => {
  return {
    openDrawer: () => {
      dispatch(openDrawer())
    },
    closeDrawer: () => {
      dispatch(closeDrawer())
    },
    changeSearch: (query) => {
      dispatch(changeSearch(query))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));