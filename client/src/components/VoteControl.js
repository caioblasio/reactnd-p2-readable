import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import { addVoteToPost } from '../actions/posts';
import { addVoteToComment } from '../actions/comments';

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';

const styles = theme => ({
  
});

class VoteControl extends Component {


  handleVote = vote => {
    const { id, dispatch, type, voteScore } = this.props;

    let score = voteScore; //props are readOnly
    vote === 'upVote' ? score++ : score--;
    const changes = { voteScore: score }

    dispatch(
      type === 'post'
        ? addVoteToPost(id, changes, vote)
        : addVoteToComment(id, changes, vote)
    )
  }

  render() {
    const { classes, voteScore } = this.props;
    return (
      <Fragment>
        <IconButton 
          aria-label="Like"
          onClick={() => this.handleVote('upVote')}
        >
          <ThumbUp />
        </IconButton>
        <Typography component="p">
          {voteScore}
        </Typography>
        <IconButton 
          aria-label="Dislike"
          onClick={() => this.handleVote('downVote')}
        >
          <ThumbDown />
        </IconButton>
      </Fragment>
    )
  }
}

export default withStyles(styles)(connect()(VoteControl))