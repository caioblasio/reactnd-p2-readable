import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchComments } from '../actions/comments';
import { withStyles } from '@material-ui/core/styles';
import Comment from './Comment';

import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 2,
  }
});


class CommentList extends Component {

  componentDidMount() {
    const { dispatch, postId } = this.props;
    dispatch(fetchComments(postId))
  }

  render() {
    const { classes, comments } = this.props;
    return (
      <div className={classes.root}>
        
        <Typography variant="body2" color="secondary">
          <strong>{ comments.length > 0 ? `${comments.length} comment(s)` : `No comments` }</strong>
        </Typography>
        {comments.map(comment => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>
    )
  }
}

function mapStateToProps ({ comments }) {
  return {
    comments
  }
}

export default withStyles(styles)(connect(mapStateToProps)(CommentList))