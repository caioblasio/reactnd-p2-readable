import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import PostList from './PostList'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
  button: {
    position: 'fixed',
    bottom: theme.spacing.unit * 3,
    right: theme.spacing.unit * 3,
  }
});

class Category extends Component {

  getCategory = nextCategory =>
    this.props.categories.find(category => category.path === nextCategory)

  render() {
    const { classes } = this.props;
    const category = this.getCategory(this.props.category)
    return (
      <Fragment>
        {category
          ? <Fragment>
              <Typography variant="h5">
                {category.name}
              </Typography>
              <PostList category={category.path} />
            </Fragment>
          : <Typography variant="h5">
              Category not found
            </Typography>
        }
        <Link to="/new">
          <Button variant="fab" color="primary" aria-label="Add" className={classes.button}>
            <AddIcon />
          </Button>
        </Link>
      </Fragment>
    )
  }
  
}

const mapStateToProps = ({ categories }) => ({ categories })

export default withStyles(styles)(connect(mapStateToProps)(Category))