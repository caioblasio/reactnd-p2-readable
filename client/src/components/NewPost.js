import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import uuidv1 from 'uuid/v1';
import Form from './Form';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { addPost, editPost, fetchPostById } from '../actions/posts';


const styles = theme => ({
  root: {
    width: '800px',
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

class NewPost extends Component {

  state = {
    path: ''
  }

  componentDidMount() {
    const { dispatch, postId } = this.props;
    if(postId)
      dispatch(fetchPostById(postId))
  }

  handleSubmit = (values) => {
    const { dispatch, postId } = this.props;

    if (values.title && values.body && values.author && values.category) {

      const post = {
        id: postId || uuidv1(),
        timestamp: Date.now(),
        title: values.title,
        body: values.body,
        author: values.author,
        category: values.category,
      }
  
      if(postId){
        dispatch(editPost(postId, post));
      } else {
        dispatch(addPost(post));
      }
      
      this.setState({
        path: `/${post.category}/${post.id}`
      })
    }
    
  }

  render() {
    const { classes, categories, post } = this.props;

    if(this.state.path){
      return <Redirect to={this.state.path} />
    }

    return (
      <Paper className={classes.root} elevation={1}>
        {!post &&
          <Fragment>
            <Typography variant="h6" className={classes.header}>
            New Post
            </Typography>
            <div className={classes.content}>
              <Form
                onSubmit={this.handleSubmit}
                title
                body
                author
                categories={categories}
              />
            </div>
          </Fragment>
        }
        {post &&
          <Fragment>
            <Typography variant="h6" className={classes.header}>
              Edit Post
            </Typography>
            <div className={classes.content}>
              <Form
                onSubmit={this.handleSubmit}
                defaultTitle={post.title}
                title
                defaultBody={post.body}
                body
                defaultAuthor={post.author}
                author
                defaultCategory={post.category}
                categories={categories}
              />
            </div>
          </Fragment>
        }
      </Paper>
    )
  }
}

function mapStateToProps({ categories, posts }, { postId }){
  return {
    categories,
    post: posts[postId]
  }
}

export default withStyles(styles)(connect(mapStateToProps)(NewPost));