import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchPostById } from '../actions/posts';

class PostDetail extends Component {

  componentDidMount(){
    const { dispatch, id } = this.props;
    dispatch(fetchPostById(id))
  }

  render() {
    const { post } = this.props;
    return (
      <div>
        {post && 
          <div>{post.title}</div>
        }
      </div>
    )
  }
}

function mapStateToProps({ posts }, {id}) {
  return {
    post: posts[id]
  }
}

export default connect(mapStateToProps)(PostDetail)