import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Form from './Form';
import Typography from '@material-ui/core/Typography';
import { addComment } from '../../actions/comments';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 2,
  },
});

/**
 * @description Component for adding a component in a post detail page
 * @param {string} parentId
 * @param {function()} addComment
 * @param {object} classes
*/
class NewComment extends Component {

  static propType = {
    parentId: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
  };

  /**
   * @description Handles addition of a coment
   * @param {object} comment
  */
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