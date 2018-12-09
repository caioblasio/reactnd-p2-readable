import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
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
  center: {
    textAlign: 'center',
  }
});

/**
 * @description Headline component for a post list
 * @param {string} title
 * @param {bool} side
 * @param {function()} onSort
 * @param {string} sortOption
 * @param {object} classes
*/
class Headline extends Component {

  static propType = {
    title: PropTypes.string,
    side: PropTypes.bool,
    onSort: PropTypes.func.isRequired,
    sortOption: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired
  };

  state = {
    anchorEl: null,
  };

  /**
   * @description Handles click on sort select
   * @param {object} 
  */
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  /**
   * @description Handles close on sort select
  */
  handleClose = () => {
    this.setState({ anchorEl: null });
  };


  render() {
    const { anchorEl } = this.state,
     { title, onSort, sortOption, side, classes } = this.props;

    return (
        <Fragment>
          <div className={classes.root}>
            <div className={`${classes.title} ${side ? classes.center : ''}`}>
              <Typography variant="h5" className={classes.header}>
                {title}
              </Typography>
            </div>
            {!side &&
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
            }
          </div>
          {!side && <Divider/>}
        </Fragment>
    )
  }
}

export default withStyles(styles)(Headline)