import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Divider from '@material-ui/core/Divider';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SortIcon from '@material-ui/icons/Sort';

const styles = theme => ({
  root: {
    display: 'flex',
    paddingBottom: theme.spacing.unit,
  },
  title: {
    flexGrow: 1,
  },
  header: {
    color: theme.palette.text.secondary,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
});

class Headline extends Component {

  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };


  render() {
    const { anchorEl } = this.state,
     { title, onSort, sortOption, classes } = this.props;

    return (
        <Fragment>
          <div className={classes.root}>
            <div className={classes.title}>
              <Typography variant="h5" className={classes.header}>
                {title}
              </Typography>
            </div>
            <div>
            <Button 
              variant="contained" 
              size="small" 
              className={classes.button}
              aria-owns={anchorEl ? 'simple-menu' : undefined}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              <SortIcon className={classes.leftIcon} />
              {`Sorted by ${sortOption}`}
            </Button>
            <Menu
              id="sort-options"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
            >
              <MenuItem
                selected={sortOption === 'score'}
                onClick={() => {onSort('score'); this.handleClose()}}
              >
                Vote Score
              </MenuItem>
              <MenuItem 
                selected={sortOption === 'date'}
                onClick={() => {onSort('date'); this.handleClose();}}
              >
                Date
              </MenuItem>
            </Menu>
            </div>
          </div>
          <Divider/>
        </Fragment>
    )
  }
}

export default withStyles(styles)(Headline)