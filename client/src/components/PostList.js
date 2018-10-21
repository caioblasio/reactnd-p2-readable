import React, { Component } from 'react';
import { connect } from 'react-redux';

class PostList extends Component {
  render() {
    const { posts } = this.props

    return (
      <div>
        {posts.map(post => (
          <div key={post.id}>{post.title}</div>
        ))}
      </div>
    )
  }
}

function mapStateToProps({ posts }, { category }) {

  const postsArray = Object.keys(posts).map(key => posts[key])

  return {
    posts: category 
      ? postsArray.filter(post => post.category === category)
      : postsArray
  }
}

export default connect(mapStateToProps)(PostList)