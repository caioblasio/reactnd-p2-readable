import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import uuidv1 from 'uuid/v1';
import Form from './Form';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { addPost } from '../actions/posts';

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
    toHome: false
  }

  handleSubmit = (e, values) => {
    e.preventDefault();
    const { dispatch } = this.props;

    if (values.title && values.body && values.author && values.category) {

      const post = {
        id: uuidv1(),
        timestamp: Date.now(),
        title: values.title,
        body: values.body,
        author: values.author,
        category: values.category,
      }
  
      dispatch(addPost(post));
      
      this.setState({
        toHome: true
      })
    }
    
  }

  render() {
    const { classes, categories } = this.props;

    if(this.state.toHome){
      return <Redirect to="/" />
    }

    return (
      <Paper className={classes.root} elevation={1}>
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
      </Paper>
    )
  }
}

function mapStateToProps({ categories }){
  return {
    categories
  }
}

export default withStyles(styles)(connect(mapStateToProps)(NewPost));