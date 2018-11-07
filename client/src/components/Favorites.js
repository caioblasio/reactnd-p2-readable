import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import PostList from './PostList';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import { getValue } from '../utils/locaStorage';

const styles = theme => ({
  button: {
    position: 'fixed',
    bottom: theme.spacing.unit * 3,
    right: theme.spacing.unit * 3,
  }
});

const Favorites = props => {

  const { classes } = props;

  return (
    <Fragment>
      <PostList includeOnlyIds={getValue('favorites', true)} headline="Favorites" />
      <Link to="/new">
        <Button variant="fab" color="primary" aria-label="Add" className={classes.button}>
          <AddIcon />
        </Button>
      </Link>
    </Fragment>
  )
  
}

export default withStyles(styles)(Favorites)