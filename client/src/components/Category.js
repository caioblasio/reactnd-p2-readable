import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PostList from './PostList'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import NotFound from './NotFound';

const styles = theme => ({
  button: {
    position: 'fixed',
    bottom: theme.spacing.unit * 3,
    right: theme.spacing.unit * 3,
  }
});

/**
 * @description Category component that render a post list from an specific category
 * @param {string} category
 * @param {object} classes
*/
class Category extends Component {

  static propType = {
    category: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired
  };

  /**
   * @description Gets category name from list of avaiable categories
   * @param {string} nextCategory
  */
  getCategory = nextCategory =>
    this.props.categories.find(category => category.path === nextCategory)

  render() {
    const { classes } = this.props;
    const category = this.getCategory(this.props.category)
    return (
      <Fragment>
        {category
          ? <PostList headline={category.name} category={category.path} />
          : <NotFound/>
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