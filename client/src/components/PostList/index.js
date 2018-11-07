import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Post from './Post';
import Headline from './Headline';
import sortList from '../../utils/sort';
import { changeSort } from '../../actions/sort';
import { fetchPosts, fetchPostsByCategory, removePost } from '../../actions/posts';

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
    const { category, fetchPosts, fetchPostsByCategory } = this.props;

    if(category){
      fetchPostsByCategory(category);
    } else {
      fetchPosts();
    }
  }

  componentDidUpdate(prevProps){
    const { category, fetchPostsByCategory } = this.props
    const prevCategory = prevProps.category

    if (prevCategory !== category) {
      fetchPostsByCategory(category);
    }
  }
  
  render() {
    const { posts, deletePost, handleSort, sort, headline, classes } = this.props

    return (
      <Fragment>
        <Headline title={headline} onSort={handleSort} sortOption={sort}/>
        <div className={classes.list}>
          {posts.map(post => (
            <Post key={post.id} post={post} onDelete={deletePost}/>
          ))}
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = ({ posts, sort }, { category, excludeId, includeOnlyIds }) => {
  
  let sortedPosts = sortList(Object.keys(posts).map(key => posts[key]), sort);

  if(category){
    sortedPosts = sortedPosts.filter(post => post.category === category)
  }

  if(excludeId){
    sortedPosts = sortedPosts.filter(post => post.id !== excludeId)
  }

  if(includeOnlyIds){
    sortedPosts = sortedPosts.filter(post => includeOnlyIds.includes(post.id))
  }

  return {
    posts: sortedPosts,
    sort
  }
}


const mapDispatchToProps = dispatch => {
  return {
    fetchPosts: () => {
      dispatch(fetchPosts())
    },
    fetchPostsByCategory: (category) => {
      dispatch(fetchPostsByCategory(category))
    },
    deletePost: (id) => {
      dispatch(removePost(id))
    },
    handleSort: (value) => {
      dispatch(changeSort(value))
    }
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(PostList))