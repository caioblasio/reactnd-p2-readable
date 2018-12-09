import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getFormatedDate } from '../utils/date';
import { fetchPostById, removePost } from '../actions/posts';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CommentList from './CommentList';
import NewComment from './NewComment';
import PostList from './PostList';
import VoteControl from './VoteControl';
import NotFound from './NotFound';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';

const styles = theme => ({
  root: {
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      width: '100%',
    },
  },
  post: {
    flex: '0 1 70%',
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
    flex: '0 1 30%',
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
  },
  vote: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
  },
  link: {
    ...theme.link
  },
});

/**
 * @description Component that renders details of a post
 * @param {String} id
 * @param {Object} post
 * @param {Boolean} loading
 * @param {Object} history
 * @param {function()} fetchPostById
 * @param {function()} removePost
 * @param {Object} classes
*/
class PostDetail extends Component {

  static propType = {
    id: PropTypes.string.isRequired,
    post: PropTypes.Object,
    loading: PropTypes.bool,
    history: PropTypes.object.isRequired,
    fetchPostById: PropTypes.func.isRequired,
    removePost: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
  };

  /**
   * @description Fetches a post by the id provided as props
  */
  componentDidMount(){
    const { fetchPostById, id } = this.props;
    fetchPostById(id);
  }

  /**
   * @description Handles delete of a post and then redirect user to home page
  */
  handleDelete = () => {
    const { removePost, post, history } = this.props;
    const alertConfirmation = window.confirm(
      `Are you sure you want to delete the post ${post.title}?`
    )

    if (alertConfirmation){
      removePost(post.id)
        .then(() => { history.push('/') })
    }
  }

  render() {
    const { post, loading, classes } = this.props;

    if(!post && !loading){
      return <NotFound/>
    }
    
    return (
      <Fragment>
        {post &&
          <div className={classes.root}>
            <div className={classes.post}>
              <Paper className={classes.detail} elevation={1}>
                <Typography variant="h5" color="default">
                  {post.title}
                </Typography>
                <Typography variant="body1" color="default" className={classes.headline}>
                  by <strong>{post.author}</strong><span className={classes.headlineItems}>{getFormatedDate(post.timestamp)}</span><strong>{post.category}</strong>
                </Typography>
                <Typography variant="body1" color="default" className={classes.body}>
                  {post.body}
                </Typography>
                <Divider className={classes.divider} />
                <div className={classes.action}>
                  <div className={classes.vote}>
                    <VoteControl
                      type="post"
                      voteScore={post.voteScore}
                      id={post.id}
                    />
                  </div>
                  <div>
                    <IconButton 
                      aria-label="Like"
                      onClick={() => {}}
                    >
                      <Link to={`/edit/${post.id}`} className={classes.link}>
                        <Edit />
                      </Link>
                    </IconButton>
                    <IconButton 
                      aria-label="Like"
                      onClick={this.handleDelete}
                    >
                      <Delete />
                    </IconButton>
                  </div>
                </div>
              </Paper>
              <Paper className={classes.detail} elevation={1}>
                <CommentList postId={post.id}/>
              </Paper>
              <Paper className={classes.detail} elevation={1}>
                <NewComment parentId={post.id} />
              </Paper>
            </div>
            <div className={classes.side}>
              <PostList
                headline="Related Posts"
                side
                maxQty={4}
                category={post.category}
                excludeId={post.id}
              />
            </div>
         </div>
        }
      </Fragment>
    )
  }
}

const mapStateToProps = ({ posts, loading }, {id}) => ({post: posts[id], loading })

const mapDispatchToProps = dispatch => {
  return {
    fetchPostById: (id) => {
      dispatch(fetchPostById(id))
    },
    removePost: (id) => {
      return dispatch(removePost(id))
    }
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(PostDetail))