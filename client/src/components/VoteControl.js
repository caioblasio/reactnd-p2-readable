import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { addVoteToPost } from '../actions/posts';
import { addVoteToComment } from '../actions/comments';
import { checkValue, saveValue } from '../utils/locaStorage';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';

/**
 * @description Vote Control component for a post or comment. Uses local storage to manage the votes
 * @param {string} id
 * @param {string} type
 * @param {number} voteScore
 * @param {function()} addVoteToPost
 * @param {function()} addVoteToComment
*/
class VoteControl extends Component {

  static propType = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string,
    voteScore: PropTypes.number.isRequired,
    addVoteToPost: PropTypes.func.isRequired,
    addVoteToComment: PropTypes.func.isRequired
  };

  state = {
    currentVote: checkValue('votes', this.props.id)
  }

  score = this.props.voteScore;

  /**
   * @description Calls cancel and/or apply vote according to current vote and the newVote provided
   * @param {string} newVote
  */
  handleVote = newVote => {
    const { currentVote } = this.state;
    if (currentVote && currentVote === newVote) {
      this.cancel(newVote)
    } else if (currentVote) {
      this.cancel(currentVote)
      this.apply(newVote)
    } else {
      this.apply(newVote)
    }
  }

  /**
   * @description Cancel a vote correctly according to the current vote
   * @param {string} vote
  */
  cancel = vote => {
    if (vote === 'upVote') {
      this.handleDispatchVote('downVote')
    } else if (vote === 'downVote') {
      this.handleDispatchVote('upVote')
    }

    this.setState({ currentVote: null })
    saveValue('votes', this.props.id, null)
  }

  /**
   * @description Apply a vote
   * @param {string} vote
  */
  apply = vote => {
    saveValue('votes', this.props.id, vote)
    this.handleDispatchVote(vote)
    this.setState({ currentVote: vote })
  }


  /**
   * @description Dispatch vote action to a post or component as appropriate
   * @param {string} vote
  */
  handleDispatchVote = vote => {
    const { id, addVoteToPost, addVoteToComment, type } = this.props;
    vote === 'upVote' ? this.score++ : this.score--;
    const changes = { voteScore: this.score }

    type === 'post'
      ? addVoteToPost(id, changes, vote)
      : addVoteToComment(id, changes, vote)
    
  }

  render() {
    const { currentVote } = this.state,
      { voteScore } = this.props;

    return (
      <Fragment>
        <IconButton 
          aria-label="Like"
          onClick={() => this.handleVote('upVote')}
          color={currentVote === 'upVote'? 'secondary' : 'default'}
        >
          <ThumbUp />
        </IconButton>
        <Typography component="p">
          {voteScore}
        </Typography>
        <IconButton 
          aria-label="Dislike"
          onClick={() => this.handleVote('downVote')}
          color={currentVote === 'downVote'? 'secondary' : 'default'}
        >
          <ThumbDown />
        </IconButton>
      </Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addVoteToPost: (id, changes, vote) => {
      dispatch(addVoteToPost(id, changes, vote))
    },
    addVoteToComment: (id, changes, vote) => {
      dispatch(addVoteToComment(id, changes, vote))
    },
  }
}

export default connect(null, mapDispatchToProps)(VoteControl);