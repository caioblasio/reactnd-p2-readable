import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { getFormatedDate } from '../utils/date';
import VoteControl from './VoteControl';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  headlineItems: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  contentItem: {
    marginTop: theme.spacing.unit * 2,
  },
  actionIcon: {
    display: 'flex',
    alignItems: 'center',
  },

});

class Comment extends Component {

  render() {
    const { classes, comment } = this.props;
    const { id, author, timestamp, body, voteScore } = comment
    return (
      <div className={classes.root}>
        <Typography variant="body1" color="secondary" className={classes.contentItem}>
          by <strong>{author}</strong><span className={classes.headlineItems}>{getFormatedDate(timestamp)}</span>
        </Typography>
        <Typography variant="body1" color="secondary" className={classes.contentItem}>
          {body}
        </Typography>
        <div className={classes.actionIcon} style={{flexGrow: 1}}>
          <VoteControl
            type="comment"
            voteScore={voteScore}
            id={id}
          />
        </div>
        <Divider/>
      </div>
    )
  }
}

export default withStyles(styles)(Comment)