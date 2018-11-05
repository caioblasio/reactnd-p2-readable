import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { getFormatedDate } from '../../../utils/date';

import Content from './Content';
import Edit from './Edit';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

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


class Comment extends Component {

  state = {
    edit: false
  }

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
        <Typography variant="body1" color="secondary" className={classes.contentItem}>
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