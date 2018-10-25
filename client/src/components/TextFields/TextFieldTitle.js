import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});

class TextFieldTitle extends Component {

  state = {
    value: this.props.default
  }

  handleChange = event => {
    this.setState({
      value: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <TextField
        id="title"
        label="Title"
        multiline
        rowsMax="4"
        value={this.state.value}
        onChange={this.handleChange}
        className={classes.textField}
        margin="normal"
        helperText="Type in your awesome post title"
        variant="filled"
        name="title"
      />
    )
  }
}

export default withStyles(styles)(TextFieldTitle)