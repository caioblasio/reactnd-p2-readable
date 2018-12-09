import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { getFormatedDate } from '../../../utils/date';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Content from './Content';
import Edit from './Edit';


const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  headlineItems: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

/**
 * @description Single Comment
 * @param {obejct} comment
 * @param {function()} onRemoveComment
 * @param {function()} onEditComment
 * @param {object} classes
*/
class Comment extends Component {

  static propType = {
    comment: PropTypes.object.isRequired,
    onRemoveComment: PropTypes.func.isRequired,
    onEditComment: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
  };

  state = {
    edit: false
  }

  /**
   * @description handle click on edit icon and changes component to edit mode
   * @param {bool} edit
  */
  handeToggleEdit = (edit) => {
    this.setState({
      edit
    })
  }

  render() {
    const { classes , comment,  comment: { author, timestamp }, onEditComment, onRemoveComment } = this.props,
      { edit } = this.state;
      
    return(
      <div className={classes.root}>
        <Typography variant="body1" color="default" className={classes.contentItem}>
          by <strong>{author}</strong><span className={classes.headlineItems}>{getFormatedDate(timestamp)}</span>
        </Typography>
        {edit 
          ? <Edit comment={comment} onEditComment={onEditComment} toggleEdit={this.handeToggleEdit} />
          : <Content comment={comment} onRemoveComment={onRemoveComment} toggleEdit={this.handeToggleEdit} />
        }
        <Divider/>
      </div>
    )    
  }
}

export default withStyles(styles)(Comment);