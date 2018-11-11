import React, { Component, Fragment } from 'react';


import VoteControl from '../../VoteControl';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';

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

class Content extends Component {

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