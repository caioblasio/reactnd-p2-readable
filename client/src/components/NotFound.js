import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  card: {
    width: '70%',
    margin: '0 auto',
  },
  link: {
    ...theme.link,
    outline: 0,
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
  },
});

/**
 * @description General Not Found component
 * @param {object} history
 * @param {object} classes
*/
class NotFound extends Component {

  static propType = {
    history: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
  };

  render() {

    const { classes, history } = this.props;
    return (
      <Card className={classes.card}>
          <CardHeader
            title="Page Not Found :("
          />
          <CardContent>
            <Typography component="p">
                Maybe the page you are looking for has been removed, or you typed in the wrong URL
            </Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <Button size="small" color="primary" onClick={() => {history.goBack()}}>
              Go Back
            </Button>
            <Button size="small" color="primary" onClick={() => {history.push('/')}}>
              Go To Homepage
            </Button>
          </CardActions>
      </Card>
    )
  }
}

export default withStyles(styles)(withRouter(NotFound))