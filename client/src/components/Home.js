import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PostList from './PostList';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
  button: {
    position: 'fixed',
    bottom: theme.spacing.unit * 3,
    right: theme.spacing.unit * 3,
  }
});

/**
 * @description Home component that renders post list from all categories
 * @param {object} classes
*/
const Home = props => {

  const { classes } = props;

  return (
    <Fragment>
      <PostList headline="All posts" />
      <Link to="/new">
        <Button variant="fab" color="primary" aria-label="Add" className={classes.button}>
          <AddIcon />
        </Button>
      </Link>
    </Fragment>
  )
  
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home)