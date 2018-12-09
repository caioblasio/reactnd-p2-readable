import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import VoteControl from '../../VoteControl';

const styles = theme => ({
  contentItem: {
    marginTop: theme.spacing.unit * 2,
  },
  action: {
    display: 'flex',
    marginTop: theme.spacing.unit * 2,
  },
  vote: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
  },
});

/**
 * @description Single Comment
 * @param {obejct} comment
 * @param {function()} toggleEdit
 * @param {function()} onRemoveComment
 * @param {object} classes
*/
class Content extends Component {

  static propType = {
    comment: PropTypes.object.isRequired,
    onRemoveComment: PropTypes.func.isRequired,
    toggleEdit: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
  };

  /**
   * @description Handles deletion of a coment
  */
  handleDelete = () => {
    const { onRemoveComment, comment: { id, author } } = this.props;
    const alertConfirmation = window.confirm(
      `Are you sure you want to delete ${author}'s comment?`
    )

    if (alertConfirmation){
      onRemoveComment(id)
    }
  }

  render() {
    const { classes, comment: { id, body, voteScore }, toggleEdit } = this.props;

    return (
      <Fragment>
        <Typography variant="body1" color="default" className={classes.contentItem}>
          {body}
        </Typography>
        <div className={classes.action}>
          <div className={classes.vote}>
            <VoteControl
              type="comment"
              voteScore={voteScore}
              id={id}
            />
          </div>
          <div>
            <IconButton 
              aria-label="Like"
              onClick={() => {toggleEdit(true)}}
            >
              <Edit />
            </IconButton>
            <IconButton 
              aria-label="Like"
              onClick={this.handleDelete}
            >
              <Delete />
            </IconButton>
          </div>
        </div>
        <Divider/>
      </Fragment>
    )
  }
}

export default withStyles(styles)(Content)