import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Post from './Post';

const styles = theme => ({
  list: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});

class PostList extends Component {
  render() {
    const { postsIds, classes } = this.props

    return (
      <div className={classes.list}>
        {postsIds.map(postId => (
          <Post key={postId} id={postId} />
        ))}
      </div>
    )
  }
}

function mapStateToProps({ posts }, { category }) {
  const postIdsArray = Object.keys(posts);

  return {
    postsIds: category
      ? postIdsArray.filter(id => (
          posts[id].category === category
        ))
      : postIdsArray
  }
}

export default withStyles(styles)(connect(mapStateToProps)(PostList))