import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { getFormatedDate } from '../utils/date';
import { fetchPostById } from '../actions/posts';
import { withStyles } from '@material-ui/core/styles';

import Form from './Form';
import CommentList from './CommentList';
import NewComment from './NewComment';
import PostList from './PostList';
import VoteControl from './VoteControl';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  post: {
    width: '70%',
  },
  detail: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
  side: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: '30%',
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
  action: {
    display: 'flex',
    alignItems: 'center',
  }
});

class PostDetail extends Component {

  componentDidMount(){
    const { dispatch, id } = this.props;
    dispatch(fetchPostById(id))
  }


  render() {
    const { post, classes } = this.props;
    
    return (
      <Fragment>
        {post &&
          <div className={classes.root}>
            <div className={classes.post}>
              <Paper className={classes.detail} elevation={1}>
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
                <div className={classes.action}>
                  <VoteControl
                    type="post"
                    voteScore={post.voteScore}
                    id={post.id}
                  />
                </div>
              </Paper>
              <Paper className={classes.detail} elevation={1}>
                <CommentList postId={post.id}/>
              </Paper>
              <Paper className={classes.detail} elevation={1}>
                <NewComment parentId={post.id} />
              </Paper>
            </div>
            
            {/* <div className={classes.side}>
              <Typography variant="body1" color="secondary" className={classes.body}>
                Related Posts
              </Typography>
              <PostList
                category={post.category}
                excludeId={post.id}
              />
            </div> */}
         </div>
        }
      </Fragment>
      
    )
  }
}

function mapStateToProps({ posts }, {id}) {
  return {
    post: posts[id]
  }
}

export default withStyles(styles)(connect(mapStateToProps)(PostDetail))