import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { fetchComments, editComment, removeComment } from '../../actions/comments';
import Comment from './Comment';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 2,
  }
});


/**
 * @description List of comments for a specific post
 * @param {string} postId
 * @param {function()} fetchComments
 * @param {function()} removeComment
 * @param {function()} editComment
 * @param {object} classes
*/
class CommentList extends Component {

  static propType = {
    postId: PropTypes.string.isRequired,
    fetchComments: PropTypes.func.isRequired,
    removeComment: PropTypes.func.isRequired,
    editComment: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
  };

  /**
   * @description Fetches list of comments for the post
  */
  componentDidMount() {
    const { fetchComments, postId } = this.props;
    fetchComments(postId);
  }

  render() {
    const { classes, comments, removeComment, editComment } = this.props;
    return (
      <div className={classes.root}>
        
        <Typography variant="body2" color="default">
          <strong>{ comments.length > 0 ? `${comments.length} comment(s)` : `No comments` }</strong>
        </Typography>
        {comments.map(comment => (
          <Comment
            key={comment.id}
            comment={comment}
            onRemoveComment={removeComment}
            onEditComment={editComment}
          />
        ))}
      </div>
    )
  }
}

const mapStateToProps =  ({ comments }) => ({ comments })

const mapDispatchToProps = dispatch => {
  return {
    fetchComments: (postId) => {
      dispatch(fetchComments(postId))
    },
    removeComment: (commentId) => {
      dispatch(removeComment(commentId))
    },
    editComment: (commentId, changes)  => {
      dispatch(editComment(commentId, changes))
    }
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CommentList))