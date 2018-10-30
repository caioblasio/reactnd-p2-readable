import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getFormatedDate } from '../utils/date';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import Comment from '@material-ui/icons/Comment';
import Divider from '@material-ui/core/Divider';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { addVoteToPost } from '../actions/posts';

import VoteControl from './VoteControl';

const styles = theme => ({
  card: {
    width: '100%',
    maxWidth: 380,
    margin: theme.spacing.unit * 2,
    display: 'flex',
    flexDirection: 'column',
  },
  link: {
    ...theme.link
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
  },
  actionIcon: {
    display: 'flex',
    alignItems: 'center',
  },
  footer: {
    marginTop: 'auto',
  }
});



class Post extends Component {

  state = {
    anchorEl: null,
  };

  handleMenuClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { post, classes } = this.props
    const { author, category, body, commentCount, id, timestamp, title, voteScore } = post
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <Card className={classes.card}>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleMenuClose}
        >
          <MenuItem onClick={this.handleMenuClose}>
            Edit
          </MenuItem>
          <MenuItem onClick={this.handleMenuClose}>
            Remove
          </MenuItem>
        </Menu>
        <Link to={`/${category}/${id}`} className={classes.link}>
          <CardHeader
            action={
              <IconButton
                aria-label="More"
                aria-owns={open ? 'long-menu' : null}
                aria-haspopup="true"
                onClick={this.handleMenuClick}
              >
              <MoreVertIcon />
            </IconButton>
            }
            title={title}
            subheader={`by ${author} ${getFormatedDate(timestamp)}`}
          />
          <CardContent>
            <Typography component="p">
              {`${body.substring(0,160)}...`}
            </Typography>
          </CardContent>
        </Link>
        <div className={classes.footer}>
          <Divider />
          <CardActions className={classes.actions} disableActionSpacing>
            <div className={classes.actionIcon} style={{flexGrow: 1}}>
              <VoteControl
                type="post"
                voteScore={voteScore}
                id={id}
              />
            </div>
            <div className={classes.actionIcon} >
              <IconButton
                aria-label="Comments"
              >
                <Comment />
              </IconButton>
              <Typography component="p">
                {commentCount}
              </Typography>
            </div>
          </CardActions>
        </div>
      </Card>
    )
  }
}

function mapStateToProps({ posts }, { id }) {
  const post = posts[id]
  return {
    post: post
  }
}

export default withStyles(styles)(connect(mapStateToProps)(Post))