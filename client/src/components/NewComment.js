import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import uuidv1 from 'uuid/v1';
import Form from './Form';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { addComment } from '../actions/comments';

const styles = theme => ({
  
});

class NewComment extends Component {


  handleSubmit = (e, values) => {
    e.preventDefault();
    const { dispatch, parentId } = this.props;

    if (values.body && values.author) {

      const comment = {
        id: uuidv1(),
        timestamp: Date.now(),
        body: values.body,
        author: values.author,
        parentId
      }
  
      dispatch(addComment(comment));

      e.target.reset();
      
    }
    
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Typography variant="h6">
          New Comment
        </Typography>
        <div className={classes.content}>
          <Form
            onSubmit={this.handleSubmit}
            body
            author
          />
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(connect()(NewComment));