import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Form from './Form';
import Typography from '@material-ui/core/Typography';

import { addComment } from '../../actions/comments';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 2,
  },
});

class NewComment extends Component {

  handleSubmit = (comment) => {
    const { addComment, parentId } = this.props;
    comment.parentId = parentId;
    addComment(comment);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Typography variant="body2">
          <strong>New Comment</strong>
        </Typography>
        <Form 
          onSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addComment: (comment) => {
      dispatch(addComment(comment))
    }
  }
}

export default withStyles(styles)(connect(null, mapDispatchToProps)(NewComment));