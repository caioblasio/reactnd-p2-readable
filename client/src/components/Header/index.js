import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { openDrawer, closeDrawer } from '../../actions/drawer';
import { changeSearch } from '../../actions/search';
import { fetchCategories } from '../../actions/categories';
import SearchAppBar from './SearchAppBar';
import ResponsiveDrawer from './Drawer';
import { isMobile } from 'react-device-detect';

/**
 * @description Component for adding a component in a post detail page
 * @param {bool} isOpen
 * @param {array} categories
 * @param {function()} openDrawer
 * @param {function()} closeDrawer
 * @param {function()} changeSearch
 * @param {function()} getCategories
 * @param {object} history
*/
class Header extends Component {

  static propType = {
    isOpen: PropTypes.bool.isRequired,
    categories: PropTypes.array.isRequired,
    openDrawer: PropTypes.func.isRequired,
    closeDrawer: PropTypes.func.isRequired,
    changeSearch: PropTypes.func.isRequired,
    getCategories: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  };

  /**
   * @description Get categories to display
  */
  componentDidMount(){
    this.props.getCategories();
  }

  /**
   * @description Closes drawer when there is a page change in mobile
   * @param {object} history
   * @param {bool} isOpen
   * @param {function()} closeDrawer
  */
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
    },
    getCategories: () => {
      dispatch(fetchCategories())
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));