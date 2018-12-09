import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Post from './Post';
import Headline from './Headline';
import sortList from '../../utils/sort';
import { changeSort } from '../../actions/sort';
import { fetchPosts, fetchPostsByCategory, removePost } from '../../actions/posts';
import PropTypes from 'prop-types';

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

/**
 * @description PostList component
 * @param {object[]} posts
 * @param {string} sort
 * @param {string} search
 * @param {string} category
 * @param {string} excludeId
 * @param {number} maxQty
 * @param {function()} fetchPosts
 * @param {function()} fetchPostsByCategory
 * @param {function()} deletePost
 * @param {function()} handleSort
 * @param {object} classes
*/
class PostList extends Component {

  static propType = {
    posts: PropTypes.object,
    sort: PropTypes.string,
    search: PropTypes.string,
    category: PropTypes.string,
    excludeId: PropTypes.string,
    maxQty: PropTypes.number,
    fetchPosts: PropTypes.func.isRequired,
    fetchPostsByCategory: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    handleSort: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
  };

  /**
   * @description Fetches all posts or posts by a category as appropriate
  */
  componentDidMount(){
    const { category, fetchPosts, fetchPostsByCategory } = this.props;

    if(category){
      fetchPostsByCategory(category);
    } else {
      fetchPosts();
    }
  }

  /**
   * @description Fetches posts when component is updated
   * @param {object} prevProps
  */
  componentDidUpdate(prevProps){
    const { category, fetchPostsByCategory } = this.props
    const prevCategory = prevProps.category

    if (prevCategory !== category) {
      fetchPostsByCategory(category);
    }
  }
  
  render() {
    const { posts, deletePost, handleSort, sort, headline, side, classes } = this.props;

    if(!posts.length && side){
      return <Headline title="No Related Posts" side={side} />
    }

    return (
      <Fragment>
        <Headline title={headline} onSort={handleSort} sortOption={sort} side={side} />
        <div className={classes.list}>
          {posts.map(post => (
            <Post key={post.id} post={post} onDelete={deletePost}/>
          ))}
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = ({ posts, sort, search }, { category, excludeId, includeOnlyIds, maxQty }) => {
  
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

  if(search){
    sortedPosts = sortedPosts.filter(post => 
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.author.toLowerCase().includes(search.toLowerCase()) || 
      post.category.toLowerCase().includes(search.toLowerCase())
    )
  }

  if (maxQty) {
    sortedPosts = sortedPosts.slice(0, maxQty)
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