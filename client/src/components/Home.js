import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import PostList from './PostList'
import Typography from '@material-ui/core/Typography';

class Home extends Component {

  getCategory = nextCategory =>
    this.props.categories.find(category => category.path === nextCategory)

  render() {
    const category = this.getCategory(this.props.category)

    return (
      <Fragment>
        {this.props.category
          ? (category 
              ? <Fragment>
                  <Typography variant="h3">
                    {category.name}
                  </Typography>
                  <PostList category={category.path} />
                </Fragment>
              : <Typography variant="h3">
                  Category not found
                </Typography>
            )
          : <Fragment>
              <Typography variant="h3">
                All Posts
              </Typography>
              <PostList/>
            </Fragment>
        }
      </Fragment>
    )
  }
  
}

const mapStateToProps = ({ categories }) => ({ categories })

export default connect(mapStateToProps)(Home)