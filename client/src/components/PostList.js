import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Post from './Post';

import sortList from '../utils/sort';
import { fetchPosts, fetchPostsByCategory } from '../actions/posts';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  list: {
    display: 'flex',
    flexWrap: 'wrap',

  },
  loading: {
    marginTop: theme.spacing.unit * 4,
    textAlign: 'center',
  }
});

class PostList extends Component {

  componentDidMount(){
    const { category, dispatch } = this.props;
    if(category){
      dispatch(fetchPostsByCategory(category));
    } else {
      dispatch(fetchPosts());
    }
  }

  componentDidUpdate(prevProps){
    const { category } = this.props
    const prevCategory = prevProps.category

    if (prevCategory !== category) {
      this.props.dispatch(fetchPostsByCategory(category));
    }
  }
  
  render() {
    const { postsIds, isLoading, classes } = this.props
    console.log('sorted', postsIds)
    return (
      <Fragment>
      {!isLoading && 
      <div className={classes.list}>
        {postsIds.map(postId => (
          <Post key={postId} id={postId} />
        ))}
      </div>}
      {isLoading && 
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      }
      </Fragment>
    )
  }
}

function mapStateToProps({ posts, loading, sort }, { category, excludeId }) {
  
  const sortedPosts = sortList(Object.keys(posts).map(key => posts[key]), sort)
    .reduce((acc, post) => ({ ...acc, [post.id]: post}), {});

  const postIdsArray = !excludeId
    ? Object.keys(sortedPosts) 
    : Object.keys(sortedPosts).filter(postId => postId !== excludeId)

  return {
    postsIds: category
      ? postIdsArray.filter(id => (
          posts[id].category === category
        ))
      : postIdsArray,
      isLoading: loading,
  }
}

export default withStyles(styles)(connect(mapStateToProps)(PostList))