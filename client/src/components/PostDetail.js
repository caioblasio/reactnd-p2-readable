import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getFormatedDate } from '../utils/date';
import { fetchPostById } from '../actions/posts';
import { withStyles } from '@material-ui/core/styles';

import CommentList from './CommentList';
import NewComment from './NewComment';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: '70%',
  },
  headline: {
    marginTop: theme.spacing.unit,
  },
  headlineItems: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  body: {
    marginTop: theme.spacing.unit * 6,
  },
  divider: {
    marginTop: theme.spacing.unit * 6,
  },
});

class PostDetail extends Component {

  componentDidMount(){
    const { dispatch, id } = this.props;
    dispatch(fetchPostById(id))
  }

  render() {
    const { post, classes } = this.props;
  
    return (
      <div>
        {post && 
          <Paper className={classes.root} elevation={1}>
            <Typography variant="h5" color="secondary">
              {post.title}
            </Typography>
            <Typography variant="body1" color="secondary" className={classes.headline}>
              by <strong>{post.author}</strong><span className={classes.headlineItems}>{getFormatedDate(post.timestamp)}</span><strong>{post.category}</strong>
            </Typography>
            <Typography variant="body1" color="secondary" className={classes.body}>
              {post.body}
            </Typography>
            <Divider className={classes.divider} />
            <CommentList postId={post.id}/>
            <NewComment parentId={post.id} />
          </Paper>
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

export default withStyles(styles)(connect(mapStateToProps)(PostDetail))