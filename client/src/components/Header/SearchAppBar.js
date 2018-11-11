import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const styles = theme => ({

  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  link: {
    ...theme.link,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 180,
      '&:focus': {
        width: 240,
      },
    },
  },
});



class SearchAppBar extends Component {

  state = {
    query: '',
    typingTimeout: 0
  };

  /**
  * @description Handles change at input field with debounce
  * @param {object} event
  */
  handleChange = (event) => {

    const { changeSearch } = this.props;
    const self = this;
    const query = event.target.value;

    if (self.state.typingTimeout) {
      clearTimeout(self.state.typingTimeout);
    }

    this.setState({
      query,
      typingTimeout: setTimeout(function () {
        changeSearch(query.toLowerCase());
      }, 500)
    });
  };

  render() {
    const { isOpen, openDrawer, closeDrawer, classes } = this.props;
    return (
      <Fragment>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton 
              className={classes.menuButton} 
              color="inherit" 
              aria-label="Open drawer"
              onClick={isOpen ? closeDrawer : openDrawer}
              >
              <MenuIcon />
            </IconButton>
            <Link to="/" className={classes.link}>
              <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                Readable
              </Typography>
            </Link>
            <div className={classes.grow} />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search for posts…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                value={this.state.query}
                onChange={this.handleChange}
              />
            </div>
          </Toolbar>
        </AppBar>
      </Fragment>
    );
  }
}

SearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect()(SearchAppBar));