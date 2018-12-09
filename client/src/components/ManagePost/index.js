import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Form from './Form';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { addPost, editPost, fetchPostById } from '../../actions/posts';


const styles = theme => ({
  root: {
    [theme.breakpoints.up('md')]: {
      width: '70%',
      margin: '0 auto',
    },
    padding: 0,
  },
  header: {
    padding: theme.spacing.unit * 2,
    background: theme.palette.background.default,
    color: theme.palette.text.secondary,
  },
  content: {
    ...theme.mixins.gutters(),
    padding: theme.spacing.unit * 2,
    
  }
});

/**
 * @description Component for adding a new post or edit an existing post
 * @param {object} post
 * @param {string} postId
 * @param {string} edit
 * @param {object[]} categories
 * @param {function()} fetchPostById
 * @param {function()} editPost
 * @param {function()} addPost
 * @param {object} classes
*/
class ManagePost extends Component {

  static propType = {
    post: PropTypes.object,
    postId: PropTypes.string,
    edit: PropTypes.bool,
    categories: PropTypes.array.isRequired,
    fetchPostById: PropTypes.func.isRequired,
    editPost: PropTypes.func.isRequired,
    addPost: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
  };

  state = {
    path: ''
  }

  /**
   * @description Fetches a new post when appropriate for post edit
  */
  componentDidMount() {
    const { fetchPostById, postId } = this.props;

    if(postId)
      fetchPostById(postId)
  }

   /**
   * @description Handles form submit and dispatches add post or edit post when appropriate. Then, redirect user to post's page
   * @param {object} post
  */
  handleSubmit = (post) => {
    const { editPost, addPost, edit } = this.props;
  
    if(edit){
      editPost(post.id, post);
    } else {
      addPost(post);
    }
      
    this.setState({
      path: `/${post.category}/${post.id}`
    })
    
  }

  render() {
    const { classes, categories, post, edit } = this.props;

    if(this.state.path){
      return <Redirect to={this.state.path} />
    }

    return (
      <Paper className={classes.root} elevation={1}>
          <Fragment>
            <Typography variant="h6" className={classes.header}>
              {edit ? 'Edit Post' : 'New Post'}
            </Typography>
            <div className={classes.content}>
              <Form
                onSubmit={this.handleSubmit}
                categories={categories}
                post={post}
              />
            </div>
          </Fragment>
      </Paper>
    )
  }
}

const mapStateToProps = ({ categories, posts }, { postId }) => ({ categories, post: posts[postId] })

const mapDispatchToProps = dispatch => {
  return {
    fetchPostById: (id) => {
      dispatch(fetchPostById(id))
    },
    editPost: (id, post) => {
      dispatch(editPost(id, post))
    },
    addPost: (post) => {
      dispatch(addPost(post))
    }
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ManagePost));