import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Post from './Post';

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
    const { category } = this.props;
    if(category){
      this.props.dispatch(fetchPostsByCategory(category));
    } else {
      this.props.dispatch(fetchPosts());
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

function mapStateToProps({ posts, loading }, { category }) {
  const postIdsArray = Object.keys(posts);

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