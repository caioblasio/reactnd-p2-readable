import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';

import Form from './Form';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { addPost, editPost, fetchPostById } from '../../actions/posts';


const styles = theme => ({
  root: {
    width: '70%',
    margin: '0 auto',
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

class ManagePost extends Component {

  state = {
    path: ''
  }

  componentDidMount() {
    const { fetchPostById, postId } = this.props;

    if(postId)
      fetchPostById(postId)
  }

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

const mapStateToProps = ({ categories, posts }, { postId }) => {
  return {
    categories,
    post: posts[postId]
  }
}

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